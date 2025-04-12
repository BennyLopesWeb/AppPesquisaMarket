from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Caminho do banco SQLite
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:Befelo@localhost:3306/marketdb"

# Criação do engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL)

# Criando a sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base dos modelos
Base = declarative_base()

# Função para obter a sessão do banco (usada com Depends)
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def database():
    return None