# back_end/crud/geolocation.py

from sqlalchemy.orm import Session
from app import models, schemas


def create_geolocation(db: Session, geolocation: schemas.GeolocationCreate) -> models.Geolocation:
    db_geo = models.Geolocation(
        market_id=geolocation.market_id,
        latitude=geolocation.latitude,
        longitude=geolocation.longitude
    )
    db.add(db_geo)
    db.commit()
    db.refresh(db_geo)
    return db_geo


def get_geolocation(db: Session, geolocation_id: int) -> models.Geolocation | None:
    return db.query(models.Geolocation).filter(models.Geolocation.id == geolocation_id).first()


def get_geolocations(db: Session, skip: int = 0, limit: int = 100) -> list[models.Geolocation]:
    return db.query(models.Geolocation).offset(skip).limit(limit).all()


def delete_geolocation(db: Session, geolocation_id: int) -> bool:
    db_geo = db.query(models.Geolocation).filter(models.Geolocation.id == geolocation_id).first()
    if db_geo:
        db.delete(db_geo)
        db.commit()
        return True
    return False
