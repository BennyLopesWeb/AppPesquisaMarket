# back_end/core/security.py

from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from back_end.app.database.database import get_db
from back_end.app.models.user import User

# =============================
# 🔐 CONFIGURAÇÕES DE SEGURANÇA
# =============================

SECRET_KEY = "sua-chave-secreta-aqui"  # ⚠️ Troque em produção
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

# =======================
# 🔐 CONTEXTO DE HASHING
# =======================

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ===================================
# 🔐 CONFIGURAÇÃO DO TOKEN (OAuth2)
# ===================================

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

# ========================
# 🔐 FUNÇÕES DE SENHA
# ========================

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha corresponde ao hash armazenado."""
    return pwd_context.verify(plain_password, hashed_password)

def hash_password(password: str) -> str:
    """Retorna o hash da senha fornecida."""
    return pwd_context.hash(password)

# =============================
# 🔐 CRIAÇÃO DO TOKEN DE ACESSO
# =============================

def create_access_token(data: dict, expires_delta: timedelta | None = None) -> str:
    """Gera um token JWT com dados codificados e tempo de expiração."""
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# =========================================
# 🔐 RETORNA O USUÁRIO A PARTIR DO JWT TOKEN
# =========================================

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> User:
    """Decodifica o token JWT e retorna o usuário autenticado."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload.get("sub"))
    except (JWTError, ValueError, TypeError):
        raise credentials_exception

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user
