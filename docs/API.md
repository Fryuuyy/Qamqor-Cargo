# API келісімшарты

Барлық JSON сұраныстарында `Content-Type: application/json` қолданылады. Қорғалған маршруттарға `Authorization: Bearer <token>` тақырыбы қажет.

## Авторизация

### POST `/api/auth/register`
```json
{"full_name":"Аты-жөні","email":"user@example.com","phone":"+77000000000","password":"Password123!"}
```
Жауап: `201 Created`, `access_token`, `token_type`, `user`.

### POST `/api/auth/login`
```json
{"email":"user@example.com","password":"Password123!"}
```
Жауап: `200 OK` және токен.

### GET `/api/auth/me`
Токен иесінің профилін қайтарады.

## Тасымалдау өтінімдері

### POST `/api/requests`
```json
{
  "origin":"Көкшетау",
  "destination":"Астана",
  "cargo_type":"Жиһаз",
  "weight_kg":500,
  "transport_date":"2099-12-25",
  "phone":"+77000000000",
  "comment":"Қосымша ақпарат"
}
```
Жауап: `201 Created`. Өтінім `pending` мәртебесімен жасалады.

### GET `/api/requests/my`
Ағымдағы клиенттің өтінімдері.

### GET `/api/requests/{id}`
Өтінім иесі немесе әкімші үшін қолжетімді. Басқа клиентке тиесілі өтінім 404 қайтарады.

### POST `/api/requests/{id}/cancel`
Клиент өзінің өтінімін `pending` немесе `confirmed` күйінде тоқтата алады.

### GET `/api/requests/admin/all`
Тек әкімші. Барлық өтінімдер. Қосымша `?status=pending` сүзгісі бар.

### PATCH `/api/requests/{id}/status`
Тек әкімші.
```json
{"status":"confirmed","admin_note":"Өтінім расталды"}
```

## Қате кодтары
- `401` — токен жоқ немесе жарамсыз.
- `403` — әкімші құқығы қажет.
- `404` — өтінім табылмады немесе ағымдағы клиентке тиесілі емес.
- `409` — email бұрын тіркелген немесе мәртебе ауысуы рұқсат етілмеген.
- `422` — Pydantic немесе бизнес-валидация қатесі.
