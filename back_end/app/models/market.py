from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.database import Base
from app.models.geolocation import Geolocation
from app.models.price import Price


class Market(Base):
    __tablename__ = "markets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    address = Column(String(255), nullable=True)

    location = relationship("Geolocation", back_populates="market", uselist=False)
    prices = relationship("Price", back_populates="market")
