# Roadmap: PlayCMS v2 Evolution

## Phases
- [ ] **Phase 1: Stability & Migration** - Resolve v3 migration bugs and ensure API consistency
- [ ] **Phase 2: Core Schema Engine** - Build the foundation for dynamic content types
- [ ] **Phase 3: Blog Core & Lifecycle** - Enable blog post management and organization
- [ ] **Phase 4: Admin Experience (Editor & UI)** - Provide a modern block-based editing experience and improved Admin UX
- [ ] **Phase 5: Public Delivery & SEO** - Deliver blog content to users with high performance and search visibility
- [ ] **Phase 6: Advanced CMS Evolution** - Implement enterprise-grade CMS features (RBAC, i18n, Audit)
- [ ] **Phase 7: Performance & UX Polish** - Maximize system efficiency and user engagement

## Phase Details

**Plans**: 5 plans
Plans:
- [ ] 01-01-PLAN.md — Audit & Discrepancy Report
- [ ] 01-02-PLAN.md — Strict Response Wrapper
- [ ] 01-03-PLAN.md — API Integration Tests (TDD)
- [ ] 01-04-PLAN.md — Nuxt Frontend Migration
- [ ] 01-05-PLAN.md — Next.js Frontend Migration

### Phase 2: Core Schema Engine
**Goal**: Build the foundation for dynamic content types
**Depends on**: Phase 1
**Requirements**: CORE-01, CORE-02, CORE-03, CORE-04
**Success Criteria** (what must be TRUE):
  1. Admin can define a new `ContentModel` with specific fields via API
  2. Content entries for dynamic models are stored and retrieved as JSONB in PostgreSQL
  3. System rejects content entries that violate the defined `ContentModel` schema validation
  4. New modules can be registered and discovered via the Modular Registry pattern in Go
**Plans**: 5 plans
Plans:
- [x] 02-01-PLAN.md — Modular Registry (TDD)
- [x] 02-02-PLAN.md — Core Models & Repository
- [x] 02-03-PLAN.md — Schema Validator (TDD)
- [x] 02-04-PLAN.md — Services & Versioning
- [ ] 02-05-PLAN.md — API, Wiring & Verification

**Plans**: 6 plans
Plans:
- [ ] 03-01-PLAN.md — Blog Model Foundation
- [ ] 03-02-PLAN.md — Post Lifecycle & Scheduling
- [ ] 03-03-PLAN.md — Hierarchy & Organization
- [ ] 03-04-PLAN.md — Search & Recommendations
- [ ] 03-05-PLAN.md — Commenting System
- [ ] 03-06-PLAN.md — Public Utility (Sitemap)

### Phase 4: Admin Experience (Editor & UI)
**Goal**: Provide a modern block-based editing experience and improved Admin UX
**Depends on**: Phase 3
**Requirements**: BLOG-01, EVOL-01
**Success Criteria** (what must be TRUE):
  1. User can create structured content using the block-based rich text editor (Tiptap)
  2. Editor output is stored as clean, structured JSON in the database
  3. Admin Dashboard navigation and layouts are updated for improved administrative efficiency
**Plans**: TBD
**UI hint**: yes

### Phase 5: Public Delivery & SEO
**Goal**: Deliver blog content to users with high performance and search visibility
**Depends on**: Phase 4
**Requirements**: BLOG-07, BLOG-09, BLOG-10, INFRA-01, INFRA-02, INFRA-03, INFRA-04
**Success Criteria** (what must be TRUE):
  1. Client app renders blog archives and calendar views correctly
  2. Posts include dynamic SEO meta-tags and structured JSON-LD for search engines
  3. Social sharing generates correct OpenGraph and Twitter cards
  4. Slug changes trigger automatic 301 redirects to prevent 404 errors and SEO loss
  5. Media assets are served optimized from S3 integration
  6. Client App fetches data via a dedicated, read-only Delivery API
**Plans**: TBD
**UI hint**: yes

### Phase 6: Advanced CMS Evolution
**Goal**: Implement enterprise-grade CMS features (RBAC, i18n, Audit)
**Depends on**: Phase 5
**Requirements**: EVOL-05, EVOL-06, EVOL-07, EVOL-08, EVOL-09
**Success Criteria** (what must be TRUE):
  1. Admin users have restricted access to features based on granular roles (RBAC)
  2. Every content and configuration change is recorded in a system-wide audit log
  3. Content and UI are available in multiple languages (i18n)
  4. Custom functionality can be added via the plugin architecture and Modular Registry
  5. Dynamic fields can be added to existing content types without database migrations
**Plans**: TBD
**UI hint**: yes

### Phase 7: Performance & UX Polish
**Goal**: Maximize system efficiency and user engagement
**Depends on**: Phase 6
**Requirements**: EVOL-02, EVOL-03, EVOL-04
**Success Criteria** (what must be TRUE):
  1. Client App demonstrates improved Core Web Vitals (LCP, CLS)
  2. Client App UI is optimized for higher user conversion and engagement
  3. API response times are significantly reduced via GORM optimization and Redis caching
**Plans**: TBD
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Stability & Migration | 0/0 | Not started | - |
| 2. Core Schema Engine | 0/0 | Not started | - |
| 3. Blog Core & Lifecycle | 0/0 | Not started | - |
| 4. Admin Experience | 0/0 | Not started | - |
| 5. Public Delivery & SEO | 0/0 | Not started | - |
| 6. Advanced CMS Evolution | 0/0 | Not started | - |
| 7. Performance & UX Polish | 0/0 | Not started | - |
