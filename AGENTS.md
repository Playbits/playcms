<!-- GSD:project-start source:PROJECT.md -->
## Project

**Project: PlayCMS v2 Evolution**

PlayCMS v2 is a modular Content Management System designed for high performance and extensibility. It consists of a Go-based REST API, a Nuxt-powered Admin Dashboard, and a Next.js-powered Client Application. The current objective is to evolve the core CMS capabilities and implement a comprehensive Blog system.

**Core Value:** Provide a seamless, high-performance content creation and delivery experience that balances powerful administrative control with a fast, SEO-optimized end-user interface.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- Go 1.26.0 - Used for the backend REST API (`backend/`)
- TypeScript 5.9.3 - Used across both frontend applications (`frontend/`, `playcms_client_app/`)
- Vue 3.5.30 - Admin Dashboard framework (`frontend/`)
- React 19.2.4 - Client-facing application framework (`playcms_client_app/`)
- HTML/CSS/SCSS - UI styling and structure
## Runtime
- Node.js (for frontend builds and development)
- Go Runtime (for backend execution)
- Yarn 4.10.3 (Admin Frontend)
- Yarn 4.13.0 (Client App)
- Go Modules (Backend)
- Lockfile: `yarn.lock` present in frontend directories, `go.sum` present in backend.
## Frameworks
- Gin v1.12.0 - Backend REST API framework (`backend/`)
- Nuxt v4.4.2 - Admin Dashboard framework (`frontend/`)
- Next.js v16.2.1 (App Router) - Client Application framework (`playcms_client_app/`)
- Vitest v4.1.0 - Client App testing (`playcms_client_app/`)
- React Testing Library v16.3.2 - Client App component testing
- Go `testing` package - Backend unit tests (`backend/**/*.test.go`)
- Vite - Nuxt build tool (`frontend/`)
- Next.js Compiler - Client App build tool (`playcms_client_app/`)
- Swaggo - Backend API documentation generator (`backend/`)
## Key Dependencies
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
- AWS SDK v2 - Integration with S3 and SES (`backend/`)
- Resend v2.28.0 - Email delivery service (`backend/`)
- Mailjet - Email delivery service (`backend/`)
## Configuration
- Configured via `.env` files in each project root.
- Backend: `backend/.env`
- Admin: `frontend/.env`
- Client: `playcms_client_app/.env.local`
- `backend/go.mod`
- `frontend/nuxt.config.ts`
- `playcms_client_app/next.config.ts`
- `playcms_client_app/tsconfig.json`
## Platform Requirements
- Go 1.26+
- Node.js (latest LTS)
- Yarn 4+
- PostgreSQL or SQLite
- Linux environment
- PostgreSQL database
- Redis server
- AWS S3 for media storage
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
### Backend (Go)
- **Files:** Use `snake_case` (e.g., `auth_controller.go`, `product_service.go`).
- **Structs:** Use `PascalCase` (e.g., `UserRequest`, `ProductResponse`).
- **Functions:** Use `PascalCase` for exported functions and `camelCase` for internal functions.
- **Tests:** Files must end with `_test.go` and be co-located with the code they test.
### Admin Frontend (Nuxt/Vue)
- **Components:** Use `PascalCase` for component files and names (e.g., `UserForm.vue`).
- **Composables:** Use `camelCase` and prefix with `use` (e.g., `useAuth.ts`, `useProduct.ts`).
- **Variables/Functions:** Use `camelCase`.
- **Types:** Use `PascalCase` for type definitions in `types/`.
### Client Frontend (Next.js/React)
- **Components (Files):** Primarily use `kebab-case` for file names (e.g., `hero-category-link.tsx`, `shopping-cart.tsx`), though some special pages use `PascalCase` (e.g., `MaintenancePage.tsx`).
- **Components (Definitions):** Always use `PascalCase` for the React component function name.
- **Files (Others):** Use `camelCase` or `kebab-case`.
- **Variables/Functions:** Use `camelCase`.
## Code Style
### Formatting
- **Backend:** Standard `go fmt`.
- **Admin Frontend:** Prettier enforced via `yarn format`.
- **Client Frontend:** Prettier enforced via `yarn format` and `lint-staged`.
### Linting
- **Backend:** Standard Go linting.
- **Admin Frontend:** ESLint using `eslint.config.js` with `plugin:vue/vue3-recommended` and `plugin:nuxt/recommended`.
- **Client Frontend:** ESLint with `next lint` and strict mode enabled (`yarn lint:strict`).
## Import Organization
### Path Aliases
- **Client Frontend:** Use `@/` to refer to the `src/` directory (e.g., `import { User } from '@/datatypes/user'`).
## Error Handling
### Backend (Go)
- **Centralized Strategy:** Use the `exceptions` package for standardized error handling.
- **Custom Error Type:** Use `AppError` to encapsulate error codes and messages.
- **Patterns:**
## Function Design
### Backend (Go)
- **Constructors:** Use the `New[StructName]` pattern for initializing services or repositories (e.g., `NewAuthService`).
- **Modularization:** Logic is split into `handler`, `service`, and `repository` within each module in `backend/internal/modules/`.
## Module Design
### Backend (Go)
- **Structure:** Follow a modular layout under `backend/internal/modules/[module_name]/`.
- **Components:** Each module typically contains:
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- **Separation of Concerns:** Clear boundaries between HTTP handling, business logic, and data access.
- **Domain-Driven Modules:** Backend logic is partitioned into domain-specific modules (e.g., `auth`, `product`, `order`) within `backend/internal/modules/`.
- **Multi-tenant Capable:** Project-scoped data access patterns are implemented across most modules to support multi-tenancy.
- **Stateless API:** JWT-based authentication enables a stateless backend.
## Layers
- Purpose: Define API endpoints, group routes, and apply middleware.
- Location: `backend/routes/router.go`
- Contains: Gin router configuration, route group definitions.
- Depends on: `backend/internal/middleware`, all module handlers.
- Used by: `backend/main.go`
- Purpose: Process incoming HTTP requests, validate input, and return responses.
- Location: `backend/internal/modules/*/handler.go`
- Contains: Gin handler functions, DTO mapping.
- Depends on: Service layer, `backend/internal/modules/*/dto.go`.
- Used by: Routing layer.
- Purpose: Execute business logic and orchestrate repository calls.
- Location: `backend/internal/modules/*/service.go`
- Contains: Core business rules, validation, orchestration.
- Depends on: Repository layer, other services.
- Used by: Handler layer.
- Purpose: Abstract data access and perform database operations.
- Location: `backend/internal/modules/*/repository.go`
- Contains: GORM queries, database transactions.
- Depends on: `backend/internal/database` (GORM instance).
- Used by: Service layer.
- Purpose: Define the structure of data transferred between client and server.
- Location: `backend/internal/modules/*/dto.go`
- Contains: Request and Response structs.
- Depends on: None.
- Used by: Handler and Service layers.
## Data Flow
- **Backend:** Stateless, relies on JWT for session identity and Redis for rate limiting/caching.
- **Admin Frontend:** State managed via Pinia stores in `frontend/stores/`.
- **Client App:** State managed via Redux Toolkit in `playcms_client_app/src/store/`.
## Key Abstractions
- Purpose: Encapsulate all logic for a specific business domain.
- Examples: `backend/internal/modules/product`, `backend/internal/modules/order`
- Pattern: Layered (Handler -> Service -> Repository).
- Purpose: Intercept requests for cross-cutting concerns.
- Examples: `backend/internal/middleware/auth.go` (Authorized), `backend/internal/middleware/admin.go` (AdminOnly).
- Pattern: Gin Middleware chain.
## Entry Points
- Location: `backend/main.go`
- Triggers: Process start.
- Responsibilities: Initialize config, database, router, and start Gin server.
- Location: `frontend/app.vue`
- Triggers: Browser load.
- Responsibilities: App initialization, layout mounting, Nuxt plugin execution.
- Location: `playcms_client_app/src/app/page.tsx` (and other routes)
- Triggers: Browser load.
- Responsibilities: Next.js App Router rendering, Redux provider initialization.
## Error Handling
- **Internal Exceptions:** Custom error types defined in `backend/internal/exceptions/`.
- **Global Error Middleware:** `backend/internal/middleware/error_handler.go` catches panics and formats error responses consistently.
## Authentication & Authorization Architecture
### Middleware Chain (in `backend/routes/router.go`)
- **`OptionalAuth()`** — Tries API key first, then JWT. If neither provided, continues without identity (no abort). Used for public read endpoints (blogs, products).
- **`ApiKeyAuth() + RequireApiKey()`** — Validates `X-API-Key` header. Aborts 401 if missing/invalid. Used for categories, tags, blog-sitemap, blog-search.
- **`Authorized()`** — Requires JWT Bearer token. Aborts 401 if missing/invalid. Used for all write operations.
- **`Authorized() + AdminOnly()`** — JWT required + `user.IsAdmin()` check. Used for project/product create/update/delete, post status/parent changes, API key creation.
### Route Auth Mapping
| Endpoint Group | Auth Middleware | Notes |
|---|---|---|
| GET /blogs, /blogs/:id, /post/schema/:slug | `OptionalAuth()` | Public reads, project_id from context if authed |
| GET /products, /products/:id, /products/project/:projectId | `OptionalAuth()` | Public reads |
| GET /categories, /categories/:id | `ApiKeyAuth() + RequireApiKey()` | API key required |
| GET /tags, /tags/:id | `ApiKeyAuth() + RequireApiKey()` | API key required |
| /blog-sitemap.xml, /blog-search | `ApiKeyAuth() + RequireApiKey()` | API key required (also registered inside BlogRoutes with RateLimiter — API-level routes win) |
| POST/PATCH/DELETE blogs, posts, comments, products, orders | `Authorized()` | JWT required |
| POST/PATCH/DELETE projects, products (admin ops) | `Authorized() + AdminOnly()` | Admin only |
### Known Route Conflict
- `/blog-sitemap.xml` and `/blog-search` are registered BOTH at API level (lines 159-160, `ApiKeyAuth()+RequireApiKey()`) AND inside BlogRoutes (lines 374-380, `RateLimiter()`). The API-level routes take precedence by routing priority.
## Security Fixes Applied (commit a94b917)
- Fixed auth bypass in `GetSchemaPost`, `GetSchemaPostWithRelated`, `GetRelatedPosts` — these endpoints now enforce proper auth
- Added `isValidSlug()` input validation to prevent injection
- Fixed `hasPermission` nil pointer dereference
- Added `GetPublishedRelatedPosts` to blog service interface
- Added rate limiting for public blog endpoints
- Order handler: introduced `OrderServiceInterface` for testability
- Order service: added nil guard for `worker.GlobalWorker` before Enqueue
## Cross-Cutting Concerns
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
