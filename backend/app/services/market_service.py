# back_end/services/market_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException
from backend.app.crud import market as crud_market
from backend.app.schemas.market import MarketCreate
from backend.app.models.market import Market


def create_market_service(db: Session, market_data: MarketCreate) -> Market:
    return crud_market.create_market(db, market_data)


def list_markets_service(db: Session) -> list[Market]:
    return crud_market.get_markets(db)


def get_market_service(db: Session, market_id: int) -> Market:
    market = crud_market.get_market(db, market_id)
    if not market:
        raise HTTPException(status_code=404, detail="Market not found")
    return market


def delete_market_service(db: Session, market_id: int) -> dict:
    success = crud_market.delete_market(db, market_id)
    if not success:
        raise HTTPException(status_code=404, detail="Market not found")
    return {"message": "Market deleted successfully"}
