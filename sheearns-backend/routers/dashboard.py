from __future__ import annotations

from datetime import datetime, timezone
from typing import Any
from uuid import uuid4

from fastapi import APIRouter, Query

from models.income import IncomeCreate, IncomeSummary, Milestone


router = APIRouter()


def _now_iso() -> str:
	return datetime.now(timezone.utc).isoformat()


_income_logs: list[dict[str, Any]] = [
	{
		"id": str(uuid4()),
		"user_id": "demo-user",
		"amount": 2500,
		"source": "Hair Braiding",
		"note": "Weekend client",
		"earned_at": _now_iso(),
	},
	{
		"id": str(uuid4()),
		"user_id": "demo-user",
		"amount": 4000,
		"source": "Makeup Session",
		"note": "Bridal booking",
		"earned_at": _now_iso(),
	},
]


def _get_user_logs(user_id: str) -> list[dict[str, Any]]:
	return [log for log in _income_logs if log["user_id"] == user_id]


def _income_summary(user_id: str, monthly_goal: int = 10000) -> IncomeSummary:
	logs = _get_user_logs(user_id)
	total = sum(item["amount"] for item in logs)
	remaining = max(monthly_goal - total, 0)
	progress = round((total / monthly_goal) * 100, 2) if monthly_goal > 0 else 0

	return IncomeSummary(
		monthly_goal=monthly_goal,
		earned=total,
		remaining=remaining,
		progress_percent=min(progress, 100),
		log_count=len(logs),
	)


def _milestones(user_id: str) -> list[Milestone]:
	logs = _get_user_logs(user_id)
	earned = sum(item["amount"] for item in logs)
	count = len(logs)

	return [
		Milestone(key="first_client", label="First Client Landed", unlocked=count >= 1, target="1 job"),
		Milestone(key="earned_5k", label="Ksh 5,000 Earned", unlocked=earned >= 5000, target="Ksh 5,000"),
		Milestone(key="earned_10k", label="Ksh 10,000 Month", unlocked=earned >= 10000, target="Ksh 10,000"),
		Milestone(key="ten_clients", label="10 Clients Served", unlocked=count >= 10, target="10 jobs"),
	]


@router.get("")
def get_dashboard(user_id: str = Query(default="demo-user")) -> dict[str, Any]:
	logs = sorted(_get_user_logs(user_id), key=lambda item: item["earned_at"], reverse=True)
	summary = _income_summary(user_id)
	milestones = _milestones(user_id)

	activity = [
		{
			"type": "income",
			"title": f"Logged Ksh {entry['amount']:,}",
			"subtitle": entry["source"],
			"timestamp": entry["earned_at"],
		}
		for entry in logs[:5]
	]

	return {
		"summary": summary.model_dump(),
		"milestones": [item.model_dump() for item in milestones],
		"recent_activity": activity,
		"income_logs": logs,
	}


@router.post("/income", status_code=201)
def create_income(payload: IncomeCreate, user_id: str = Query(default="demo-user")) -> dict[str, Any]:
	record = {
		"id": str(uuid4()),
		"user_id": user_id,
		"amount": payload.amount,
		"source": payload.source,
		"note": payload.note,
		"earned_at": (payload.earned_at or datetime.now(timezone.utc)).isoformat(),
	}
	_income_logs.append(record)
	return record


@router.get("/income")
def list_income(user_id: str = Query(default="demo-user")) -> list[dict[str, Any]]:
	return sorted(_get_user_logs(user_id), key=lambda item: item["earned_at"], reverse=True)


@router.get("/income/summary")
def get_income_summary(
	user_id: str = Query(default="demo-user"),
	monthly_goal: int = Query(default=10000, gt=0),
) -> dict[str, Any]:
	return _income_summary(user_id=user_id, monthly_goal=monthly_goal).model_dump()


@router.get("/milestones")
def get_milestones(user_id: str = Query(default="demo-user")) -> list[dict[str, Any]]:
	return [item.model_dump() for item in _milestones(user_id)]
