# back_end/schemas/market.py

from pydantic import BaseModel
from typing import Optional

class MarketBase(BaseModel):
    name: str
    address: Optional[str] = None

class MarketCreate(MarketBase):
    pass

class MarketRead(MarketBase):
    id: int

    model_config = {
        "from_attributes": True
    }
