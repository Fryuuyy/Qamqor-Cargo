from dotenv import load_dotenv
load_dotenv()

"""Application configuration."""
import os

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./transport.db")
JWT_SECRET = os.getenv("JWT_SECRET", "development-only-change-me")
JWT_ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "120"))
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@example.com").strip().lower()
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")
APP_TITLE = "Жүк тасымалдау"
