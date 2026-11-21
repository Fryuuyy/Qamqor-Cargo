from pydantic import BaseModel, EmailStr, Field, ConfigDict

class RegisterInput(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    password: str = Field(min_length=8, max_length=128)

class LoginInput(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)

class UserOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    full_name: str
    email: EmailStr
    phone: str
    role: str

class TokenOutput(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserOutput
