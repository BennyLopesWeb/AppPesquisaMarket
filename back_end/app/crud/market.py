# back_end/crud/market.py

from sqlalchemy.orm import Session
from back_end.app.models.market import Market
from back_end.app.schemas.market import MarketCreate


def create_market(db: Session, market: MarketCreate) -> Market:
    db_market = Market(
        name=market.name,
        address=market.address
    )
    db.add(db_market)
    db.commit()
    db.refresh(db_market)
    return db_market


def get_market(db: Session, market_id: int) -> Market | None:
    return db.query(Market).filter(Market.id == market_id).first()


def get_markets(db: Session, skip: int = 0, limit: int = 100) -> list[Market]:
    return db.query(Market).offset(skip).limit(limit).all()


def delete_market(db: Session, market_id: int) -> bool:
    db_market = db.query(Market).filter(Market.id == market_id).first()
    if db_market:
        db.delete(db_market)
        db.commit()
        return True
    return False
