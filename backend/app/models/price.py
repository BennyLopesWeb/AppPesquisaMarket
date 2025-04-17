from sqlalchemy import Column, Integer, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.app.database.database import Base

class Price(Base):
    __tablename__ = "prices"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    market_id = Column(Integer, ForeignKey("markets.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    value = Column(Float, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    product = relationship("Product", back_populates="prices")
    market = relationship("Market", back_populates="prices")
    user = relationship("User", back_populates="prices")
