# back_end/crud/price.py

from sqlalchemy.orm import Session
from backend.app.models.price import Price
from backend.app.schemas.price import PriceCreate


def create_price(db: Session, price: PriceCreate) -> Price:
    db_price = Price(
        value=price.value,
        product_id=price.product_id,
        market_id=price.market_id,
        user_id=price.user_id,
    )
    db.add(db_price)
    db.commit()
    db.refresh(db_price)
    return db_price


def get_price(db: Session, price_id: int) -> Price | None:
    return db.query(Price).filter(Price.id == price_id).first()


def get_prices(db: Session, skip: int = 0, limit: int = 100) -> list[Price]:
    return db.query(Price).offset(skip).limit(limit).all()


def delete_price(db: Session, price_id: int) -> bool:
    price = db.query(Price).filter(Price.id == price_id).first()
    if price:
        db.delete(price)
        db.commit()
        return True
    return False
