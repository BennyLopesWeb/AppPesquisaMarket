# back_end/services/price_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from back_end.app.crud import price as crud_price
from back_end.app.schemas.price import PriceCreate
from back_end.app.models.price import Price


def create_price_service(db: Session, price_data: PriceCreate) -> Price:
    """Create a new price entry."""
    return crud_price.create_price(db, price_data)


def list_prices_service(db: Session) -> list[Price]:
    """List all price entries."""
    return crud_price.get_prices(db)


def get_price_service(db: Session, price_id: int) -> Price:
    """Retrieve a price by ID or raise 404."""
    price = crud_price.get_price(db, price_id)
    if not price:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Price not found"
        )
    return price


def delete_price_service(db: Session, price_id: int) -> dict:
    """Delete a price by ID or raise 404."""
    result = crud_price.delete_price(db, price_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Price not found"
        )
    return {"message": "Price deleted successfully"}
