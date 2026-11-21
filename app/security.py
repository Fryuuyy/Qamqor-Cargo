"""Password hashing and standards-based HS256 JWT helpers.

JWT encoding/verification uses Python's standard library to keep the learning
project dependency set small. Passwords are hashed with Argon2.
"""
import base64
import hashlib
import hmac
import json
import time
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError
from app.config import JWT_SECRET, ACCESS_TOKEN_EXPIRE_MINUTES

_password_hasher = PasswordHasher()

def _b64url(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")

def _b64decode(value: str) -> bytes:
    return base64.urlsafe_b64decode(value + "=" * (-len(value) % 4))

def hash_password(password: str) -> str:
    return _password_hasher.hash(password)

def verify_password(password: str, password_hash: str) -> bool:
    try:
        return _password_hasher.verify(password_hash, password)
    except (VerifyMismatchError, VerificationError):
        return False

def create_access_token(user_id: int) -> str:
    now = int(time.time())
    header = {"alg": "HS256", "typ": "JWT"}
    payload = {"sub": str(user_id), "iat": now, "exp": now + ACCESS_TOKEN_EXPIRE_MINUTES * 60}
    signing_input = f"{_b64url(json.dumps(header, separators=(',', ':')).encode())}.{_b64url(json.dumps(payload, separators=(',', ':')).encode())}"
    signature = hmac.new(JWT_SECRET.encode(), signing_input.encode(), hashlib.sha256).digest()
    return f"{signing_input}.{_b64url(signature)}"

def decode_access_token(token: str) -> int | None:
    try:
        header_part, payload_part, signature_part = token.split(".")
        signing_input = f"{header_part}.{payload_part}"
        expected = hmac.new(JWT_SECRET.encode(), signing_input.encode(), hashlib.sha256).digest()
        if not hmac.compare_digest(expected, _b64decode(signature_part)):
            return None
        header = json.loads(_b64decode(header_part))
        payload = json.loads(_b64decode(payload_part))
        if header.get("alg") != "HS256" or int(payload.get("exp", 0)) <= int(time.time()):
            return None
        return int(payload["sub"])
    except (ValueError, TypeError, KeyError, json.JSONDecodeError):
        return None
