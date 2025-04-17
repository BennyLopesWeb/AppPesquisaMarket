from . import Base  # Importando o Base centralizado do __init__.py

# app/database/database.py

from backend.app.database import SessionLocal, get_db, engine, Base  # Importações do __init__.py

# Este arquivo atua como ponto de reexportação dos recursos de conexão com o banco de dados,
# centralizados em `app/database/__init__.py`

__all__ = [
    "SessionLocal",
    "get_db",
    "engine",
    "Base",
]
