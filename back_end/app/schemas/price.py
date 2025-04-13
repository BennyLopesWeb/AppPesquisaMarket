from pydantic import BaseModel

class PriceBase(BaseModel):
    value: float
    product_id: int
    market_id: int

class PriceCreate(PriceBase):
    pass

class PriceRead(PriceBase):
    id: int

    model_config = {
        "from_attributes": True
    }
