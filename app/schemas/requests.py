from datetime import date
from typing import Literal
from pydantic import BaseModel, Field, ConfigDict, field_validator

class RequestCreate(BaseModel):
    origin: str = Field(min_length=2, max_length=120)
    destination: str = Field(min_length=2, max_length=120)
    cargo_type: str = Field(min_length=2, max_length=80)
    weight_kg: float = Field(gt=0, le=50000)
    transport_date: date
    phone: str = Field(min_length=7, max_length=30)
    comment: str | None = Field(default=None, max_length=1000)

    @field_validator("origin", "destination", "cargo_type", "phone")
    @classmethod
    def strip_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Өріс бос болмауы керек")
        return value

    @field_validator("transport_date")
    @classmethod
    def date_not_in_past(cls, value: date) -> date:
        if value < date.today():
            raise ValueError("Тасымалдау күні өткен күн болмауы керек")
        return value

class RequestStatusUpdate(BaseModel):
    status: Literal["confirmed", "in_transit", "delivered", "cancelled"]
    admin_note: str | None = Field(default=None, max_length=1000)

class RequestOutput(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    request_number: str
    customer_id: int
    origin: str
    destination: str
    cargo_type: str
    weight_kg: float
    transport_date: str
    phone: str
    comment: str | None
    status: str
    admin_note: str | None
    created_at: str | None = None
