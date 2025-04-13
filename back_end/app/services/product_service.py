# back_end/services/product_service.py

from sqlalchemy.orm import Session
from app import schemas
from app import crud


def create_product(db: Session, product_data: schemas.ProductCreate):
    return crud.create_product(db, product_data)

def get_all_products(db: Session, skip: int = 0, limit: int = 100):
    return crud.get_products(db, skip=skip, limit=limit)

def get_product_by_id(db: Session, product_id: int):
    return crud.get_product(db, product_id)

def delete_product(db: Session, product_id: int):
    return crud.delete_product(db, product_id)
