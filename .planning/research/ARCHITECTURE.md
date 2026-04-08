# Architecture Patterns: CMS Evolution & Blog System

**Domain:** Headless CMS / Blogging System
**Researched:** 2026-04-08
**Confidence:** HIGH (based on SOTA Headless CMS patterns like Strapi and Sanity)

## Recommended Architecture

The evolution of PlayCMS v2 shifts from a "Static Schema" (fixed tables per domain) to a "Flexible Schema" (Dynamic Content Types) architecture. This allows the CMS to support arbitrary content structures without requiring database migrations for every new field.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| **Schema Engine** | Manages `ContentModel` definitions (fields, types, validation rules) and `ContentEntry` storage. | Database, Blog Module, Admin UI |
| **Blog Module** | Implements blog-specific logic (post lifecycle, slug management, categories, SEO, sitemaps). | Schema Engine, Repository, Client App |
| **Block Editor** | Admin UI component for creating structured, block-based content (instead of raw HTML). | Admin API, Schema Engine |
| **Delivery API** | Optimized read-only endpoints for the Client App, utilizing caching and projection. | Redis, Database, Client App |
| **Client Renderer** | Next.js components that map "Content Blocks" to specific UI views. | Delivery API |

### Data Flow

1. **Content Creation (Admin):**
   `Admin UI` $\rightarrow$ `Block Editor` $\rightarrow$ `Blog Service` $\rightarrow$ `Schema Engine` $\rightarrow$ `PostgreSQL (JSONB/Relational)` $\rightarrow$ `Redis (Invalidate Cache)`.
2. **Content Delivery (Client):**
   `Client App` $\rightarrow$ `Next.js ISR/Cache` $\rightarrow$ `Delivery API` $\rightarrow$ `Redis` $\rightarrow$ `PostgreSQL` $\rightarrow$ `JSON Response` $\rightarrow$ `Block-to-UI Mapping`.

## Patterns to Follow

### Pattern 1: Hybrid JSONB Storage
**What:** Store core metadata (ID, Slug, Status, Timestamps) in relational columns and flexible content (blocks, custom fields) in a PostgreSQL `JSONB` column.
**When:** When implementing "Extensible Content Types" (`EVOL-05`).
**Example:**
```sql
CREATE TABLE content_entries (
    id UUID PRIMARY KEY,
    model_id UUID REFERENCES content_models(id),
    slug TEXT UNIQUE,
    status TEXT, -- 'draft', 'published', 'scheduled'
    data JSONB, -- Stores blocks: [{type: 'text', value: '...'}, {type: 'image', src: '...'}]
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
CREATE INDEX idx_entries_data ON content_entries USING GIN (data);
```

### Pattern 2: Block-Based Content Modeling
**What:** Instead of a single `body` field containing HTML, store content as an array of "blocks" (e.g., `RichText`, `Image`, `Callout`, `CodeSnippet`).
**When:** Implementing the Blog system (`BLOG-01`).
**Example:**
```typescript
// Response from Delivery API
{
  "title": "My First Post",
  "content": [
    { "type": "paragraph", "data": { "text": "Hello world!" } },
    { "type": "image", "data": { "url": "...", "caption": "A cool image" } },
    { "type": "callout", "data": { "text": "Important Note!", "style": "warning" } }
  ]
}
```

### Pattern 3: Modular Registry (Go "Plugins")
**What:** A registry pattern where optional modules can register their own handlers, services, and hooks during application startup.
**When:** Implementing the Plugin Architecture (`EVOL-06`).
**Example:**
```go
type Plugin interface {
    Init(reg *Registry) error
    Name() string
}

type Registry struct {
    Handlers map[string]gin.HandlerFunc
    // ...
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: EAV (Entity-Attribute-Value)
**What:** Using a table with `(entity_id, attribute_name, value)` rows.
**Why bad:** Extremely poor performance for complex queries, loss of type safety, and expensive joins.
**Instead:** Use PostgreSQL `JSONB` with GIN indexing for flexible data.

### Anti-Pattern 2: Hard-coded Content Tables
**What:** Creating a new DB table every time a user wants a "New Content Type".
**Why bad:** Requires DDL changes (migrations) at runtime, which is risky and slow in production.
**Instead:** Use the `ContentModel` $\rightarrow$ `ContentEntry` pattern.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---------|--------------|--------------|-------------|
| **Read Latency** | Direct DB queries | Redis caching of JSON responses | Edge caching (Vercel/Cloudflare) + Global Redis |
| **Search** | PostgreSQL `ILIKE` | PostgreSQL Full-Text Search (tsvector) | Dedicated search engine (Meilisearch / Elasticsearch) |
| **Content Updates**| Immediate refresh | ISR (Incremental Static Regeneration) | Event-driven cache invalidation via Webhooks |

## Suggested Build Order

1. **Schema Engine (Core)**: Build the `ContentModel` and `ContentEntry` system first. This is the foundation for all extensible content.
2. **Blog Domain**: Implement the Blog module using the Schema Engine. Define "Post" as a content model.
3. **Admin Block Editor**: Build the UI to manage these structured blocks.
4. **Delivery API & Client Mapping**: Implement the API for the client and the Next.js components to render blocks.
5. **Optimization Layer**: Add Redis caching, SEO meta-tag automation, and Sitemaps.

## Sources

- **Strapi Documentation**: Architecture for dynamic zones and component-based modeling.
- **Sanity.io Documentation**: Content Lake (schema-less) patterns for structured content.
- **PostgreSQL Docs**: JSONB and GIN index performance characteristics.
