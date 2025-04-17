# back_end/routers/geolocation.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from backend.app.database import get_db
from backend.app.schemas.geolocation import GeolocationCreate, GeolocationRead
from backend.app.core.security import get_current_user
from backend.app.models.user import User
from backend.app.services import geolocation_service

router = APIRouter(prefix="/geolocations", tags=["Geolocations"])


@router.post("/", response_model=GeolocationRead)
def create_geolocation(
    geolocation: GeolocationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return geolocation_service.create_geolocation(db, geolocation)


@router.get("/", response_model=list[GeolocationRead])
def list_geolocations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return geolocation_service.list_geolocations(db)


@router.get("/{geolocation_id}", response_model=GeolocationRead)
def get_geolocation(
    geolocation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    geolocation = geolocation_service.get_geolocation(db, geolocation_id)
    if not geolocation:
        raise HTTPException(status_code=404, detail="Geolocation not found")
    return geolocation


@router.delete("/{geolocation_id}")
def delete_geolocation(
    geolocation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    success = geolocation_service.delete_geolocation(db, geolocation_id)
    if not success:
        raise HTTPException(status_code=404, detail="Geolocation not found")
    return {"message": "Geolocation deleted successfully"}
