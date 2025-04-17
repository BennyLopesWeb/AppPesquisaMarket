from pydantic import BaseModel, EmailStr, constr

# Base model shared across schemas
class UserBase(BaseModel):
    name: constr(min_length=2, max_length=100)
    email: EmailStr

# Schema for user creation
class UserCreate(UserBase):
    password: constr(min_length=6, max_length=128)

# Schema for user login
class UserLogin(BaseModel):
    email: EmailStr
    password: constr(min_length=6, max_length=128)

# Schema for reading user info (response model)
class UserRead(UserBase):
    id: int

    class Config:
            from_attributes = True



