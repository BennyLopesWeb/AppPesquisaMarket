# back_end/routers/price.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from back_end.app.database import get_db
from back_end.app.schemas.price import PriceCreate, PriceRead
from back_end.app.services import price_service
from back_end.app.core.security import get_current_user
from back_end.app.models.user import User

router = APIRouter(prefix="/prices", tags=["Prices"])


@router.post("/", response_model=PriceRead)
def create_price(
    price: PriceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PriceRead:
    return price_service.create_price(db, price)


@router.get("/", response_model=list[PriceRead])
def list_prices(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[PriceRead]:
    return price_service.get_prices(db)


@router.get("/{price_id}", response_model=PriceRead)
def get_price(
    price_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PriceRead:
    price = price_service.get_price(db, price_id)
    if not price:
        raise HTTPException(status_code=404, detail="Price not found")
    return price


@router.delete("/{price_id}")
def delete_price(
    price_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    success = price_service.delete_price(db, price_id)
    if not success:
        raise HTTPException(status_code=404, detail="Price not found")
    return {"message": "Price deleted successfully"}
