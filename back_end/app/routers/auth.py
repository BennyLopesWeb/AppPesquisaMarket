# back_end/app/routers/auth.py

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.security import verify_password, create_access_token
from app.database import get_db
from app.schemas.token import Token
from app.crud import get_user_by_email  # 👈 aqui está tudo certo

router = APIRouter(prefix="", tags=["Authentication"])

@router.post("/login", response_model=Token, summary="Authenticate user and return JWT token")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Autentica o usuário usando email e senha.
    - **username**: email do usuário
    - **password**: senha do usuário
    Retorna um token JWT válido para acesso às rotas protegidas.
    """
    user = get_user_by_email(db, form_data.username)

    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email or password incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=access_token, token_type="bearer")
