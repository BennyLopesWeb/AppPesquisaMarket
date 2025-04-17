from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from sqlalchemy import create_engine

# URL correta para MySQL
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:Befelo@localhost:3306/marketdb"

# NÃO passar connect_args no MySQL!
engine = create_engine(SQLALCHEMY_DATABASE_URL)


# Criação da sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para os modelos
Base = declarative_base()

# Função para obter a sessão de banco (injeção de dependência)
def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
