# Coding Conventions

**Analysis Date:** 2026-04-08

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
  - Define errors in `backend/internal/exceptions/errors.go`.
  - Use `exceptions.Handle(c, err)` in controllers to automatically map errors to HTTP status codes.
  - Use helper functions like `exceptions.NotFound("message")` to create specific error types.

## Function Design

### Backend (Go)
- **Constructors:** Use the `New[StructName]` pattern for initializing services or repositories (e.g., `NewAuthService`).
- **Modularization:** Logic is split into `handler`, `service`, and `repository` within each module in `backend/internal/modules/`.

## Module Design

### Backend (Go)
- **Structure:** Follow a modular layout under `backend/internal/modules/[module_name]/`.
- **Components:** Each module typically contains:
  - `handler.go`: API request handling.
  - `service.go`: Business logic.
  - `repository.go`: Database access.
  - `dto.go`: Request/Response data transfer objects.

---

*Convention analysis: 2026-04-08*
