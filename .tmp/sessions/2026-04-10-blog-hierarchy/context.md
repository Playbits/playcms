# Task Context: Blog Hierarchy & Organization Implementation

Session ID: 2026-04-10-blog-hierarchy
Created: 2026-04-10T00:00:00Z
Status: in_progress

## Current Request
Implement Plan 03: Hierarchy & Organization for the blog system, adding parent/child post relationships to support hierarchical content organization.

## Context Files (Standards to Follow)
- `.opencode/context/project-intelligence/technical-domain.md` - Technical stack, architecture patterns, and coding standards
- `.planning/phases/03-blog-core-lifecycle/03-03-PLAN.md` - Current plan with specific tasks for hierarchy implementation
- `.planning/codebase/ARCHITECTURE.md` - Modular layered architecture (Handler → Service → Repository)
- `.planning/codebase/STACK.md` - Technology stack and dependencies
- `.planning/phases/02-core-schema-engine/02-CONTEXT.md` - Core Schema Engine patterns

## Reference Files (Source Material to Look At)
- `backend/internal/modules/blog/service.go` - Existing blog service implementation
- `backend/internal/modules/blog/repository.go` - Existing blog repository with GORM queries
- `backend/internal/modules/blog/handler.go` - Existing blog API handlers
- `backend/internal/modules/blog/dto.go` - Existing blog data transfer objects
- `backend/internal/modules/blog/schema_adapter.go` - Schema service adapter for Core Schema Engine

## External Docs Fetched
None - using existing Go/PostgreSQL/Asynq stack

## Components
- Hierarchy Storage: parent_id JSONB field with GORM queries for parent/child relationships
- Hierarchical Retrieval Service: GetPostWithChildren, GetPostBreadcrumbs methods with cycle detection
- Hierarchy Management API: PATCH /parent and GET /children endpoints

## Constraints
- Follow modular layered architecture (Handler → Service → Repository)
- Use hybrid schema pattern (typed core + JSONB for flexible content)
- Implement strict response wrapper format
- Follow Go naming conventions (snake_case files, PascalCase structs/functions)
- Prevent circular references in hierarchy
- Add JSONB index for parent_id performance

## Exit Criteria
- [x] Parent/Child relationships are persisted and queryable in DB
- [x] Hierarchical data can be retrieved as breadcrumbs or child lists
- [x] Admin can organize posts into a hierarchy via API
- [x] Circular dependencies are rejected
- [x] Breadcrumbs can be generated for deep hierarchies

## Status
✅ **COMPLETED** - Plan 03: Hierarchy & Organization successfully implemented