# back_end/routers/user.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from back_end.app.database import get_db
from back_end.app.schemas.user import UserCreate, UserRead
from back_end.app.services import user_service

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserRead)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    created_user = user_service.create_user(db, user)
    if not created_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return created_user
