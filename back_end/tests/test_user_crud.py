from back_end import get_user_by_email
from sqlalchemy.orm import Session

from unittest.mock import MagicMock
from back_end import UserCreate
from back_end import user as crud_user
from back_end import User


def test_get_user_by_email_found():
    # Mock do usuário
    fake_user = User(id=1, name="Benny", email="benny@example.com", hashed_password="fakehash")

    # Mock do banco de dados
    db = MagicMock(spec=Session)
    db.query().filter().first.return_value = fake_user

    result = get_user_by_email(db, "benny@example.com")

    assert result == fake_user
    assert result.email == "benny@example.com"


def test_get_user_by_email_not_found():
    db = MagicMock(spec=Session)
    db.query().filter().first.return_value = None

    result = get_user_by_email(db, "missing@example.com")

    assert result is None


def test_create_user_success():
    db = MagicMock()
    db.query().filter().first.return_value = None  # Simula que o email não existe

    new_user = UserCreate(name="Alice", email="alice@example.com", password="secret123")

    created_user = crud_user.create_user(db, new_user)

    assert created_user.email == new_user.email
    assert hasattr(created_user, "hashed_password")
