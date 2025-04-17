# back_end/models/user.py
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from backend.app.database.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)  # ✅ ESTE CAMPO PRECISA EXISTIR

    prices = relationship("Price", back_populates="user")
