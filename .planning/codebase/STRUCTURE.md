# Codebase Structure

**Analysis Date:** 2026-04-08

## Directory Layout

```
[project-root]/
├── backend/                # Go REST API (Core Engine)
│   ├── internal/           # Private application code
│   │   ├── modules/        # Domain-driven business modules
│   │   ├── database/       # DB connection and GORM setup
│   │   ├── middleware/     # Gin HTTP middlewares
│   │   ├── services/       # Shared cross-module services
│   │   └── logger/         # System-wide logging
│   ├── routes/             # API route definitions and grouping
│   └── migrations/         # Database schema migrations
├── frontend/               # Admin Dashboard (Nuxt 4)
│   ├── pages/              # File-based routing
│   ├── stores/             # Pinia state management
│   ├── composables/        # Shared Vue composition functions
│   ├── service/            # API client wrappers
│   └── layouts/            # Page layout templates
└── playcms_client_app/     # Client-facing Storefront (Next.js 16)
    ├── src/
    │   ├── app/            # Next.js App Router (Pages & API)
    │   ├── components/     # UI Components (PrimeReact)
    │   ├── store/          # Redux Toolkit state
    │   ├── lib/            # Utility functions and API clients
    │   └── types/          # TypeScript type definitions
    └── public/             # Static assets
```

## Directory Purposes

**backend/internal/modules/:**
- Purpose: House all business logic partitioned by domain.
- Contains: `handler.go`, `service.go`, `repository.go`, `dto.go` for each module.
- Key files: `backend/internal/modules/auth/handler.go`, `backend/internal/modules/product/service.go`

**backend/routes/:**
- Purpose: Centralize the mapping of HTTP paths to handler functions.
- Contains: Router initialization and route group definitions.
- Key files: `backend/routes/router.go`

**frontend/stores/:**
- Purpose: Manage global state for the Admin panel.
- Contains: Pinia store definitions.
- Key files: `frontend/stores/project.ts`, `frontend/stores/product.ts`

**playcms_client_app/src/app/:**
- Purpose: Define the application structure and routing for the storefront.
- Contains: Page components and server actions.
- Key files: `playcms_client_app/src/app/page.tsx`

## Key File Locations

**Entry Points:**
- `backend/main.go`: Backend server bootstrap.
- `frontend/app.vue`: Admin frontend entry.
- `playcms_client_app/src/app/layout.tsx`: Client app root layout.

**Configuration:**
- `backend/internal/config/config.go`: Backend env config loading.
- `frontend/nuxt.config.ts`: Nuxt framework configuration.
- `playcms_client_app/next.config.ts`: Next.js framework configuration.

**Core Logic:**
- `backend/internal/modules/*/service.go`: Business rule implementation.
- `backend/internal/modules/*/repository.go`: Database interaction logic.

**Testing:**
- `backend/internal/modules/**/*_test.go`: Go unit/integration tests.
- `playcms_client_app/src/setupTests.ts`: Client app test config.

## Naming Conventions

**Files:**
- Backend: `snake_case.go` (e.g., `auth_controller.go`)
- Admin Frontend: `PascalCase.vue` for components, `camelCase.ts` for others.
- Client App: `camelCase.tsx` or `PascalCase.tsx` for components.

**Directories:**
- Backend: `snake_case` (e.g., `internal/modules/user`)
- Frontend: `camelCase` or `lowercase` (e.g., `composables`, `stores`)

## Where to Add New Code

**New Feature (Backend):**
- Primary code: Create a new module in `backend/internal/modules/[feature_name]/` with `handler.go`, `service.go`, `repository.go`, and `dto.go`.
- Routing: Add the new routes to `backend/routes/router.go`.
- Tests: Add `*_test.go` in the same module directory.

**New Component (Admin):**
- Implementation: `frontend/components/[ComponentName].vue`
- Logic: `frontend/composables/use[Feature].ts`
- State: `frontend/stores/[feature].ts`

**New Page (Client):**
- Implementation: `playcms_client_app/src/app/[route]/page.tsx`
- Component: `playcms_client_app/src/components/[ComponentName].tsx`

**Utilities:**
- Backend: `backend/internal/services/` for shared business logic.
- Client App: `playcms_client_app/src/lib/` for helper functions.

## Special Directories

**backend/migrations/:**
- Purpose: SQL scripts for versioning the database schema.
- Generated: Manual/Tool-generated.
- Committed: Yes.

**playcms_client_app/public/:**
- Purpose: Static files served directly by the web server.
- Generated: No.
- Committed: Yes.

---

*Structure analysis: 2026-04-08*
