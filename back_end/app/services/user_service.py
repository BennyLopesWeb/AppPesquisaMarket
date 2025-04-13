# back_end/services/user_service.py

from sqlalchemy.orm import Session
from typing import Optional, List
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password

def create_user(db: Session, user_data: UserCreate) -> Optional[User]:
    """Creates a new user if the email is not already registered."""
    if db.query(User).filter(User.email == user_data.email).first():
        return None

    new_user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hash_password(user_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_user_by_id(db: Session, user_id: int) -> Optional[User]:
    """Returns a user by their ID."""
    return db.query(User).filter(User.id == user_id).first()

def get_all_users(db: Session) -> List[User]:
    """Returns all users."""
    return db.query(User).all()

def delete_user(db: Session, user_id: int) -> bool:
    """Deletes a user by ID if found."""
    user = get_user_by_id(db, user_id)
    if user:
        db.delete(user)
        db.commit()
        return True
    return False
