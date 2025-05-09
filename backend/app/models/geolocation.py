from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from back_end.app.database.database import Base

class Geolocation(Base):
    __tablename__ = "geolocations"

    id = Column(Integer, primary_key=True, index=True)
    market_id = Column(Integer, ForeignKey("markets.id"))
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)

    market = relationship("Market", back_populates="location")
