# Docker setup

Files added:

- `backend/Dockerfile` — Python/FastAPI image using `uvicorn`.
- `frontend/Dockerfile` — Node multi-stage build; serves `dist` via `nginx`.
- `docker-compose.yml` — Builds both services and supplies `.env` to containers.
- `frontend/nginx.conf` — Simple SPA fallback for Vite output.
- `.dockerignore` files for both services.

Build and run (Docker Compose):

```bash
docker-compose build
docker-compose up -d
```

Build single image (example):

```bash
# Backend
docker build -t finance-triage-backend:latest -f backend/Dockerfile .

# Frontend (from project root)
docker build -t finance-triage-frontend:latest frontend/
```

Notes:

- The project uses the repository `.env` (at project root). `docker-compose` will load it and pass variables into containers.
- For production, avoid committing secrets to `.env`; instead use a secrets manager.
