from fastapi import FastAPI
from app.routers import user_router, product_router, market_router, price_router, geolocation_router
from app.routers import auth
from app.routers.product import router as product_router

app = FastAPI()

app.include_router(user_router)
app.include_router(product_router)
app.include_router(market_router)
app.include_router(price_router)
app.include_router(geolocation_router)
app.include_router(auth.router)

