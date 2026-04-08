# Onboarding Guide: PlayCMS v2

## Overview
PlayCMS is a content management system with three distinct applications: an Admin Dashboard (Nuxt), a Go REST API backend, and a Client-facing Next.js app for end-users.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend API** | Go + Gin | 1.26 |
| **Backend ORM** | GORM | 1.30 |
| **Backend DB** | PostgreSQL / SQLite | - |
| **Backend Queue** | Asynq (Redis) | - |
| **Auth** | JWT + Redis refresh tokens | - |
| **Admin Dashboard** | Nuxt | 4.4.2 |
| **Admin UI** | PrimeVue + TailwindCSS | 4.x / 4.2 |
| **Admin State** | Pinia | 3.0 |
| **Client App** | Next.js | 16.2.1 |
| **Client UI** | PrimeReact + TailwindCSS | 10.x / 4.2 |
| **Client State** | Redux Toolkit | 2.x |

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   frontend/     │────▶│    backend/     │────▶│   Database      │
│   (Nuxt Admin)  │     │   (Go + Gin)    │     │   (PostgreSQL)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                        ┌─────────────────┐
                        │   Redis/Asynq   │
                        │   (Workers)     │
                        └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │ playcms_client/ │
                        │ (Next.js App)   │
                        └─────────────────┘
```

## Key Entry Points

- **Backend entry**: `backend/main.go` — initializes DB, Redis, router, worker
- **Backend routes**: `backend/routes/router.go` — Gin router setup
- **Admin frontend**: `frontend/nuxt.config.ts` — Nuxt configuration
- **Client frontend**: `playcms_client_app/next.config.ts` — Next.js configuration

## Directory Map

### Backend (`backend/`)
| Directory | Purpose |
|-----------|---------|
| `src/controllers/` | HTTP request handlers |
| `src/models/` | GORM data models |
| `src/middlewares/` | Gin middleware (auth, logging) |
| `src/services/` | Business logic (token_service.go) |
| `routes/` | Route definitions |
| `workers/` | Asynq background jobs |
| `database/` | DB connection + migrations |
| `internal/config/` | Configuration |
| `internal/modules/auth/` | Auth module (handler, dto, service) |

### Frontend (`frontend/`) - Admin Dashboard
| Directory | Purpose |
|-----------|---------|
| `pages/` | Nuxt pages (file-based routing) |
| `components/` | Vue components |
| `composables/` | Vue composables |
| `stores/` | Pinia stores |
| `server/` | Nuxt server routes (API proxy) |
| `layouts/` | Page layouts |
| `middleware/` | Route guards |

### Client App (`playcms_client_app/`)
| Directory | Purpose |
|-----------|---------|
| `src/app/` | Next.js App Router pages |
| `src/components/` | React components |
| `src/store/` | Redux slices |
| `src/lib/` | Utilities and API clients |
| `src/hooks/` | Custom hooks |
| `src/context/` | React context providers |

## Request Lifecycle

**Backend API**:
1. Request hits `routes/router.go` → Gin middleware chain
2. Middleware: CORS → DomainValidation → Authorized
3. Controller handles request (`src/controllers/`)
4. Model performs DB operation (GORM)
5. Response returned to client

## Conventions

### Backend (Go)
- **Naming**: snake_case for files, PascalCase for structs
- **Testing**: `*_test.go` in same package as code
- **Error handling**: Gin context-based error responses

### Frontend (Nuxt/Vue)
- **Naming**: PascalCase for components, camelCase for variables
- **State**: Pinia stores in `stores/`
- **API**: Axios, composables for data fetching

### Client App (Next.js)
- **Naming**: PascalCase for components, camelCase for files
- **State**: Redux Toolkit with `redux-persist`
- **Testing**: Vitest (test files not found in src/)
- **Linting**: ESLint with strict mode

## Common Tasks

### Backend
```bash
cd backend
go run main.go              # Start API server (port 8800)
air                         # Hot reload (requires .air.toml)
go test ./...               # Run tests
```

### Admin Frontend
```bash
cd frontend
yarn dev                    # Start dev server (port 8000)
yarn build                  # Production build
yarn format                 # Prettier format
```

### Client App
```bash
cd playcms_client_app
yarn dev                    # Start dev server (port 3000)
yarn build                  # Production build
yarn lint                   # ESLint check
yarn test                   # Vitest tests
yarn typecheck              # TypeScript check
```

## Where to Look

| I want to... | Look at... |
|--------------|-----------|
| Add API endpoint | `backend/internal/modules/` + `backend/routes/` |
| Add DB model | `backend/internal/database/models/` |
| Add background job | `backend/internal/worker/` |
| Modify auth behavior | `backend/internal/modules/auth/` + `backend/internal/services/token_service.go` |
| Add admin page | `frontend/pages/` |
| Add admin component | `frontend/components/` |
| Add client page | `playcms_client_app/src/app/` |
| Add client component | `playcms_client_app/src/components/` |
| Change client state | `playcms_client_app/src/store/` |

## Git Conventions

- **Branch strategy**: `main` (production), `dev` (development)
- **Commit style**: Descriptive lowercase messages (e.g., "remove local seeders", "fix bug and optimization")
- **PR workflow**: Squash merge from feature branches to dev/main