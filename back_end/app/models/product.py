# back_end/models/product.py

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from back_end.app.database.database import Base

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(160), nullable=False)
    description = Column(String(255), nullable=True)
    category = Column(String(100), nullable=False)

    prices = relationship("Price", back_populates="product")
