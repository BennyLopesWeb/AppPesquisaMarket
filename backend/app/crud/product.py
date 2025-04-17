# back_end/crud/product.py

from sqlalchemy.orm import Session
from backend.app.models.product import Product
from backend.app.schemas.product import ProductCreate


def create_product(db: Session, product: ProductCreate) -> Product:
    db_product = Product(
        name=product.name,
        descrption=product.description,
        category=product.category
    )
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


def get_product(db: Session, product_id: int) -> Product | None:
    return db.query(Product).filter(Product.id == product_id).first()


def get_products(db: Session, skip: int = 0, limit: int = 100) -> list[Product]:
    return db.query(Product).offset(skip).limit(limit).all()


def update_product(db: Session, product_id: int, product: ProductCreate) -> Product | None:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db_product.name = product.name
        db_product.description= product.description
        db_product.category = product.category
        db.commit()
        db.refresh(db_product)
    return db_product


def delete_product(db: Session, product_id: int) -> bool:
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if db_product:
        db.delete(db_product)
        db.commit()
        return True
    return False
