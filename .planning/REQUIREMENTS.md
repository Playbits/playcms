# Requirements

**Project:** PlayCMS v2 Evolution
**Last Updated:** 2026-04-24
**Current Milestone:** v3.2 - Public Delivery & SEO

---

## v1 Requirements - Completed

### Phase 4: Admin Experience (SHIPPED v3.1)
- [x] **BLOG-01**: Block-based Rich Text Editor using Tiptap v2 (JSON output)
- [x] **EVOL-01**: UI/UX overhaul of Admin Dashboard (Nuxt 4 / PrimeVue)
- [x] **BLOG-03**: Content organization via Categories and Tags
- [x] **BLOG-06**: "Related Posts" recommendation engine

### Phase 1-3: Blog Core & Lifecycle (SHIPPED v3.0)
- [x] **CORE-04**: Modular Registry pattern
- [x] **STAB-01**: Resolve broken frontend endpoints
- [x] **STAB-02**: Audit API transitions
- [x] **CORE-01**: ContentModel definition system
- [x] **CORE-02**: ContentEntry storage with JSONB
- [x] **CORE-03**: Hybrid schema validation
- [x] **BLOG-02**: Post lifecycle (Draft/Scheduled/Published)
- [x] **BLOG-04**: Hierarchical post structure
- [x] **BLOG-05**: Full-text search with pg_trgm
- [x] **BLOG-08**: Native commenting system
- [x] **BLOG-11**: XML sitemap generation

---

## v1 Requirements - Active (Next: v3.2)

### Phase 5: Public Delivery & SEO
- [ ] **BLOG-07**: Archive and calendar views
- [ ] **BLOG-09**: Social sharing
- [ ] **BLOG-10**: Dynamic SEO meta-tags
- [ ] **INFRA-01**: slug_history + 301 redirects
- [ ] **INFRA-02**: JSON-LD structured data
- [ ] **INFRA-03**: Media Library with S3
- [ ] **INFRA-04**: Delivery API

---

## v1 Requirements - Not Started

### CMS Evolution (EVOL)
- [ ] **EVOL-02**: Client App UI overhaul (Next.js 16 / PrimeReact)
- [ ] **EVOL-03**: API performance optimization
- [ ] **EVOL-04**: Frontend performance optimization
- [ ] **EVOL-05**: Extensible content type system
- [ ] **EVOL-06**: Plugin architecture
- [ ] **EVOL-07**: RBAC
- [ ] **EVOL-08**: Audit logs
- [ ] **EVOL-09**: i18n

### Infrastructure (INFRA)
- [ ] **INFRA-01**: slug_history + 301 redirects
- [ ] **INFRA-02**: JSON-LD structured data
- [ ] **INFRA-03**: Media Library with S3
- [ ] **INFRA-04**: Delivery API

---

## v2 Requirements (Deferred)

- [ ] **GROW-01**: Newsletter Engine
- [ ] **GROW-02**: Membership & Paywalls
- [ ] **GROW-03**: Collaborative Editing

---

## Out of Scope

- Native Mobile Apps
- Third-party CMS migrations
- Pure schema-less storage
- Theme-coupled logic

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| BLOG-01 | 4 | ✅ Complete |
| EVOL-01 | 4 | ✅ Complete |
| BLOG-03 | 4 | ✅ Complete |
| BLOG-06 | 4 | ✅ Complete |
| BLOG-07 | 5 | Pending |
| BLOG-09 | 5 | Pending |
| BLOG-10 | 5 | Pending |
| INFRA-01 | 5 | Pending |
| INFRA-02 | 5 | Pending |
| INFRA-03 | 5 | Pending |
| INFRA-04 | 5 | Pending |
| EVOL-02 | 7 | Pending |
| EVOL-05 | 6 | Pending |
| EVOL-07 | 6 | Pending |
