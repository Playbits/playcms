# Technology Stack

**Project:** PlayCMS v2 Evolution (Blog & CMS)
**Researched:** 2026-04-08

## Recommended Stack

### Core Framework (Editor & Content)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Tiptap** | v2.x | Rich Text Editor | Headless, framework-agnostic, and outputs structured JSON. Allows custom UI in Nuxt (Admin) and custom component rendering in Next.js (Client). |
| **ProseMirror** | v1.x | Editor Engine | Underlying engine for Tiptap; ensures a robust, schema-based document model for high-performance content. |
| **Next.js Metadata API** | v16.x | SEO Management | Native `generateMetadata` and `sitemap.ts` provide the highest performance and best DX for dynamic blog SEO. |

### Database (Extensibility)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **PostgreSQL JSONB** | 16+ | Dynamic Schemas | Enables "Dynamic Fields" and "Block Content" storage without requiring schema migrations for every new content type. |

### Infrastructure (SEO & Performance)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **JSON-LD** | Schema.org | Structured Data | Industry standard for search engines to identify `BlogPosting` and `Article` types, increasing rich snippet probability. |
| **Next/Image** | v16.x | Image Optimization | Critical for Blog LCP (Largest Contentful Paint) via automatic WebP/AVIF conversion and lazy loading. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@tiptap/starter-kit` | v2.x | Base Editor Features | Always; provides essential formatting (bold, italic, lists, etc.). |
| `@tiptap/extension-markdown` | v2.x | MD Support | Use for users who prefer Markdown input while maintaining JSON storage. |
| `lucide-vue-next` | Latest | Editor Icons | Use for the Admin editor toolbar to maintain a modern, lightweight aesthetic. |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Editor | Tiptap | Lexical | Lexical has a steeper learning curve and a more restrictive API for rapid custom extension development. |
| Editor | Tiptap | Editor.js | Editor.js is strictly block-based; Tiptap provides a better balance between "document feel" and "block structure". |
| SEO | Native Next.js | Third-party SEO Libs | Next.js 16's built-in Metadata API is now the gold standard; external libraries add unnecessary bundle size. |

## Installation

\`\`\`bash
# Admin Frontend (Nuxt)
yarn add @tiptap/vue-3 @tiptap/pm @tiptap/starter-kit

# Client App (Next.js)
yarn add @tiptap/pm # For parsing JSON content into React components
\`\`\`

## Sources

- **Tiptap Docs**: /ueberdosis/tiptap-docs (HIGH confidence)
- **Next.js Docs**: /vercel/next.js (HIGH confidence)
- **Schema.org**: Official structured data standards (HIGH confidence)
