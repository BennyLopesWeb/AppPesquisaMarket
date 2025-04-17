# tests/conftest.py
import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from back_end import Base, get_db
from back_end import app
from fastapi.testclient import TestClient

# ✅ Conexão com banco MySQL de teste
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:Befelo@localhost:3306/marketdb_test"

# Cria engine sem check_same_thread (apenas para SQLite)
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Cria tabelas no banco de teste (recria a base a cada execução se necessário)
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# ✅ Injeção de dependência substituindo o get_db da back_end
@pytest.fixture(scope="function")
def db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.rollback()  # Limpa transações após o teste
        db.close()

@pytest.fixture(scope="module")
def client():
    app.dependency_overrides[get_db] = lambda: TestingSessionLocal()
    return TestClient(app)
