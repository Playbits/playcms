# Technology Stack

**Analysis Date:** 2026-04-08

## Languages

**Primary:**
- Go 1.26.0 - Used for the backend REST API (`backend/`)
- TypeScript 5.9.3 - Used across both frontend applications (`frontend/`, `playcms_client_app/`)

**Secondary:**
- Vue 3.5.30 - Admin Dashboard framework (`frontend/`)
- React 19.2.4 - Client-facing application framework (`playcms_client_app/`)
- HTML/CSS/SCSS - UI styling and structure

## Runtime

**Environment:**
- Node.js (for frontend builds and development)
- Go Runtime (for backend execution)

**Package Manager:**
- Yarn 4.10.3 (Admin Frontend)
- Yarn 4.13.0 (Client App)
- Go Modules (Backend)
- Lockfile: `yarn.lock` present in frontend directories, `go.sum` present in backend.

## Frameworks

**Core:**
- Gin v1.12.0 - Backend REST API framework (`backend/`)
- Nuxt v4.4.2 - Admin Dashboard framework (`frontend/`)
- Next.js v16.2.1 (App Router) - Client Application framework (`playcms_client_app/`)

**Testing:**
- Vitest v4.1.0 - Client App testing (`playcms_client_app/`)
- React Testing Library v16.3.2 - Client App component testing
- Go `testing` package - Backend unit tests (`backend/**/*.test.go`)

**Build/Dev:**
- Vite - Nuxt build tool (`frontend/`)
- Next.js Compiler - Client App build tool (`playcms_client_app/`)
- Swaggo - Backend API documentation generator (`backend/`)

## Key Dependencies

**Critical:**
- GORM v1.31.1 - Database ORM for PostgreSQL/SQLite (`backend/`)
- Redis v9.18.0 - Caching and state management (`backend/`)
- Asynq v0.26.0 - Distributed task queue for background jobs (`backend/`)
- PrimeVue v4.5.4 - UI component library for Admin Dashboard (`frontend/`)
- PrimeReact v10.9.7 - UI component library for Client App (`playcms_client_app/`)
- TailwindCSS v4.2.2 - Utility-first CSS framework (both frontends)
- Pinia v3.0.4 - State management for Admin Dashboard (`frontend/`)
- Redux Toolkit v2.11.2 - State management for Client App (`playcms_client_app/`)
- NextAuth v4.24.13 - Authentication for Client App (`playcms_client_app/`)
- Axios v1.13.6 - HTTP client for API communication

**Infrastructure:**
- AWS SDK v2 - Integration with S3 and SES (`backend/`)
- Resend v2.28.0 - Email delivery service (`backend/`)
- Mailjet - Email delivery service (`backend/`)

## Configuration

**Environment:**
- Configured via `.env` files in each project root.
- Backend: `backend/.env`
- Admin: `frontend/.env`
- Client: `playcms_client_app/.env.local`

**Build:**
- `backend/go.mod`
- `frontend/nuxt.config.ts`
- `playcms_client_app/next.config.ts`
- `playcms_client_app/tsconfig.json`

## Platform Requirements

**Development:**
- Go 1.26+
- Node.js (latest LTS)
- Yarn 4+
- PostgreSQL or SQLite

**Production:**
- Linux environment
- PostgreSQL database
- Redis server
- AWS S3 for media storage

---

*Stack analysis: 2026-04-08*
