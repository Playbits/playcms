# Requirements

**Project:** PlayCMS v2 Evolution
**Last Updated:** 2026-04-08

## v1 Requirements

### Stability & Migration (STAB)
- [ ] **STAB-01**: Resolve broken frontend endpoints resulting from v3 backend migration
- [ ] **STAB-02**: Audit all v2 -> v3 API transitions for consistency

### Core Schema Engine (CORE)
- [ ] **CORE-01**: Implement `ContentModel` definition system for dynamic content types
- [ ] **CORE-02**: Implement `ContentEntry` storage using PostgreSQL JSONB for flexible fields
- [ ] **CORE-03**: Implement hybrid schema validation (Typed Core Fields + Validated JSONB)
- [x] **CORE-04**: Implement a Modular Registry pattern in Go for optional module registration

### Blog System (BLOG)
- [ ] **BLOG-01**: Block-based Rich Text Editor using Tiptap v2 (JSON output)
- [ ] **BLOG-02**: Post lifecycle management (Draft, Scheduled, Published)
- [ ] **BLOG-03**: Content organization via Categories and Tags
- [ ] **BLOG-04**: Hierarchical post structure (Parent/Child posts)
- [ ] **BLOG-05**: Full-text search for blog content using PostgreSQL pg_trgm
- [ ] **BLOG-06**: "Related Posts" recommendation engine based on tags/categories
- [ ] **BLOG-07**: Blog archive and calendar views in Client App
- [ ] **BLOG-08**: Native commenting system with admin moderation
- [ ] **BLOG-09**: Social media sharing integration (OpenGraph/Twitter Cards)
- [ ] **BLOG-10**: Dynamic SEO meta-tags (titles, descriptions) per post via Next.js Metadata API
- [ ] **BLOG-11**: Automatic XML sitemap generation for blog content

### CMS Evolution (EVOL)
- [ ] **EVOL-01**: UI/UX overhaul of Admin Dashboard for improved efficiency (Nuxt 4 / PrimeVue)
- [ ] **EVOL-02**: UI/UX overhaul of Client App for better conversion/engagement (Next.js 16 / PrimeReact)
- [ ] **EVOL-03**: API performance optimization (GORM Preload, Redis caching)
- [ ] **EVOL-04**: Frontend performance optimization (LCP, CLS, Server Components)
- [ ] **EVOL-05**: Extensible content type system (Dynamic fields/schemas)
- [ ] **EVOL-06**: Plugin architecture for adding custom CMS functionality via Modular Registry
- [ ] **EVOL-07**: Granular Role-Based Access Control (RBAC) for Admin users
- [ ] **EVOL-08**: System-wide audit logs for content and configuration changes
- [ ] **EVOL-09**: Multi-language support (i18n) for content and UI

### Infrastructure & SEO (INFRA)
- [ ] **INFRA-01**: Implement `slug_history` table and automatic 301 redirects to prevent SEO loss
- [ ] **INFRA-02**: Implement JSON-LD structured data for `BlogPosting`
- [ ] **INFRA-03**: Centralized Media Library with S3 integration and image optimization
- [ ] **INFRA-04**: Implement a Delivery API (read-only, cached) for the Client App

## v2 Requirements (Deferred)

### Growth & Monetization
- [ ] **GROW-01**: Native Newsletter Engine (subscriber management, email delivery via Resend)
- [ ] **GROW-02**: Membership & Paywalls (tiered access, Stripe integration)
- [ ] **GROW-03**: Collaborative Editing (real-time presence via Yjs/WebSockets)

## Out of Scope

- [ ] **MOBILE-01**: Native Mobile Apps (iOS/Android) — Focus is on responsive web
- [ ] **MIGRATE-01**: Third-party CMS migrations (e.g., WordPress import)
- [ ] **CORE-S**: Pure schema-less storage (Avoided to prevent "JSONB Trap")
- [ ] **UI-C**: Theme-coupled logic (Strict Headless API approach)

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| STAB-01 | Phase 1 | Pending |
| STAB-02 | Phase 1 | Pending |
| CORE-01 | Phase 2 | Pending |
| CORE-02 | Phase 2 | Pending |
| CORE-03 | Phase 2 | Pending |
| CORE-04 | Phase 2 | Complete |
| BLOG-01 | Phase 4 | Pending |
| BLOG-02 | Phase 3 | Pending |
| BLOG-03 | Phase 3 | Pending |
| BLOG-04 | Phase 3 | Pending |
| BLOG-05 | Phase 3 | Pending |
| BLOG-06 | Phase 3 | Pending |
| BLOG-07 | Phase 5 | Pending |
| BLOG-08 | Phase 3 | Pending |
| BLOG-09 | Phase 5 | Pending |
| BLOG-10 | Phase 5 | Pending |
| BLOG-11 | Phase 3 | Pending |
| EVOL-01 | Phase 4 | Pending |
| EVOL-02 | Phase 7 | Pending |
| EVOL-03 | Phase 7 | Pending |
| EVOL-04 | Phase 7 | Pending |
| EVOL-05 | Phase 6 | Pending |
| EVOL-06 | Phase 6 | Pending |
| EVOL-07 | Phase 6 | Pending |
| EVOL-08 | Phase 6 | Pending |
| EVOL-09 | Phase 6 | Pending |
| INFRA-01 | Phase 5 | Pending |
| INFRA-02 | Phase 5 | Pending |
| INFRA-03 | Phase 5 | Pending |
| INFRA-04 | Phase 5 | Pending |

