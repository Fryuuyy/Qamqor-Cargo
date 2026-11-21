"""Relational models for users and freight requests."""
from datetime import datetime, timezone
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, Text, CheckConstraint, Index
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.database import Base

def utcnow():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(30), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(20), default="customer", nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    requests: Mapped[list["TransportRequest"]] = relationship(back_populates="customer")

    __table_args__ = (CheckConstraint("role IN ('customer', 'admin')", name="ck_user_role"),)

class TransportRequest(Base):
    __tablename__ = "transport_requests"
    id: Mapped[int] = mapped_column(primary_key=True)
    request_number: Mapped[str] = mapped_column(String(24), unique=True, index=True, nullable=False)
    customer_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="RESTRICT"), index=True, nullable=False)
    origin: Mapped[str] = mapped_column(String(120), nullable=False)
    destination: Mapped[str] = mapped_column(String(120), nullable=False)
    cargo_type: Mapped[str] = mapped_column(String(80), nullable=False)
    weight_kg: Mapped[float] = mapped_column(Float, nullable=False)
    transport_date: Mapped[str] = mapped_column(String(10), nullable=False)
    phone: Mapped[str] = mapped_column(String(30), nullable=False)
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="pending", index=True, nullable=False)
    admin_note: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)
    customer: Mapped[User] = relationship(back_populates="requests")

    __table_args__ = (
        CheckConstraint("weight_kg > 0 AND weight_kg <= 50000", name="ck_request_weight"),
        CheckConstraint("status IN ('pending','confirmed','in_transit','delivered','cancelled')", name="ck_request_status"),
        Index("ix_request_customer_created", "customer_id", "created_at"),
    )
