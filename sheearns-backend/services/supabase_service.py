from __future__ import annotations

import os
from functools import lru_cache
from typing import Any


def is_supabase_configured() -> bool:
	return bool(os.getenv("SUPABASE_URL") and os.getenv("SUPABASE_KEY"))


@lru_cache(maxsize=1)
def get_supabase_client() -> Any | None:
	if not is_supabase_configured():
		return None

	try:
		from supabase import create_client
	except Exception:
		return None

	return create_client(os.getenv("SUPABASE_URL", ""), os.getenv("SUPABASE_KEY", ""))


def fetch_rows(table: str, *, limit: int = 100) -> list[dict[str, Any]]:
	client = get_supabase_client()
	if client is None:
		return []

	response = client.table(table).select("*").limit(limit).execute()
	return response.data or []


def insert_row(table: str, payload: dict[str, Any]) -> dict[str, Any] | None:
	client = get_supabase_client()
	if client is None:
		return None

	response = client.table(table).insert(payload).execute()
	if not response.data:
		return None
	return response.data[0]


def update_rows(table: str, *, filters: dict[str, Any], payload: dict[str, Any]) -> list[dict[str, Any]]:
	client = get_supabase_client()
	if client is None:
		return []

	query = client.table(table).update(payload)
	for key, value in filters.items():
		query = query.eq(key, value)

	response = query.execute()
	return response.data or []
