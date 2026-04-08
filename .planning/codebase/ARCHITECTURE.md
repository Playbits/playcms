# Architecture

**Analysis Date:** 2026-04-08

## Pattern Overview

**Overall:** Modular Layered Architecture

**Key Characteristics:**
- **Separation of Concerns:** Clear boundaries between HTTP handling, business logic, and data access.
- **Domain-Driven Modules:** Backend logic is partitioned into domain-specific modules (e.g., `auth`, `product`, `order`) within `backend/internal/modules/`.
- **Multi-tenant Capable:** Project-scoped data access patterns are implemented across most modules to support multi-tenancy.
- **Stateless API:** JWT-based authentication enables a stateless backend.

## Layers

**Routing Layer:**
- Purpose: Define API endpoints, group routes, and apply middleware.
- Location: `backend/routes/router.go`
- Contains: Gin router configuration, route group definitions.
- Depends on: `backend/internal/middleware`, all module handlers.
- Used by: `backend/main.go`

**Handler Layer (Controller):**
- Purpose: Process incoming HTTP requests, validate input, and return responses.
- Location: `backend/internal/modules/*/handler.go`
- Contains: Gin handler functions, DTO mapping.
- Depends on: Service layer, `backend/internal/modules/*/dto.go`.
- Used by: Routing layer.

**Service Layer:**
- Purpose: Execute business logic and orchestrate repository calls.
- Location: `backend/internal/modules/*/service.go`
- Contains: Core business rules, validation, orchestration.
- Depends on: Repository layer, other services.
- Used by: Handler layer.

**Repository Layer:**
- Purpose: Abstract data access and perform database operations.
- Location: `backend/internal/modules/*/repository.go`
- Contains: GORM queries, database transactions.
- Depends on: `backend/internal/database` (GORM instance).
- Used by: Service layer.

**DTO Layer:**
- Purpose: Define the structure of data transferred between client and server.
- Location: `backend/internal/modules/*/dto.go`
- Contains: Request and Response structs.
- Depends on: None.
- Used by: Handler and Service layers.

## Data Flow

**API Request Flow:**

1. Client sends request to `/api/v3/...`
2. `backend/routes/router.go` matches the route and applies middleware (CORS -> Auth -> RateLimit).
3. `backend/internal/modules/*/handler.go` receives the request and binds it to a DTO.
4. `backend/internal/modules/*/service.go` processes the business logic.
5. `backend/internal/modules/*/repository.go` performs DB operations via GORM.
6. Response flows back through Service -> Handler -> Client.

**State Management:**
- **Backend:** Stateless, relies on JWT for session identity and Redis for rate limiting/caching.
- **Admin Frontend:** State managed via Pinia stores in `frontend/stores/`.
- **Client App:** State managed via Redux Toolkit in `playcms_client_app/src/store/`.

## Key Abstractions

**Domain Module:**
- Purpose: Encapsulate all logic for a specific business domain.
- Examples: `backend/internal/modules/product`, `backend/internal/modules/order`
- Pattern: Layered (Handler -> Service -> Repository).

**Middleware:**
- Purpose: Intercept requests for cross-cutting concerns.
- Examples: `backend/internal/middleware/auth.go` (Authorized), `backend/internal/middleware/admin.go` (AdminOnly).
- Pattern: Gin Middleware chain.

## Entry Points

**Backend Server:**
- Location: `backend/main.go`
- Triggers: Process start.
- Responsibilities: Initialize config, database, router, and start Gin server.

**Admin Dashboard:**
- Location: `frontend/app.vue`
- Triggers: Browser load.
- Responsibilities: App initialization, layout mounting, Nuxt plugin execution.

**Client Application:**
- Location: `playcms_client_app/src/app/page.tsx` (and other routes)
- Triggers: Browser load.
- Responsibilities: Next.js App Router rendering, Redux provider initialization.

## Error Handling

**Strategy:** Centralized Middleware Error Handling.

**Patterns:**
- **Internal Exceptions:** Custom error types defined in `backend/internal/exceptions/`.
- **Global Error Middleware:** `backend/internal/middleware/error_handler.go` catches panics and formats error responses consistently.

## Cross-Cutting Concerns

**Logging:** Handled via a custom logger in `backend/internal/logger/` and integrated into Gin middleware.
**Validation:** Input validation performed in handlers using DTO tags and custom logic in services.
**Authentication:** JWT-based authentication implemented in `backend/internal/modules/auth` and enforced by `middleware.Authorized()`.

---

*Architecture analysis: 2026-04-08*
