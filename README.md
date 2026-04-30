# PlayCMS v2

Modular Content Management System — Go API, Nuxt Admin Dashboard, Next.js Client App.

## Architecture

```
playcms_v2/
├── backend/          Go REST API (Gin + GORM + PostgreSQL + Redis)
├── frontend/         Admin Dashboard (Nuxt 4 + PrimeVue 4)
└── playcms_client_app/  Client Application (Next.js 16 + PrimeReact)
```

## Quick Links

| Component | README | Agent Guide | Dev Server |
|-----------|--------|-------------|------------|
| **Backend** | [backend/README.md](backend/README.md) | [backend/AGENTS.md](backend/AGENTS.md) | `:8800` |
| **Admin Dashboard** | [frontend/README.md](frontend/README.md) | [frontend/AGENTS.md](frontend/AGENTS.md) | `:8000` |
| **Client App** | [playcms_client_app/README.md](playcms_client_app/README.md) | [playcms_client_app/AGENTS.md](playcms_client_app/AGENTS.md) | `:3000` |

## Tech Stack

- **Backend**: Go 1.26, Gin, GORM, PostgreSQL, Redis, Asynq
- **Admin**: Nuxt 4, Vue 3, PrimeVue 4, TailwindCSS 4, Pinia
- **Client**: Next.js 16, React 19, PrimeReact 10, Redux Toolkit, TailwindCSS 4

## Prerequisites

- Go 1.26+
- Node.js (latest LTS)
- Yarn 4+
- PostgreSQL + Redis (shared infrastructure at `~/Playbit/shared-infrastructure/`)
- AWS S3 (media storage)

## Quick Start

The fastest way to start the entire stack (Docker, backend, both frontends, IDE, browser):

```bash
~/helpers/start_playcms.sh
```

This script starts Docker services, the Go backend (via `air`), the client app (`:3000`), and the admin dashboard (`:8000`), then opens them in your browser.

### Options

| Flag | Description |
|------|-------------|
| `-s` | Skip backend + Docker (frontends only) |
| `-a` | Skip admin frontend |
| `-n` | Don't open browser |
| `-d <dir>` | Override base directory |

### Manual Start

```bash
# Docker (PostgreSQL + Redis)
cd ~/Playbit/shared-infrastructure && docker compose up -d

# Backend
cd backend && cp .env.example .env  # edit .env
go mod tidy && air

# Admin Dashboard
cd frontend && yarn install && yarn dev --host

# Client App
cd playcms_client_app && yarn install && yarn dev
```

## Project Status

- **v3.0** — Blog Core & Lifecycle (shipped 2026-04-11)
- **v3.1** — Admin Experience (shipped 2026-04-12)
- **v3.2** — Public Delivery & SEO (next)

See [.planning/ROADMAP.md](.planning/ROADMAP.md) for full roadmap and [.planning/STATE.md](.planning/STATE.md) for current state.

## License

Proprietary — PlayCMS
