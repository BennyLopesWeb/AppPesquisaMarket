# app/config.py

from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "mysql+pymysql://root:Befelo@localhost:3306/marketdb"  # ou substitua por sua URL do MySQL

    class Config:
        env_file = ".env"  # permite usar variáveis de ambiente no arquivo .env

settings = Settings()
