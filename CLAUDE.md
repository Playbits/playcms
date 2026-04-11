# Project Instructions

## Tech Stack

- **Backend**: Go 1.25+, Gin, GORM (PostgreSQL), Redis/Asynq
- **Admin Frontend**: Nuxt 4, Vue 3, PrimeVue, Pinia, TailwindCSS 4
- **Client Frontend**: Next.js 16, React 19, PrimeReact, Redux Toolkit, TailwindCSS 4

## Code Style

### Backend (Go)

- File naming: snake_case (e.g., `auth_controller.go`)
- Struct naming: PascalCase
- Tests: `*_test.go` in same directory as code

### Admin Frontend (Nuxt/Vue)

- Components: PascalCase (e.g., `UserForm.vue`)
- Composables: camelCase
- State: Pinia stores

### Client Frontend (Next.js/React)

- Components: PascalCase
- Files: camelCase
- State: Redux Toolkit with redux-persist

## Testing

- **Backend**: `go test ./...`
- **Admin Frontend**: `yarn format` (Prettier) & `npx eslint .` (Manual Lint)
- **Client App**: `yarn test` (Vitest)
- **Client App Typecheck**: `yarn typecheck`

## Environment

- **Admin Frontend**: `.env` requires `NUXT_API_URL`, `NUXT_COOKIE_NAME`, `NUXT_COOKIE_SECRET`
- **Backend**: `.env` requires DB and Redis configurations

## Build & Run

### Backend

```bash
cd backend
go run main.go              # Port 8800
# OR for live reload:
nohup air > server.log 2>&1 &
# Health check: curl http://localhost:8800/health
```

### Admin Frontend

```bash
cd frontend
yarn dev                    # Port 8000
```

### Client App

```bash
cd playcms_client_app
yarn dev                    # Port 3000
yarn build                  # Production build
yarn lint                   # ESLint
```

## Project Structure

```
backend/           → Go REST API (Gin + GORM)
frontend/          → Admin Dashboard (Nuxt + PrimeVue)
playcms_client_app/ → Client-facing app (Next.js + PrimeReact)
```

## Key Entry Points

- Backend: `backend/main.go` → `backend/routes/router.go`
- Admin: `frontend/nuxt.config.ts`
- Client: `playcms_client_app/next.config.ts`

## Conventions

- **Branch strategy**: `main` (production), `dev` (development)
- **Commit style**: Descriptive lowercase messages (e.g., "remove local seeders", "fix bug and optimization")
- **PR workflow**: Squash merge from feature branches to dev/main
- **Middleware chain**: CORS → DomainValidation → Authorized (in that order)

## Current Development Status

- **Phase 01**: Stability & Migration - COMPLETED
- **Phase 02**: Core Schema Engine - COMPLETED  
- **Phase 03**: Blog Core & Lifecycle - IN PROGRESS (3/6 plans executed)
- **Phase 04**: Admin Experience (Editor & UI) - NOT STARTED
- **Phase 05**: Public Delivery & SEO - NOT STARTED
- **Phase 06**: Advanced CMS Evolution - NOT STARTED
- **Phase 07**: Performance & UX Polish - NOT STARTED

## Infrastructure Notes

- Database: PostgreSQL running in shared infrastructure at `/home/playbit/Playbit/shared-infrastructure`
- Redis: Running at `redis://localhost:6379`
- Backend API: Available at `http://localhost:8800` with health endpoint `/health`
- Backend uses air for live reload with logs in `server.log`
