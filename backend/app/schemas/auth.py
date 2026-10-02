from pydantic import BaseModel, EmailStr, Field


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)
    organization_name: str = Field(min_length=1, max_length=150)
    owner_name: str = Field(min_length=1, max_length=150)



class LoginRequest(BaseModel):
    email: EmailStr
    password: str