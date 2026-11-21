$ErrorActionPreference = "Stop"
if (-not (Test-Path ".venv")) { py -m venv .venv }
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
if (-not (Test-Path ".env")) { Copy-Item .env.example .env }
Write-Host "Starting Qamqor Cargo at http://127.0.0.1:8000" -ForegroundColor Green
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
