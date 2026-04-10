# API Surface Audit Report: v3 Migration

This report documents discrepancies between the v3 Backend API surface and the API calls made by the Admin Dashboard (Nuxt) and Client Application (Next.js).

## Summary Table

| Frontend | Endpoint Called | Backend v3 Endpoint | Type | Issue |
|----------|-----------------|-------------------|------|-------|
| Admin | `/api/health` | `/health` | 404/Mismatch | Endpoint path difference |
| Admin | `PUT /projects/:id` | `PATCH /projects/:id` | Signature | HTTP Method mismatch |
| Client | `/api/auth/refresh` | `/api/v3/auth/refresh` | 404/Mismatch | Missing `/v3` prefix |
| Client | `/api/auth/csrf` | `/api/v3/auth/csrf` | 404/Mismatch | Missing `/v3` prefix |
| Client | `/api/v3/blogs/slug/1/:slug` | `/api/v3/blogs/post/schema/:slug` | 404/Mismatch | Path mismatch |
| Client | `/api/v3/blogs/:id/comments` | `/api/v3/blogs/post/:id/comments` | 404/Mismatch | Path mismatch (missing `/post`) |
| Client | `/api/v3/blogs/project/:id` | `/api/v3/blogs` or `/api/v3/blogs/posts` | 404/Mismatch | Endpoint does not exist |
| Admin | `/api/auth/test-token` | N/A | 404 | Not defined in `router.go` |
| Admin | `/api/projects/test-connection` | N/A | 404 | Not defined in `router.go` |
| Client | `/blogs/slug/:projectId/:slug` | N/A | 404 | No corresponding blog slug endpoint in v3 |
| Client | `/order/check` | N/A | 404 | Not defined in `router.go` |

## Detailed Discrepancies

### 1. Admin Dashboard (frontend/)

#### Project Updates
- **Call:** `PUT /projects/:id` (in `frontend/server/api/projects/[id].put.ts`)
- **Expected:** `PATCH /api/v3/projects/:id`
- **Issue:** Signature Mismatch. The backend uses `PATCH` for updates, but the frontend sends `PUT`.

#### Health Check
- **Call:** `/api/health` (in `frontend/pages/test/auth.vue`)
- **Expected:** `/health`
- **Issue:** 404/Mismatch. Backend health check is at root `/health`, frontend calls `/api/health`.

#### Undefined Endpoints
- `/api/auth/test-token` (in `frontend/pages/test/auth.vue`)
- `/api/projects/test-connection` (in `frontend/pages/test/auth.vue`)

### 2. Client Application (playcms_client_app/)

#### Authentication
- **Calls:** `/api/auth/refresh` and `/api/auth/csrf` (in `src/lib/api.ts`)
- **Expected:** `/api/v3/auth/refresh` and `/api/v3/auth/csrf`
- **Issue:** 404/Mismatch. API calls are missing the `/v3` version prefix.

#### Blog System
- **Post by Slug:**
  - **Call:** `/api/v3/blogs/slug/1/${slug}` (in `src/app/blog/[slug]/page.tsx`)
  - **Expected:** `/api/v3/blogs/post/schema/:slug`
  - **Issue:** 404/Mismatch. The path `/blogs/slug/1/...` does not exist in v3 backend.
- **Post Comments:**
  - **Call:** `/api/v3/blogs/${id}/comments` (in `src/app/blog/[slug]/page.tsx`)
  - **Expected:** `/api/v3/blogs/post/:id/comments`
  - **Issue:** 404/Mismatch. Missing `/post` segment in the path.
- **Blog Posts List:**
  - **Call:** `/api/v3/blogs/project/${projectId}` (in `src/app/blog/page.tsx`)
  - **Expected:** `/api/v3/blogs/posts` (Public list)
  - **Issue:** 404/Mismatch. Backend doesn't have a project-scoped public blog list endpoint.

#### Undefined Endpoints
- `/blogs/slug/:projectId/:slug` (in `src/app/api/blogs/[slug]/route.ts`)
- `/order/check` (in `src/app/api/order/check/route.ts`)

## Verification Status
- [x] Backend surface extracted from `router.go`
- [x] Nuxt API routes scanned
- [x] Next.js API routes scanned
- [x] Cross-referenced all identified calls
