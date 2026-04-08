<!-- Context: project-intelligence/navigation | Priority: high | Version: 1.0 | Updated: 2026-04-08 -->

# Project Intelligence Navigation

**Purpose**: Quick overview of project context files.
**Last Updated**: 2026-04-08

## Quick Routes

| File | Description | Priority |
|------|-------------|----------|
| technical-domain.md | Tech stack & patterns | critical |

## Quick Reference

### Tech Stack
- **Backend**: Go 1.23+, Gin, GORM, Redis/Asynq
- **Admin**: Nuxt 4, Vue 3, PrimeVue, Pinia, TailwindCSS 4
- **Client**: Next.js 16, React 19, PrimeReact, Redux Toolkit, TailwindCSS 4

### Key Commands
```bash
# Backend
cd backend && go run main.go           # Port 8800

# Admin Frontend
cd frontend && yarn dev                # Port 8000

# Client App
cd playcms_client_app && yarn dev      # Port 3000
```

### Entry Points
- Backend: `backend/main.go` → `backend/routes/router.go`
- Admin: `frontend/nuxt.config.ts`
- Client: `playcms_client_app/next.config.ts`

## Deep Dives

| File | Description |
|------|-------------|
| backend/CLAUDE.md | Backend-specific patterns |
| frontend/CLAUDE.md | Admin frontend patterns |
| CLAUDE.md | Root project overview |

## Update Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-08 | Initial creation |
