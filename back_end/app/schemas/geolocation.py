from pydantic import BaseModel


class GeolocationBase(BaseModel):
    latitude: float
    longitude: float


class GeolocationCreate(GeolocationBase):
    pass


class GeolocationRead(GeolocationBase):
    id: int

    model_config = {
        "from_attributes": True  # Pydantic v2 compatível com SQLAlchemy
    }
