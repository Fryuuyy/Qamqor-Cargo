# Qamqor Cargo

FastAPI application for freight transport requests.

## Render deployment

Build command: `pip install -r requirements.txt`
Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
Health check: `/health`

Configure `JWT_SECRET` and `ADMIN_PASSWORD` as secure environment variables in Render. The default SQLite database is ephemeral on Render Free; use managed PostgreSQL for durable production data.
