# Task Context: Order Module Implementation

Session ID: 2026-04-23-order-implementation
Created: 2026-04-23T14:15:00Z
Status: completed

## Current Request
Implement the backend implementation for the `order` module, including the handler, service, repository, and DTOs.

## Context Files (Standards to Follow)
- `backend/CLAUDE.md`
- `.opencode/context/project-intelligence/technical-domain.md`

## Reference Files (Source Material to Look At)
- `backend/internal/database/models/order.go`
- `backend/internal/seeder/order.go`
- `backend/internal/mailer/templates/order_status.html`
- `backend/internal/mailer/templates/order_invoice.html`
- `backend/internal/modules/project/handler.go` (for pattern reference)
- `backend/internal/modules/product/handler.go` (for pattern reference)

## External Docs Fetched
None

## Components
- `OrderHandler`: API endpoints for order management.
- `OrderService`: Business logic for orders.
- `OrderRepository`: Data access layer for orders.
- `OrderDTOs`: Request and response structures.

## Constraints
- Follow the handler → service → repository layering.
- Use `internal/modules/[module]/dto.go` for request/response structures.
- Use `snake_case` for files and `PascalCase` for structs.
- Use `fmt.Errorf("...: %w", err)` for error wrapping.
- Ensure all endpoints are documented with Swag annotations.
- Implement error handling using the project's `exceptions` package.

## Exit Criteria
- [x] `OrderHandler`, `OrderService`, `OrderRepository`, and `OrderDTOs` are implemented.
- [x] All endpoints are documented with Swag annotations.
- [x] The module compiles without errors.
- [x] The implementation follows the project's layering and naming conventions.
- [x] `OrderServiceInterface` introduced for testability (security fix).
- [x] Nil guard for `worker.GlobalWorker` before Enqueue (security fix).
- [x] Full test suite with mock repos and services (`order_test.go`).

## Completion Notes
Order module fully implemented with handler, service, repository, and DTOs. Security hardening added (OrderServiceInterface, nil guard). Test suite written with mocks.
