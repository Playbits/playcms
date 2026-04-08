# Project Research Summary

**Project:** PlayCMS v2 Evolution (Blog & CMS)
**Domain:** Headless CMS / Blogging System
**Researched:** 2026-04-08
**Confidence:** HIGH

## Executive Summary

PlayCMS v2 is evolving into a modern, high-end headless CMS and blog system. Experts build these using a "Flexible Schema" architecture (similar to Strapi or Sanity), moving away from static database tables to dynamic content models. The recommended approach is a hybrid storage model utilizing PostgreSQL JSONB for extensible content and a headless API for high-performance delivery via Next.js 16.

The primary risks include SEO leakage due to slug changes and the "JSONB Trap" where a lack of strict field definitions leads to data rot and performance degradation. These will be mitigated by implementing a dedicated Redirects Manager and a hybrid schema with validated field definitions.

## Key Findings

### Recommended Stack

The stack focuses on flexibility for the admin and performance for the client, centering around a headless approach to content management.

**Core technologies:**
- **Tiptap v2.x**: Rich Text Editor — provides headless, framework-agnostic structured JSON output.
- **PostgreSQL 16+ (JSONB)**: Database — enables dynamic schemas and flexible content storage without constant migrations.
- **Next.js 16 Metadata API**: SEO Management — native, high-performance handling of dynamic blog SEO.
- **JSON-LD**: Structured Data — ensures search engine visibility for articles and blog posts.

### Expected Features

**Must have (table stakes):**
- **Block-based Rich Text Editor** — modern flexible layouts are essential.
- **Post Lifecycle Management** — Draft, Schedule, and Publish workflows.
- **Advanced SEO Toolkit** — per-post meta-tags and automatic sitemaps.
- **Centralized Media Library** — organized asset management with optimization.

**Should have (competitive):**
- **Structured Content Modeling** — define custom content types beyond simple posts.
- **Native Newsletter Engine** — conversion and subscriber management.
- **Membership & Paywalls** — content monetization via tiered access.

**Defer (v2+):**
- **Collaborative Editing** — high complexity with lower immediate ROI.
- **Paywalls** — requires extensive payment and legal integration.

### Architecture Approach

The architecture shifts from static schemas to a **Flexible Schema** model. This allows the CMS to support arbitrary content structures via a central `ContentModel` definition.

**Major components:**
1. **Schema Engine** — Manages dynamic content models and validates `ContentEntry` data.
2. **Blog Module** — Implements domain-specific logic for posts, slugs, and SEO.
3. **Block Editor** — Nuxt-based UI for creating structured JSON content.
4. **Delivery API** — Optimized, cached read-only endpoints for the Next.js client.

### Critical Pitfalls

1. **Slug Fragility** — Avoid 404s on title changes by implementing a `slug_history` table and automatic 301 redirects.
2. **The JSONB Trap** — Avoid data rot by using a Hybrid Schema (Typed Core + Validated JSONB) instead of pure schema-less storage.
3. **N+1 Query Explosion** — Prevent API degradation by mandating GORM `.Preload()` for all associations in the service layer.
4. **Hydration Double-Fetch** — Use Nuxt `useFetch` and Next.js Server Components to ensure data is transferred from server to client without redundant requests.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Core Schema Engine
**Rationale:** The foundation for all extensible content must exist before the Blog module can be built upon it.
**Delivers:** `ContentModel` and `ContentEntry` system.
**Addresses:** Structured Content Modeling.
**Avoids:** Schema-less Chaos.

### Phase 2: Blog Domain & Lifecycle
**Rationale:** Implements the primary use case (Blogging) using the core engine.
**Delivers:** Post creation, status management (Draft/Published), and basic SEO logic.
**Addresses:** Post Lifecycle Management.
**Avoids:** Slug Fragility.

### Phase 3: Admin Block Editor
**Rationale:** Provides the necessary UX for managing the structured content defined in previous phases.
**Delivers:** Tiptap-powered editor integrated into the Nuxt 4 Admin dashboard.
**Addresses:** Block-based Rich Text Editor.
**Avoids:** Reactivity Overload in Admin.

### Phase 4: Delivery API & Client Renderer
**Rationale:** Exposes the content to the public and defines how blocks map to UI.
**Delivers:** Optimized API endpoints and Next.js block-mapping components.
**Addresses:** High-Performance Delivery.
**Avoids:** N+1 Queries & Hydration Double-Fetch.

### Phase 5: Optimization & Growth
**Rationale:** Final polish for production readiness and search engine dominance.
**Delivers:** Redis caching, automatic sitemaps, and image optimization.
**Addresses:** Advanced SEO Toolkit, Centralized Media Library.
**Avoids:** Unoptimized Image Delivery.

### Phase Ordering Rationale

- **Dependency First:** Schema Engine $\rightarrow$ Blog Module $\rightarrow$ Admin Editor $\rightarrow$ Client Renderer.
- **Risk Mitigation:** Addressing slug fragility and JSONB validation early in the core logic prevents costly migrations later.
- **Performance Focus:** Delivery and Optimization are placed last to ensure the API is stable before adding caching layers.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 1:** Designing the custom field validation logic for the Schema Engine.
- **Phase 4:** Designing the flexible Block-to-UI mapping architecture in Next.js.

Phases with standard patterns (skip research-phase):
- **Phase 2:** Post lifecycle and state management are well-documented.
- **Phase 3:** Tiptap integration follows established patterns.
- **Phase 5:** Redis caching and sitemap generation are standard.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Verified with official Tiptap, Next.js, and PostgreSQL docs. |
| Features | HIGH | Synthesis of top-tier CMS products (Strapi, Sanity, Ghost). |
| Architecture | HIGH | Based on SOTA Headless CMS patterns. |
| Pitfalls | HIGH | Common industry failure modes identified. |

**Overall confidence:** HIGH

### Gaps to Address

- **Plugin Architecture:** The detailed Go implementation of the "Modular Registry" for plugins needs a concrete design.
- **Monetization:** Membership and Paywall specifics were deferred but will require dedicated research if moved into MVP.

## Sources

### Primary (HIGH confidence)
- /ueberdosis/tiptap-docs — Rich text editor and JSON structure.
- /vercel/next.js — Metadata API, ISR, and Server Components.
- /postgresql/docs — JSONB and GIN index performance.

### Secondary (MEDIUM confidence)
- Strapi/Sanity Documentation — Dynamic zones and component-based modeling.
- Google Search Central — Redirects and Core Web Vitals.

---
*Research completed: 2026-04-08*
*Ready for roadmap: yes*
