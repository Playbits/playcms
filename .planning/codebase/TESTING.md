# Testing Patterns

**Analysis Date:** 2026-04-08

## Test Framework

### Backend (Go)
- **Runner:** Standard Go testing tool `go test`.
- **Run Commands:**
```bash
go test ./...              # Run all tests
make test                  # Project shortcut to run tests
```

### Client Frontend (Next.js/React)
- **Runner:** Vitest
- **Assertion Library:** React Testing Library and `@testing-library/jest-dom`.
- **Config:** `playcms_client_app/package.json` specifies `vitest`.
- **Run Commands:**
```bash
yarn test                   # Run all tests
yarn test:ui                # Run Vitest with UI mode
```

### Admin Frontend (Nuxt/Vue)
- **Runner:** Not explicitly detected. Primary verification is via `yarn format` and `npx eslint .`.

## Test File Organization

### Backend (Go)
- **Location:** Co-located with the source file.
- **Naming:** `*_test.go`.
- **Example:** `backend/internal/modules/auth/auth_test.go`.

### Client Frontend (Next.js/React)
- **Location:** Co-located with the component.
- **Naming:** `*.test.tsx` or `*.test.ts`.
- **Example:** `playcms_client_app/src/components/Products.test.tsx`.

## Test Structure

### Backend (Go)
- **Patterns:** Use of standard `TestXxx(t *testing.T)` functions. Integration tests are explicitly named (e.g., `integration_test.go`).

### Client Frontend (Next.js/React)
- **Patterns:** Use of `describe`, `it`/`test`, and `expect` from Vitest.
- **Component Testing:** Use `render` from React Testing Library to mount components and `screen` for assertions.

## Mocking

### Client Frontend (Next.js/React)
- **Framework:** Vitest mocks.
- **Patterns:** Use of `__mocks__` directories for reusable mocks.
- **Example:** `playcms_client_app/src/components/__mocks__/navigation.ts`.

## Coverage

- **Requirements:** No explicit coverage percentage enforced in configuration files, but `yarn test` is a required pre-commit hook for the client app via Husky.

## Test Types

### Unit Tests
- **Backend:** Logic tests in `*_test.go` files across services and modules.
- **Client Frontend:** Component unit tests using Vitest.

### Integration Tests
- **Backend:** Explicitly identified by `integration_test.go` files in modules (e.g., `backend/internal/modules/order/integration_test.go`).

### E2E Tests
- **Not Detected:** No dedicated E2E framework (like Playwright or Cypress) was found in the project roots.

---

*Testing analysis: 2026-04-08*
