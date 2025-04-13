from pydantic import BaseModel

class ProductBase(BaseModel):
    name: str
    description: str | None = None
    category: str | None = None  # Adicionado aqui para refletir o modelo SQLAlchemy

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int

    model_config = {
        "from_attributes": True
    }
