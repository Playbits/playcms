# PlayCMS Project Analysis

This document provides a high-level architectural and technical analysis of the PlayCMS system, covering its three primary components: the **Frontend** (Admin Dashboard), the **Backend** (API & Workers), and the **PlayCMS Client App** (End-user application).

## 1. Frontend (`/frontend`) - Admin Dashboard

The `frontend` directory contains the admin dashboard for managing the CMS. It's built on a modern Vue/Nuxt stack focusing heavily on a rich component ecosystem.

**Core Technology Stack:**
*   **Framework:** Nuxt (v4) & Vue.js (v3)
*   **Language:** TypeScript
*   **State Management:** Pinia (with `@pinia/nuxt` integration). Components consume stores like `useProjectStore` directly for state and data-fetching.
*   **Styling & UI:** 
    *   **Tailwind CSS** (via `@tailwindcss/vite`) for utility classes.
    *   **PrimeVue** (v4) with PrimeFlex and PrimeIcons for robust UI components. The app is utilizing the **Aura** theme.
    *   **FormKit** (`@formkit/nuxt`) for form building and internal validation handling.
*   **Data Fetching & API (BFF Pattern):** 
    *   **Client Side:** Uses Nuxt's native `$fetch` to hit internal `/api/...` endpoints safely. 
    *   **Server Side / Backend-For-Frontend (BFF):** Nuxt routes (`/server/api`) use configured internal `_axios` (via `src/service/axios.ts`) strictly mapped to the underlying Go backend API (`NUXT_API_URL`) to securely ferry server-side only tokens.
*   **Other Key Libraries:** Zod, Day.js, Chart.js, Vue-Quill.

**Data Loading Pattern:**
- Pages should use `watch(() => project_loaded.value, ...)` with `{ immediate: true }` instead of `onMounted` to ensure data loads after project selection.
- Products, users, and other per-project data require `project_id` in API calls.

**Notable Components:**
- `src/components/PriorityInput.vue` - Number input with spinner buttons for product priority
- `composables/useDiscount.ts` - Discount code management with project filtering
- `stores/project.ts` - Project state management with cookie persistence

## 2. PlayCMS Client App (`/playcms_client_app`) - End-user Application

The `playcms_client_app` directory contains the consumer-facing application built with React/Next.js.

**Core Technology Stack:**
*   **Framework:** Next.js (React-based)
*   **Language:** TypeScript
*   **Authentication:** NextAuth.js (`next-auth`) for managing complex user sessions securely.
*   **State Management:** Redux Toolkit (`@reduxjs/toolkit`) and Redux Persist for persistent client-side state.
*   **Styling & UI:** 
    *   **Tailwind CSS** for layout and utility styling.
    *   **PrimeReact** (v10) for robust UI components.
    *   **HeadlessUI** for accessible interactive components.
    *   **Lucide React** & **React Icons** for scalable iconography.
*   **Forms & Validation:** React Hook Form (`react-hook-form`) combined with Zod (`@hookform/resolvers`) for strict client-side validation schemas.
*   **Integrations & Tooling:**
    *   **Payments:** React Paystack (`react-paystack`).
    *   **Maps:** Google Maps API (`@react-google-maps/api`).
    *   **Sliders:** Swiper for carousels and media galleries.
    *   **Dates:** Day.js.

## 3. Backend (`/backend`) - API & Workers

The `backend` directory contains the core API and background workers built with Go.

**Core Technology Stack:**
*   **Language:** Go
*   **Framework:** Gin HTTP router
*   **Data Layer:** GORM ORM
*   **Message Queue:** Redis (via Asynq) for background job processing
*   **Security:** 
    *   Domain validation via `ALLOWED_DOMAINS` env variable
    *   Middleware chain: CORS → DomainValidation → Authorized

**Key Features:**
*   Modular controller structure organized by domain (auth, blog, booking, content, discountCode, etc.)
*   Separate model definitions for data persistence
*   Worker system for asynchronous processing (email sending, file uploads, etc.)
*   Environment-based configuration
*   RESTful API design

**Middleware Chain:**
```
CORS → DomainValidation → Authorized
```

- **DomainValidation** checks `Origin` header against `ALLOWED_DOMAINS` (comma-separated)
- Returns 403 if origin not allowed

**Key Components:**
*   **Controllers:** Handle HTTP requests and business logic (in `src/controllers/`)
*   **Models:** Define data structures with project filtering (in `src/models/`)
*   **Middlewares:** Domain validation, auth, logging (in `src/middlewares/`)
*   **Workers:** Background processing jobs (in `workers/` directory)
*   **Routes:** API endpoint definitions (in `routes/` directory)
*   **Initialization:** Database connection and environment loading (in `inits/`)

**Notable Implementation Details:**
*   Uses Redis for worker queue management (visible in main.go)
*   Discount codes now include `project_id` for multi-project support
*   API responses return `[]` instead of errors when no data found
*   Modular approach with separate packages for different domains
*   Environment variable configuration loading
*   Structured approach to handling authentication, payments, media, etc.

## 4. Playbit Official Website (`/playbit_website`)

The `playbit_website` directory contains the official company website.

**Core Technology Stack:**
*   **Framework:** Next.js (v15)
*   **Language:** TypeScript
*   **Styling & UI:** 
    *   **Tailwind CSS** (v4)
    *   **Radix UI** for accessible primitives
    *   **Lucide React** for icons
*   **Forms & Validation:** React Hook Form combined with Zod
*   **Emails:** Resend and `@react-email/components` for transactional emails
*   **Testing:** Vitest with React Testing Library

## 5. Coastline Website (`/coastlinewebsite`)

The `coastlinewebsite` directory contains a static marketing website.

**Core Technology Stack:**
*   **Format:** Pure Static HTML/CSS/JavaScript
*   **Deployment:** Netlify (as indicated by `netlify.toml`)
*   **Structure:** Multi-page site with separate HTML files for different services (beach house, boat cruise, yacht charter).

## Summary Note

The architecture leverages modern, strongly-typed ecosystems (TypeScript in frontends, Go in the backend) with clear separation of concerns:
1. **Admin Dashboard** (Vue/Nuxt) for CMS management
2. **Consumer App** (React/Next.js) for end-user experience  
3. **Backend API** (Go) providing centralized services to both frontends
4. **Background Workers** (Redis-powered) handling asynchronous operations
5. **Company Website** (React/Next.js) for official presence
6. **Marketing Sites** (Static HTML) for specific business offerings

## Git Conventions

- **Branch strategy**: `main` (production), `dev` (development)
- **Commit style**: Descriptive lowercase messages (e.g., "remove local seeders", "fix bug and optimization")
- **PR workflow**: Squash merge from feature branches to dev/main

## Environment Variables

### Backend Key Variables
- `ALLOWED_DOMAINS` - Comma-separated allowed origins for CORS/domain validation
- `FRONTEND_URL` - Admin dashboard URL
- `DB_CONNECTION` - Database driver (pgsql/sqlite)
- `REDIS_HOST` / `REDIS_PORT` - Worker queue configuration

The frontend code is segmented between a Vue-based Admin portal and a React-based Client/Consumer App, both consuming the centralized Go API. Background workers powered by Redis ensure the main HTTP threads are never blocked by heavy operations like uploading to S3 or sending emails.