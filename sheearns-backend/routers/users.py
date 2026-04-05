from __future__ import annotations

from typing import Any
from uuid import uuid4

from fastapi import APIRouter, HTTPException, status

from models.user import LoginResponse, UserCreate, UserLogin, UserPublic, UserUpdate
from services.auth_service import create_token, hash_password, verify_password, verify_token


router = APIRouter()


_users_by_email: dict[str, dict[str, Any]] = {}
_users_by_id: dict[str, dict[str, Any]] = {}


def _public_user(user: dict[str, Any]) -> UserPublic:
	return UserPublic(
		id=user["id"],
		full_name=user["full_name"],
		email=user["email"],
		phone=user.get("phone"),
		location=user.get("location"),
		bio=user.get("bio"),
		avatar_url=user.get("avatar_url"),
		is_premium=user.get("is_premium", False),
	)


def _get_user_by_token(token: str | None) -> dict[str, Any]:
	if not token:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing authorization token")

	token = token.replace("Bearer ", "", 1)
	for user in _users_by_id.values():
		if user.get("token") == token:
			return user

	try:
		user_id = verify_token(token)
	except Exception as exc:  # noqa: BLE001
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

	if user_id in _users_by_id:
		return _users_by_id[user_id]

	raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found for token")


@router.post("/register", response_model=LoginResponse, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate) -> LoginResponse:
	email = str(payload.email)
	if email in _users_by_email:
		raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="A user with this email already exists")

	user_id = str(uuid4())
	password_hash = hash_password(payload.password)
	token = create_token(user_id)

	user_record: dict[str, Any] = {
		"id": user_id,
		"full_name": payload.full_name,
		"email": email,
		"password_hash": password_hash,
		"phone": payload.phone,
		"location": payload.location,
		"bio": None,
		"avatar_url": None,
		"is_premium": False,
		"token": token,
	}

	_users_by_email[email] = user_record
	_users_by_id[user_id] = user_record

	return LoginResponse(access_token=token, user=_public_user(user_record))


@router.post("/login", response_model=LoginResponse)
def login_user(payload: UserLogin) -> LoginResponse:
	user = _users_by_email.get(str(payload.email))
	if not user or not verify_password(payload.password, user["password_hash"]):
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

	token = create_token(user["id"])
	user["token"] = token
	return LoginResponse(access_token=token, user=_public_user(user))


@router.get("/me", response_model=UserPublic)
def get_current_user(authorization: str | None = None) -> UserPublic:
	user = _get_user_by_token(authorization)
	return _public_user(user)


@router.put("/me", response_model=UserPublic)
def update_current_user(payload: UserUpdate, authorization: str | None = None) -> UserPublic:
	user = _get_user_by_token(authorization)

	if payload.full_name is not None:
		user["full_name"] = payload.full_name
	if payload.phone is not None:
		user["phone"] = payload.phone
	if payload.location is not None:
		user["location"] = payload.location
	if payload.bio is not None:
		user["bio"] = payload.bio
	if payload.avatar_url is not None:
		user["avatar_url"] = payload.avatar_url

	return _public_user(user)


@router.get("/{user_id}", response_model=UserPublic)
def get_public_profile(user_id: str) -> UserPublic:
	user = _users_by_id.get(user_id)
	if not user:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

	return _public_user(user)
