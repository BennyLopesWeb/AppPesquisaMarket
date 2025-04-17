from fastapi import FastAPI
from backend.app.routers import user_router, product_router, market_router, price_router, geolocation_router
from backend.app.routers import auth
from backend.app.routers.product import router as product_router

# backend/app/main.py

from fastapi import FastAPI
from dotenv import load_dotenv
import os

# 🔁 Carrega variáveis de ambiente do .env
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

from backend.app.routers import (
    user_router,
    product_router,
    market_router,
    price_router,
    geolocation_router,
)

app = FastAPI()

# Rotas
app.include_router(user_router, prefix="/users")
app.include_router(product_router, prefix="/products")
app.include_router(market_router, prefix="/markets")
app.include_router(price_router, prefix="/prices")
app.include_router(geolocation_router, prefix="/geolocation")


