# Feature Landscape

**Domain:** Modern High-End Blogs & Evolved CMS
**Researched:** 2026-04-08

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Block-based Rich Text Editor | Modern publishing requires flexible layouts (images, quotes, embeds) beyond simple HTML | High | Integration of TipTap/Lexical recommended |
| Post Lifecycle Management | Ability to work in progress (Draft), schedule for future, and publish | Medium | Requires state machine in backend |
| Advanced SEO Toolkit | Meta titles/desc, canonicals, and auto-sitemaps are non-negotiable for organic growth | Medium | Should be per-post and global |
| Centralized Media Library | Manage assets across multiple posts with alt-text and optimization | Medium | Integration with S3/Cloudinary |
| Content Organization | Categories and Tags for discovery and navigation | Low | Standard relational mapping |
| High-Performance Delivery | Fast LCP/CLS, SSR/ISR for SEO and user experience | Medium | Leverages Next.js 16 capabilities |
| Full-Text Search | Ability to find content quickly across the entire blog | Medium | PostgreSQL pg_trgm or Meilisearch |
| Responsive Public UI | Flawless experience across all device sizes | Low | TailwindCSS 4 standard |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Structured Content Modeling | Define custom content types (e.g., "Case Study") with specific fields instead of just "Posts" | High | Core of "CMS Evolution" (EVOL-05) |
| Native Newsletter Engine | Convert readers to subscribers without third-party tools (e.g., Ghost) | High | Integration with Resend/Mailjet |
| Membership & Paywalls | Monetize content via tiered access and subscriptions | High | Requires payment gateway (Stripe) |
| Granular RBAC | Fine-grained permissions (Contributor vs Editor vs Admin) | Medium | Critical for team collaboration |
| Multi-language (i18n) | Reach global audiences with translated content and UI | Medium | Requires content versioning per locale |
| System-wide Audit Logs | Trace every change for security and recovery | Medium | Event-sourced or dedicated audit table |
| Dynamic Content Blocks | Insert "live" components (e.g., Product Slider) into the flow of a blog post | High | Requires "block" schema in the editor |
| Collaborative Editing | Real-time presence and concurrent editing | High | Requires WebSockets/Yjs/CRDTs |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Theme-Coupled Logic | Makes migration and headless delivery impossible | Use a strict Headless API approach |
| Plugin-Heavy Core | Leads to "plugin hell", security risks, and performance bloat | Build core features natively; use a structured Plugin API for extensions |
| Synchronous Heavy Tasks | Blocks the main thread, causing slow admin responses | Use Asynq/Redis for async processing (emails, image optimization) |
| Proprietary Lock-in Formats | Makes exporting content difficult for users | Use standard JSON/Markdown representations |

## Feature Dependencies

```
Structured Content Modeling → Dynamic Content Blocks (Blocks need a schema)
Membership → Paywalls (Paywalls need user tiers)
Membership → Newsletter Engine (Newsletter needs email lists)
Granular RBAC → Audit Logs (Logs need to track specific roles/users)
```

## MVP Recommendation

Prioritize:
1. **Block-based Editor** (Table Stakes - core UX)
2. **Lifecycle Management** (Table Stakes - workflow)
3. **SEO Toolkit** (Table Stakes - growth)
4. **Structured Content Modeling** (Differentiator - this is the "Evolution" part)
5. **Centralized Media Library** (Table Stakes - asset management)

Defer: 
- **Collaborative Editing**: High complexity, low immediate ROI for small teams.
- **Paywalls**: Requires payment integration and legal setup.
- **Native Newsletter Engine**: High complexity in delivery/compliance; can start with simple integrations.

## Sources

- Synthesis of modern CMS patterns (Ghost, Strapi, Sanity, Contentful)
- Industry standards for headless content delivery (2024-2026)
- Internal project context from .planning/PROJECT.md
