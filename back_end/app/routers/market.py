# back_end/routers/market.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.market import MarketCreate, MarketRead
from app.core.security import get_current_user
from app.models.user import User
from app.services import market_service

router = APIRouter(prefix="/markets", tags=["Markets"])


@router.post("/", response_model=MarketRead)
def create_market(
    market: MarketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> MarketRead:
    return market_service.create_market_service(db, market)


@router.get("/", response_model=list[MarketRead])
def list_markets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> list[MarketRead]:
    return market_service.list_markets_service(db)


@router.get("/{market_id}", response_model=MarketRead)
def get_market(
    market_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> MarketRead:
    return market_service.get_market_service(db, market_id)


@router.delete("/{market_id}")
def delete_market(
    market_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> dict:
    return market_service.delete_market_service(db, market_id)
