"""Create the initial administrator account if it does not exist."""
from app.config import ADMIN_EMAIL, ADMIN_PASSWORD
from app.database import SessionLocal
from app.models import User
from app.security import hash_password

def seed_admin() -> None:
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == ADMIN_EMAIL).first()
        if existing is None:
            db.add(User(full_name="System Administrator", email=ADMIN_EMAIL, phone="+77000000000",
                        password_hash=hash_password(ADMIN_PASSWORD), role="admin"))
            db.commit()
    finally:
        db.close()
