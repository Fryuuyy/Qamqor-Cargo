from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from app.config import APP_TITLE
from app.database import Base, engine
from app import models  # noqa: F401 - registers ORM models
from app.seed import seed_admin
from app.routers import auth, requests

BASE_DIR = Path(__file__).resolve().parent
app = FastAPI(title=APP_TITLE, version="1.0.0", description="Оқу жобасы: жүк тасымалдауға тапсырыс беру")
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=BASE_DIR / "templates")
app.include_router(auth.router)
app.include_router(requests.router)

@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)
    seed_admin()

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(request, "index.html")

@app.get("/health")
def health():
    return {"status": "ok", "service": "transport-booking-api"}
