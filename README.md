# Qamqor Cargo — Жүк тасымалдауға тапсырыс беру веб-қосымшасы

Оқу жобасы: Python + FastAPI backend және HTML/CSS/JavaScript frontend.

## Мүмкіндіктер
- Тіркелу және JWT арқылы кіру.
- Клиенттің жүк тасымалдауға өтінім беруі.
- Клиенттің өз өтінімдерінің тарихын көруі.
- Клиенттің рұқсат етілген кезеңде өтінімді тоқтатуы.
- Әкімшінің барлық өтінімдерді көруі және мәртебесін өзгертуі.
- Мәртебелердің рұқсат етілген ауысуын серверде тексеру.
- Swagger UI арқылы API құжаттамасы.

## Технологиялар
Python, FastAPI, SQLite, SQLAlchemy, Pydantic, JWT, Argon2, Jinja2, HTML, CSS, JavaScript.

## Windows 11 жүйесінде іске қосу
1. Python 3.11 немесе жаңарақ нұсқасын орнатыңыз.
2. Архивті ашып, жоба бумасына кіріңіз.
3. PowerShell ашыңыз.
4. Орындаңыз:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\run.ps1
```

5. Браузерде `http://127.0.0.1:8000` ашыңыз.
6. API құжаттамасы: `http://127.0.0.1:8000/docs`.

## Әкімші аккаунты
Әдепкі оқу аккаунты:
- Email: `admin@example.com`
- Password: `ChangeMe123!`

Өндірістік ортада бұл мәндерді міндетті түрде өзгертіңіз. `.env.example` файлын `.env` деп көшіріп, `JWT_SECRET` және әкімші деректерін жаңартыңыз.

## Қолмен орнату

```bash
python -m venv .venv
# Windows PowerShell:
.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Тесттер

```bash
python -m unittest discover -s tests -v
```

Тесттер жеке уақытша SQLite файлын пайдаланады. Қалыпты іске қосуда негізгі база `transport.db` файлына жазылады.

## API негізгі маршруттары

| Әдіс | Endpoint | Қол жеткізу |
|---|---|---|
| POST | `/api/auth/register` | Ашық |
| POST | `/api/auth/login` | Ашық |
| GET | `/api/auth/me` | Авторизация |
| POST | `/api/requests` | Клиент |
| GET | `/api/requests/my` | Клиент |
| GET | `/api/requests/{id}` | Иесі немесе әкімші |
| POST | `/api/requests/{id}/cancel` | Иесі немесе әкімші |
| GET | `/api/requests/admin/all` | Әкімші |
| PATCH | `/api/requests/{id}/status` | Әкімші |
| GET | `/health` | Ашық |

## Өтінім мәртебелерінің логикасы
- `pending` → `confirmed` немесе `cancelled`
- `confirmed` → `in_transit` немесе `cancelled`
- `in_transit` → `delivered`
- `delivered` және `cancelled` — соңғы мәртебелер.

Бұл оқу жобасында нақты баға есептеу, төлем, GPS бақылау, жүргізушілерді тағайындау және SMS жіберу қарастырылмаған.

## Құрылым

```text
app/
  config.py
  database.py
  dependencies.py
  main.py
  security.py
  seed.py
  models/entities.py
  schemas/auth.py
  schemas/requests.py
  routers/auth.py
  routers/requests.py
  templates/index.html
  static/css/style.css
  static/js/app.js
tests/test_api.py
requirements.txt
run.ps1
.env.example
```

## Ескерту
Бұл — оқу және демонстрациялық мақсаттағы бастапқы нұсқа. Интернетке жарияламас бұрын құпиясөздерді, JWT кілтін, HTTPS, rate limiting, CORS және деректерді резервтік көшіруді өндірістік талаптарға сай баптау қажет.

## Deploy to Render

This project can run as a Render Python Web Service.

- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check: `/health`

Set `JWT_SECRET` and `ADMIN_PASSWORD` as private environment variables. The default SQLite database is stored in the service filesystem; on Render Free, local filesystem data is ephemeral and can be reset after restarts or redeploys. Use a persistent disk or managed database if persistent production data is required.
