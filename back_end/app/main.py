# app/main.py

from fastapi import FastAPI
from app.routers import (
    user_router,
    product_router,
    market_router,
    price_router,
    geolocation_router,
    auth
)

app = FastAPI(title="AppPesquisaMarket API", version="1.0.0")

# Inclui todos os routers da aplicação
app.include_router(auth.router)
app.include_router(user_router)
app.include_router(product_router)
app.include_router(market_router)
app.include_router(price_router)
app.include_router(geolocation_router)

@app.get("/", tags=["Health Check"])
def root():
    return {"message": "API is running 🚀"}
