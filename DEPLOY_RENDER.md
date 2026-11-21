# Render deployment

## Render Web Service settings

- Runtime: Python 3
- Region: Frankfurt
- Plan: Free (suitable for a classroom demo)
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Health check path: `/health`

## Environment variables

Set these in Render > Environment:

- `JWT_SECRET`: generate a long random secret (at least 32 bytes).
- `ADMIN_EMAIL`: administrator email, e.g. `admin@example.com`.
- `ADMIN_PASSWORD`: a unique strong password. Do not use the development default.
- `ACCESS_TOKEN_EXPIRE_MINUTES`: `120` (optional).

## Important SQLite limitation

The app defaults to `sqlite:///./transport.db`. Render Free web services have an ephemeral filesystem. SQLite data may be lost after a restart, redeploy, or instance replacement. This deployment is for coursework/demo use only. For persistent data, attach a paid persistent disk and store the SQLite file on it, or migrate to a managed database.

## Deploy

Push the project to a Git repository, connect it in Render, select Python 3, apply the commands above, add the environment variables, and create the Web Service. After deployment, verify `/health`, `/docs`, and `/`.
