# Дерекқор жобасы

## 1. users
| Өріс | Түрі | Түсіндірме |
|---|---|---|
| id | INTEGER PK | Бірегей идентификатор |
| full_name | VARCHAR(120) | Аты-жөні |
| email | VARCHAR(255) UNIQUE | Электрондық пошта |
| phone | VARCHAR(30) | Телефон |
| password_hash | VARCHAR(255) | Argon2 хеші |
| role | VARCHAR(20) | customer немесе admin |
| created_at | DATETIME | Тіркелген уақыты |

## 2. transport_requests
| Өріс | Түрі | Түсіндірме |
|---|---|---|
| id | INTEGER PK | Бірегей идентификатор |
| request_number | VARCHAR(24) UNIQUE | Өтінім нөмірі |
| customer_id | INTEGER FK | Өтінім иесі |
| origin | VARCHAR(120) | Бастапқы қала |
| destination | VARCHAR(120) | Соңғы қала |
| cargo_type | VARCHAR(80) | Жүк түрі |
| weight_kg | FLOAT | Салмақ, кг |
| transport_date | VARCHAR(10) | Тасымалдау күні |
| phone | VARCHAR(30) | Байланыс телефоны |
| comment | TEXT | Қосымша ақпарат |
| status | VARCHAR(20) | Өтінім мәртебесі |
| admin_note | TEXT | Әкімші ескертпесі |
| created_at | DATETIME | Құрылған уақыты |
| updated_at | DATETIME | Өзгертілген уақыты |

## Байланыс
`users (1) ───── (N) transport_requests`

Бір клиент бірнеше өтінім бере алады. Әр өтінім тек бір клиентке тиесілі.
