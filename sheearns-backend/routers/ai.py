from typing import Any, Literal

from fastapi import APIRouter
from pydantic import BaseModel, Field

from services.openai_service import generate_chat_reply
from services.pricing_service import calculate_pricing


router = APIRouter()


class ChatTurn(BaseModel):
	role: Literal["user", "assistant"]
	content: str


class CoachRequest(BaseModel):
	text: str = Field(..., min_length=1, max_length=4000)
	history: list[ChatTurn] = Field(default_factory=list)


class PricingRequest(BaseModel):
	service: str = Field(..., min_length=1)
	location: str = Field(..., min_length=1)
	experience_years: int = Field(default=0, ge=0, le=30)
	hours: float = Field(default=1, gt=0, le=24)


class CaptionRequest(BaseModel):
	service_name: str = Field(..., min_length=1)
	tone: str = Field(default="warm")
	audience: str = Field(default="local clients")


class AssessmentRequest(BaseModel):
	skills: list[str] = Field(default_factory=list)
	hours_per_week: int = Field(default=0, ge=0, le=168)
	income_goal: int = Field(default=0, ge=0)
	work_style: Literal["online", "in_person", "both"] = "both"


class RoadmapRequest(BaseModel):
	goal: str = Field(default="first client")
	skills: list[str] = Field(default_factory=list)


def _history_to_prompt(history: list[ChatTurn]) -> str:
	if not history:
		return ""
	turns = [f"{turn.role}: {turn.content}" for turn in history]
	return "\n".join(turns)


@router.post("/coach")
async def ai_coach(payload: CoachRequest) -> dict[str, Any]:
	prompt = _history_to_prompt(payload.history)
	system_hint = (
		"You are helping a young African woman build income from her skills. "
		"Give warm, practical, Kenya-aware advice."
	)
	if prompt:
		system_hint = f"{system_hint}\nConversation so far:\n{prompt}"

	history = [turn.model_dump() for turn in payload.history]
	result = await generate_chat_reply(
		user_prompt=payload.text,
		history=history,
		system_prompt=system_hint,
	)
	return {"reply": result.get("reply", ""), "source": result.get("source", "fallback")}


@router.post("/pricing")
async def ai_pricing(payload: PricingRequest) -> dict[str, Any]:
	if payload.experience_years >= 5:
		experience_level = "advanced"
	elif payload.experience_years >= 2:
		experience_level = "intermediate"
	else:
		experience_level = "beginner"

	pricing = calculate_pricing(
		service_name=payload.service,
		location=payload.location,
		hours=payload.hours,
		experience_level=experience_level,
		urgency="normal",
		materials_cost=0,
	)

	return {
		"service": payload.service,
		"location": payload.location,
		"starting": pricing["starting_price"],
		"recommended": pricing["recommended_price"],
		"premium": pricing["premium_price"],
		"insight": (
			f"Pricing is based on {payload.experience_years} years of experience, "
			f"{payload.hours} hour(s) of work, and the market level in {payload.location}."
		),
	}


@router.post("/caption")
async def ai_caption(payload: CaptionRequest) -> dict[str, Any]:
	prompt = (
		f"Write a short social media caption for {payload.service_name}. "
		f"Tone: {payload.tone}. Audience: {payload.audience}."
	)
	result = await generate_chat_reply(
		user_prompt=prompt,
		system_prompt="You write short, high-converting captions for women-owned microbusinesses.",
	)
	return {
		"caption": result.get("reply", ""),
		"source": result.get("source", "fallback"),
	}


@router.post("/assess")
async def ai_assess(payload: AssessmentRequest) -> dict[str, Any]:
	hustles = [
		{
			"name": skill,
			"earning_potential": "Varies by location and demand",
			"time_to_first_client": "1-3 weeks",
			"difficulty": "Beginner to intermediate",
		}
		for skill in payload.skills[:3]
	]

	if not hustles:
		hustles = [
			{
				"name": "Hair & Beauty",
				"earning_potential": "Ksh 800 - 5,000 per session",
				"time_to_first_client": "1-2 weeks",
				"difficulty": "Beginner friendly",
			}
		]

	return {
		"top_hustles": hustles,
		"hours_per_week": payload.hours_per_week,
		"income_goal": payload.income_goal,
		"work_style": payload.work_style,
	}


@router.post("/roadmap")
async def ai_roadmap(payload: RoadmapRequest) -> dict[str, Any]:
	return {
		"goal": payload.goal,
		"skills": payload.skills,
		"steps": [
			"Set up WhatsApp Business and a clear profile",
			"Create simple portfolio samples",
			"Join target Facebook groups",
			"Post your first offer",
			"Message 10 potential clients",
		],
	}
