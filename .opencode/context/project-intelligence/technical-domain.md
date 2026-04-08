<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.1 | Updated: 2026-04-08 -->

# Technical Domain

**Purpose**: Tech stack, architecture, and development patterns for PlayCMS v2 monorepo.
**Last Updated**: 2026-04-08

## Quick Reference
**Update Triggers**: Tech stack changes | New modules | Architecture decisions
**Audience**: Developers, AI agents

## Primary Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Backend | Go + Gin | 1.23+ | High-performance REST API |
| ORM | GORM | Latest | PostgreSQL/SQLite compatibility |
| Admin FE | Nuxt 4 + Vue 3 | Latest | SSR dashboard |
| Client FE | Next.js 16 + React 19 | Latest | Client-facing app |
| State (Admin) | Pinia | Latest | Dashboard state management |
| State (Client) | Redux Toolkit | Latest | Client state with persistence |
| Styling | TailwindCSS 4 | Latest | Utility-first CSS |
| UI Components | PrimeVue (Admin) / PrimeReact (Client) | 4.x | Pre-built component library |
| Cache/Queue | Redis + Asynq | Latest | Background job processing |

## Project Structure

```
playcms_v2/
├── backend/           → Go REST API (Gin + GORM)
│   ├── internal/
│   │   ├── modules/  → Domain modules (auth, product, order, etc.)
│   │   ├── services/ → Shared cross-cutting services
│   │   ├── database/ → Models and DB connection
│   │   └── dto/      → Request/response structures
│   ├── routes/       → API route definitions
│   └── main.go      → Entry point
├── frontend/         → Admin Dashboard (Nuxt + PrimeVue)
│   ├── pages/       → File-based routing
│   ├── src/components/ → UI components
│   ├── stores/      → Pinia state stores
│   ├── service/     → API service layer
│   └── composables/ → Shared logic
└── playcms_client_app/ → Client-facing app (Next.js + PrimeReact)
```

## Code Patterns

### Go Handler (Backend)

```go
func (h *AuthHandler) Login(c *gin.Context) {
    var req LoginRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
        return
    }
    // ... business logic
    c.JSON(http.StatusOK, gin.H{"success": true, "user": user})
}
```

### Vue Component (Admin Frontend)

```vue
<script setup>
import Page from '~/src/components/dashboard/Page.vue';
import { useProjectStore } from '~/stores/project';
import { storeToRefs } from 'pinia';

const { project_loaded } = storeToRefs(useProjectStore());
definePageMeta({ layout: 'dashboard' });
</script>
<template>
  <Page v-if="project_loaded" />
</template>
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Go files | snake_case | auth_controller.go |
| Go structs | PascalCase | AuthHandler |
| Vue components | PascalCase | UserProfile.vue |
| Vue composables | camelCase | useAuth.ts |
| Pinia stores | camelCase | project.ts |
| React components | PascalCase | UserCard.tsx |
| React files | camelCase | userCard.tsx |

## Code Standards

- **Add comments**: Add comments to explain complex logic, public APIs, and non-obvious code
- **No TODO/FIXME**: Fix issues immediately or document in issues
- **TypeScript**: Strict typing from `types/` directory
- **Error handling**: Wrap errors with `fmt.Errorf("...: %w", err)`
- **Layering**: handlers → services → repositories
- **DTOs**: Use `internal/dto/` for all request/response structures
- **Module structure**: Each module has handler, service, repository, dto

## API Patterns

- Base path: `/api/v3`
- Authentication: JWT tokens in httpOnly cookies
- Protected routes: Require `middleware.Authorized()`
- Admin routes: Require `middleware.AdminOnly()`
- Response format: `{"success": true, "data": ...}` or `{"error": "..."}`
- Swagger docs: Swag annotations on handlers

## Security Requirements

- Validate all user input (request binding)
- Parameterized queries (GORM handles this)
- CORS middleware enabled
- Rate limiting: 100 req/min global, 10 req/min auth
- CSRF protection enabled
- Security headers middleware
- Body size limits: 4MB regular, 8MB multipart

## Build & Run

| Component | Command | Port |
|-----------|---------|------|
| Backend | `cd backend && go run main.go` | 8800 |
| Admin | `cd frontend && yarn dev` | 8000 |
| Client | `cd playcms_client_app && yarn dev` | 3000 |

## 📂 Codebase References

**Backend Entry**: `backend/main.go` → `backend/routes/router.go`
**Auth Handler**: `backend/internal/modules/auth/handler.go`
**Admin Page**: `frontend/pages/dashboard/index.vue`
**Config**: `backend/go.mod`, `frontend/package.json`, `playcms_client_app/package.json`

## Related Files

- Business Domain: business-domain.md (if exists)
- Decisions Log: decisions-log.md (if exists)
- Root Context: CLAUDE.md (project overview)
