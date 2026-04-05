from __future__ import annotations

from typing import Any
from uuid import uuid4

from fastapi import APIRouter, HTTPException, Query, status

from models.review import ReviewCreate
from models.service import ServiceCreate, ServiceUpdate


router = APIRouter()


_services: dict[str, dict[str, Any]] = {}
_reviews: dict[str, list[dict[str, Any]]] = {}


def _seed_services() -> None:
	if _services:
		return

	sample_services = [
		{
			"title": "Nail Art Technician",
			"category": "Nail Art",
			"description": "Detailed gel, acrylic, and custom nail designs for events and everyday wear.",
			"price_min": 800,
			"price_max": 3500,
			"location": "Nairobi",
			"portfolio_urls": ["https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&q=80&auto=format&fit=crop"],
		},
		{
			"title": "Hair Braiding Specialist",
			"category": "Hair & Beauty",
			"description": "Neat knotless braids, protective styles, and quick home-service bookings.",
			"price_min": 1200,
			"price_max": 5000,
			"location": "Nairobi",
			"portfolio_urls": ["https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80&auto=format&fit=crop"],
		},
		{
			"title": "Graphic Designer",
			"category": "Graphic Design",
			"description": "Flyers, logos, and social media graphics for growing businesses.",
			"price_min": 2500,
			"price_max": 15000,
			"location": "Kisumu",
			"portfolio_urls": ["https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&q=80&auto=format&fit=crop"],
		},
	]

	for item in sample_services:
		service_id = str(uuid4())
		_services[service_id] = {
			"id": service_id,
			"user_id": str(uuid4()),
			"rating": 4.8,
			"review_count": 0,
			"is_active": True,
			"created_at": "2026-04-05T00:00:00Z",
			**item,
		}
		_reviews[service_id] = []


def _service_summary(service: dict[str, Any]) -> dict[str, Any]:
	return {
		"id": service["id"],
		"user_id": service["user_id"],
		"title": service["title"],
		"category": service["category"],
		"description": service["description"],
		"price_min": service["price_min"],
		"price_max": service["price_max"],
		"location": service["location"],
		"portfolio_urls": service["portfolio_urls"],
		"rating": service.get("rating", 0.0),
		"review_count": service.get("review_count", 0),
		"is_active": service.get("is_active", True),
		"created_at": service.get("created_at"),
	}


@router.get("")
def list_services(
	category: str | None = Query(default=None),
	location: str | None = Query(default=None),
	min_price: int | None = Query(default=None, ge=0),
	max_price: int | None = Query(default=None, ge=0),
) -> list[dict[str, Any]]:
	_seed_services()
	services = [service for service in _services.values() if service.get("is_active", True)]

	if category and category != "All":
		services = [service for service in services if service["category"] == category]
	if location:
		services = [service for service in services if location.lower() in service["location"].lower()]
	if min_price is not None:
		services = [service for service in services if service["price_max"] >= min_price]
	if max_price is not None:
		services = [service for service in services if service["price_min"] <= max_price]

	return [
		_service_summary(service)
		for service in sorted(services, key=lambda item: item["created_at"], reverse=True)
	]


@router.post("", status_code=status.HTTP_201_CREATED)
def create_service(payload: ServiceCreate) -> dict[str, Any]:
	if payload.price_min > payload.price_max:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="price_min cannot be greater than price_max")

	service_id = str(uuid4())
	service = {
		"id": service_id,
		"user_id": str(uuid4()),
		"title": payload.title,
		"category": payload.category,
		"description": payload.description,
		"price_min": payload.price_min,
		"price_max": payload.price_max,
		"location": payload.location,
		"portfolio_urls": payload.portfolio_urls,
		"rating": 0.0,
		"review_count": 0,
		"is_active": True,
		"created_at": "2026-04-05T00:00:00Z",
	}
	_services[service_id] = service
	_reviews[service_id] = []
	return _service_summary(service)


@router.get("/{service_id}")
def get_service(service_id: str) -> dict[str, Any]:
	_seed_services()
	service = _services.get(service_id)
	if not service:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

	return {
		**_service_summary(service),
		"reviews": _reviews.get(service_id, []),
	}


@router.put("/{service_id}")
def update_service(service_id: str, payload: ServiceUpdate) -> dict[str, Any]:
	_seed_services()
	service = _services.get(service_id)
	if not service:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

	updates = payload.model_dump(exclude_unset=True)
	if "price_min" in updates and "price_max" in updates and updates["price_min"] > updates["price_max"]:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="price_min cannot be greater than price_max")

	service.update(updates)
	return _service_summary(service)


@router.delete("/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(service_id: str) -> None:
	_seed_services()
	if service_id not in _services:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

	_services[service_id]["is_active"] = False


@router.post("/{service_id}/review", status_code=status.HTTP_201_CREATED)
def submit_review(service_id: str, payload: ReviewCreate) -> dict[str, Any]:
	_seed_services()
	service = _services.get(service_id)
	if not service or not service.get("is_active", True):
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")

	review = {
		"id": str(uuid4()),
		"service_id": service_id,
		"reviewer_name": payload.reviewer_name,
		"rating": payload.rating,
		"comment": payload.comment,
		"created_at": "2026-04-05T00:00:00Z",
	}
	_reviews.setdefault(service_id, []).append(review)

	total_reviews = _reviews[service_id]
	service["review_count"] = len(total_reviews)
	service["rating"] = round(sum(item["rating"] for item in total_reviews) / len(total_reviews), 1)

	return review
