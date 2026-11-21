from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas.auth import RegisterInput, LoginInput, TokenOutput, UserOutput
from app.security import hash_password, verify_password, create_access_token
from app.dependencies import get_current_user

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenOutput, status_code=status.HTTP_201_CREATED)
def register(payload: RegisterInput, db: Session = Depends(get_db)):
    email = str(payload.email).lower()
    if db.query(User).filter(User.email == email).first():
        raise HTTPException(status_code=409, detail="email_already_registered")
    user = User(full_name=payload.full_name.strip(), email=email, phone=payload.phone.strip(), password_hash=hash_password(payload.password), role="customer")
    db.add(user)
    db.commit()
    db.refresh(user)
    return TokenOutput(access_token=create_access_token(user.id), user=user)

@router.post("/login", response_model=TokenOutput)
def login(payload: LoginInput, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == str(payload.email).lower()).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=401, detail="invalid_email_or_password")
    return TokenOutput(access_token=create_access_token(user.id), user=user)

@router.get("/me", response_model=UserOutput)
def me(user: User = Depends(get_current_user)):
    return user
