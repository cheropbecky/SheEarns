from __future__ import annotations

import os
from typing import Any

import httpx


def is_openai_configured() -> bool:
	return bool(os.getenv("OPENAI_API_KEY"))


def is_azure_openai_configured() -> bool:
	return bool(
		os.getenv("AZURE_OPENAI_API_KEY")
		and os.getenv("AZURE_OPENAI_ENDPOINT")
		and os.getenv("AZURE_OPENAI_DEPLOYMENT")
	)


def is_ollama_enabled() -> bool:
	value = os.getenv("OLLAMA_ENABLED", "true").strip().lower()
	return value not in {"0", "false", "no"}


def _ollama_base_url() -> str:
	return os.getenv("OLLAMA_BASE_URL", "http://127.0.0.1:11434").rstrip("/")


def _ollama_model(default_model: str | None = None) -> str:
	if default_model:
		return default_model
	return os.getenv("OLLAMA_MODEL", "llama3.1")


def _azure_openai_api_version() -> str:
	return os.getenv("AZURE_OPENAI_API_VERSION", "2024-10-21")


def _fallback_reply(user_prompt: str) -> str:
	return (
		"I can help with that. Based on your goal, start with one clear offer, "
		"post it where your target clients are, and follow up with 10 direct messages. "
		f"Your prompt was: {user_prompt}"
	)


async def _generate_ollama_reply(
	*,
	user_prompt: str,
	history: list[dict[str, str]] | None = None,
	system_prompt: str | None = None,
	model: str | None = None,
) -> dict[str, Any]:
	if not is_ollama_enabled():
		raise RuntimeError("Ollama disabled")

	selected_model = _ollama_model(model)
	url = f"{_ollama_base_url()}/api/chat"

	messages: list[dict[str, str]] = []
	if system_prompt:
		messages.append({"role": "system", "content": system_prompt})
	if history:
		messages.extend(history)
	messages.append({"role": "user", "content": user_prompt})

	async with httpx.AsyncClient(timeout=60.0) as client:
		response = await client.post(
			url,
			json={
				"model": selected_model,
				"messages": messages,
				"stream": False,
			},
		)
		response.raise_for_status()
		data = response.json()

	text = data.get("message", {}).get("content", "").strip()
	if not text:
		raise RuntimeError("Empty Ollama response")

	return {"reply": text, "source": "ollama", "model": selected_model}


async def _generate_azure_openai_reply(
	*,
	user_prompt: str,
	history: list[dict[str, str]] | None = None,
	system_prompt: str | None = None,
	model: str | None = None,
) -> dict[str, Any]:
	if not is_azure_openai_configured():
		raise RuntimeError("Azure OpenAI not configured")

	try:
		from openai import AsyncAzureOpenAI
	except Exception as exc:
		raise RuntimeError("OpenAI SDK missing Azure client") from exc

	deployment = model or os.getenv("AZURE_OPENAI_DEPLOYMENT", "")
	endpoint = os.getenv("AZURE_OPENAI_ENDPOINT", "")
	api_key = os.getenv("AZURE_OPENAI_API_KEY", "")
	api_version = _azure_openai_api_version()

	client = AsyncAzureOpenAI(
		api_key=api_key,
		azure_endpoint=endpoint,
		api_version=api_version,
	)

	messages: list[dict[str, str]] = []
	if system_prompt:
		messages.append({"role": "system", "content": system_prompt})
	if history:
		messages.extend(history)
	messages.append({"role": "user", "content": user_prompt})

	response = await client.chat.completions.create(
		model=deployment,
		messages=messages,
		temperature=0.6,
		max_tokens=700,
	)

	text = (response.choices[0].message.content or "").strip()
	if not text:
		raise RuntimeError("Empty Azure OpenAI response")

	return {"reply": text, "source": "azure-openai", "model": deployment}


async def generate_chat_reply(
	*,
	user_prompt: str,
	history: list[dict[str, str]] | None = None,
	system_prompt: str | None = None,
	model: str | None = None,
) -> dict[str, Any]:
	try:
		return await _generate_ollama_reply(
			user_prompt=user_prompt,
			history=history,
			system_prompt=system_prompt,
			model=model,
		)
	except Exception:
		pass

	try:
		return await _generate_azure_openai_reply(
			user_prompt=user_prompt,
			history=history,
			system_prompt=system_prompt,
			model=model,
		)
	except Exception:
		pass

	if not is_openai_configured():
		return {"reply": _fallback_reply(user_prompt), "source": "fallback"}

	try:
		from openai import AsyncOpenAI
	except Exception:
		return {"reply": _fallback_reply(user_prompt), "source": "fallback"}

	client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
	selected_model = model or os.getenv("OPENAI_MODEL", "gpt-4o-mini")

	messages: list[dict[str, str]] = []
	if system_prompt:
		messages.append({"role": "system", "content": system_prompt})
	if history:
		messages.extend(history)
	messages.append({"role": "user", "content": user_prompt})

	try:
		response = await client.responses.create(model=selected_model, input=messages)
		text = response.output_text or _fallback_reply(user_prompt)
		return {"reply": text, "source": "openai", "model": selected_model}
	except Exception:
		return {"reply": _fallback_reply(user_prompt), "source": "fallback"}
