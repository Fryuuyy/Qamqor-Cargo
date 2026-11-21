from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.security import decode_access_token

bearer = HTTPBearer(auto_error=False)

def get_current_user(credentials: HTTPAuthorizationCredentials | None = Depends(bearer), db: Session = Depends(get_db)) -> User:
    if credentials is None:
        raise HTTPException(status_code=401, detail="authentication_required")
    user_id = decode_access_token(credentials.credentials)
    if user_id is None:
        raise HTTPException(status_code=401, detail="invalid_token")
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=401, detail="user_not_found")
    return user

def require_admin(user: User = Depends(get_current_user)) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=403, detail="admin_required")
    return user
