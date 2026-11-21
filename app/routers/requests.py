from datetime import datetime, timezone
from secrets import token_hex
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.dependencies import get_current_user, require_admin
from app.models import User, TransportRequest
from app.schemas.requests import RequestCreate, RequestStatusUpdate, RequestOutput

router = APIRouter(prefix="/api/requests", tags=["Transport requests"])
ALLOWED_TRANSITIONS = {
    "pending": {"confirmed", "cancelled"},
    "confirmed": {"in_transit", "cancelled"},
    "in_transit": {"delivered"},
    "delivered": set(),
    "cancelled": set(),
}

def serialize(item: TransportRequest) -> dict:
    return {
        "id": item.id, "request_number": item.request_number, "customer_id": item.customer_id,
        "customer_name": item.customer.full_name if item.customer else None,
        "customer_email": item.customer.email if item.customer else None,
        "origin": item.origin, "destination": item.destination, "cargo_type": item.cargo_type,
        "weight_kg": item.weight_kg, "transport_date": item.transport_date, "phone": item.phone,
        "comment": item.comment, "status": item.status, "admin_note": item.admin_note,
        "created_at": item.created_at.isoformat() if item.created_at else None,
    }

@router.post("", status_code=status.HTTP_201_CREATED)
def create_request(payload: RequestCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if payload.origin.casefold() == payload.destination.casefold():
        raise HTTPException(status_code=422, detail="origin_and_destination_must_differ")
    item = TransportRequest(
        request_number=f"TR-{datetime.now(timezone.utc):%y%m%d}-{token_hex(3).upper()}",
        customer_id=user.id, origin=payload.origin, destination=payload.destination,
        cargo_type=payload.cargo_type, weight_kg=payload.weight_kg,
        transport_date=payload.transport_date.isoformat(), phone=payload.phone,
        comment=payload.comment, status="pending",
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    item.customer = user
    return serialize(item)

@router.get("/my")
def my_requests(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    items = db.query(TransportRequest).options(joinedload(TransportRequest.customer)).filter(
        TransportRequest.customer_id == user.id
    ).order_by(TransportRequest.created_at.desc()).all()
    return {"items": [serialize(item) for item in items], "total": len(items)}

@router.get("/{request_id}")
def get_request(request_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.query(TransportRequest).options(joinedload(TransportRequest.customer)).filter(TransportRequest.id == request_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="request_not_found")
    if user.role != "admin" and item.customer_id != user.id:
        raise HTTPException(status_code=404, detail="request_not_found")
    return serialize(item)

@router.post("/{request_id}/cancel")
def cancel_request(request_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    item = db.get(TransportRequest, request_id)
    if item is None or (user.role != "admin" and item.customer_id != user.id):
        raise HTTPException(status_code=404, detail="request_not_found")
    if "cancelled" not in ALLOWED_TRANSITIONS[item.status]:
        raise HTTPException(status_code=409, detail="request_cannot_be_cancelled_in_current_status")
    item.status = "cancelled"
    item.updated_at = datetime.now(timezone.utc)
    db.commit()
    return {"message": "request_cancelled", "id": item.id, "status": item.status}

@router.get("/admin/all")
def all_requests(status_filter: str | None = Query(default=None, alias="status"),
                 db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    query = db.query(TransportRequest).options(joinedload(TransportRequest.customer))
    if status_filter:
        if status_filter not in ALLOWED_TRANSITIONS:
            raise HTTPException(status_code=422, detail="invalid_status_filter")
        query = query.filter(TransportRequest.status == status_filter)
    items = query.order_by(TransportRequest.created_at.desc()).all()
    return {"items": [serialize(item) for item in items], "total": len(items)}

@router.patch("/{request_id}/status")
def update_status(request_id: int, payload: RequestStatusUpdate,
                  db: Session = Depends(get_db), admin: User = Depends(require_admin)):
    item = db.get(TransportRequest, request_id)
    if item is None:
        raise HTTPException(status_code=404, detail="request_not_found")
    if payload.status not in ALLOWED_TRANSITIONS[item.status]:
        raise HTTPException(status_code=409, detail=f"invalid_status_transition:{item.status}->{payload.status}")
    item.status = payload.status
    item.admin_note = payload.admin_note
    item.updated_at = datetime.now(timezone.utc)
    db.commit()
    return {"message": "status_updated", "id": item.id, "status": item.status}
