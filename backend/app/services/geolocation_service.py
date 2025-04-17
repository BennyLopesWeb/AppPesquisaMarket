# back_end/services/geolocation_service.py

from sqlalchemy.orm import Session
from backend.app import models, schemas


def create_geolocation(db: Session, geolocation_data: schemas.GeolocationCreate) -> models.Geolocation:
    geolocation = models.Geolocation(
        market_id=geolocation_data.market_id,
        latitude=geolocation_data.latitude,
        longitude=geolocation_data.longitude
    )
    db.add(geolocation)
    db.commit()
    db.refresh(geolocation)
    return geolocation


def get_geolocation(db: Session, geolocation_id: int) -> models.Geolocation | None:
    return db.query(models.Geolocation).filter(models.Geolocation.id == geolocation_id).first()


def get_geolocations(db: Session, skip: int = 0, limit: int = 100) -> list[models.Geolocation]:
    return db.query(models.Geolocation).offset(skip).limit(limit).all()


def delete_geolocation(db: Session, geolocation_id: int) -> dict:
    geolocation = db.query(models.Geolocation).filter(models.Geolocation.id == geolocation_id).first()
    if geolocation:
        db.delete(geolocation)
        db.commit()
        return {"message": "Geolocation deleted successfully"}
    return {"error": "Geolocation not found"}
