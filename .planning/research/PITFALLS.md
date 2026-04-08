# Domain Pitfalls: CMS Evolution & Blog

**Domain:** Modular Content Management Systems (CMS) & Blog Architectures
**Researched:** 2026-04-08

## Critical Pitfalls

Mistakes that cause architectural rewrites or catastrophic SEO loss.

### Pitfall 1: Slug Fragility & SEO Leakage
**What goes wrong:** Changing a post title or URL slug results in a 404 for all existing backlinks, social shares, and search engine indexes.
**Why it happens:** Slugs are treated as mutable attributes of the content rather than immutable identifiers.
**Consequences:** Immediate drop in organic search rankings; broken user experience from external links.
**Prevention:** 
- Treat slugs as "once-set" or implement a `slug_history` table.
- Automatically create a 301 redirect when a slug is updated.
- Implement a dedicated Redirects Manager in the Admin Dashboard.
**Detection:** High volume of 404 errors in server logs corresponding to previously existing content.
**Phase Mapping:** Blog System (BLOG-10, BLOG-11)

### Pitfall 2: The "Schema-less" JSONB Trap
**What goes wrong:** Using JSONB for all "extensible" fields leads to data inconsistency and unmanageable query complexity.
**Why it happens:** Desire for total flexibility without defining a strict schema for custom fields.
**Consequences:** Poor query performance (even with GIN indexes) as the dataset grows; "data rot" where different posts have different versions of the same attribute.
**Prevention:** 
- Use a **Hybrid Schema**: Core fields (title, date, author) in typed columns; truly dynamic metadata in JSONB.
- Implement a "Field Definition" system in the Admin that validates JSONB keys/types.
**Detection:** Queries requiring complex `JSONQuery` chains that become slow or return inconsistent results.
**Phase Mapping:** CMS Evolution (EVOL-05)

### Pitfall 3: N+1 Query Explosion
**What goes wrong:** API response times degrade linearly as the number of blog posts increases (e.g., fetching 20 posts results in 21+ queries).
**Why it happens:** Lazy loading associations (Categories, Tags, Authors) within a loop in the Go service layer.
**Consequences:** Database CPU spikes; slow TTFB (Time to First Byte) for the client app.
**Prevention:** 
- Strictly use `.Preload()` in GORM for all known associations in list endpoints.
- Use a query analyzer or middleware to detect and flag N+1 patterns in dev.
**Detection:** Database logs showing dozens of similar `SELECT * FROM tags WHERE id = ...` queries for a single request.
**Phase Mapping:** API Performance Optimization (EVOL-03)

## Moderate Pitfalls

### Pitfall 1: Hydration Double-Fetch (Nuxt/Next)
**What goes wrong:** The page fetches data on the server, and then the client fetches the exact same data again during hydration.
**Why it happens:** Using raw `$fetch` or `axios` in `setup` (Nuxt) or failing to use Server Components correctly (Next).
**Prevention:** 
- In Nuxt: Use `useFetch` or `useAsyncData` to ensure the state is transferred from server to client.
- In Next: Use Server Components for data fetching and pass data as props to Client Components.
**Detection:** Browser Network tab showing duplicate API requests for the same resource on page load.
**Phase Mapping:** Frontend Performance Optimization (EVOL-04)

### Pitfall 2: Reactivity Overload in Admin
**What goes wrong:** The Admin Dashboard becomes sluggish when managing large lists of content or complex forms.
**Why it happens:** Using deep reactivity (e.g., standard Pinia state) for large arrays of complex content objects.
**Prevention:** 
- Use `shallowRef` or `markRaw` in Vue/Nuxt for large data sets that don't require deep property tracking.
- Implement virtual scrolling for content lists.
**Detection:** Input lag in the Admin UI or high CPU usage in the browser during list filtering.
**Phase Mapping:** Admin UI/UX Overhaul (EVOL-01)

## Minor Pitfalls

### Pitfall 1: Content Versioning Void
**What goes wrong:** An admin accidentally deletes a large section of a post or makes a mistake, and there is no way to revert.
**Prevention:** Implement a simple `content_versions` table or a "Drafts" system that saves snapshots.
**Phase Mapping:** Blog System (BLOG-02)

### Pitfall 2: Unoptimized Image Delivery
**What goes wrong:** High-res images uploaded via Admin kill the LCP (Largest Contentful Paint) on the Client App.
**Prevention:** Use an image proxy (like Cloudinary or a custom Go service) to serve WebP/Avif and responsive sizes.
**Phase Mapping:** Client App Performance (EVOL-04)

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Blog System | Slug Fragility | Implement automatic 301 redirects for slug changes. |
| CMS Evolution | Schema-less Chaos | Define a hybrid schema with typed core fields and validated JSONB. |
| API Optimization | N+1 Queries | Mandate `Preload` for all associations in the Service layer. |
| Frontend Optimization | Hydration Bloat | Maximize Server Component usage; minimize `'use client'` boundaries. |

## Sources

- Context7: Next.js Documentation (ISR, Server Components, Metadata)
- Context7: Nuxt 4 Documentation (useFetch, shallowRef, Hydration)
- Context7: GORM Documentation (Preload, JSONB/datatypes)
- Industry Best Practices: Google Search Central (Redirects, Core Web Vitals)
