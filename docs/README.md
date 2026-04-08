# PlayCMS Backend v3 Documentation

## Overview

The PlayCMS backend is a Go REST API built with Gin framework, using GORM for database operations and Redis for background job processing.

## Tech Stack

- **Language**: Go 1.26+
- **Framework**: Gin
- **ORM**: GORM
- **Database**: PostgreSQL
- **Queue**: Redis + Asynq

## Architecture

```
Request → Router → Middleware → Handler → Service → Repository → Database
```

### Module Structure

Each module follows the repository pattern:

```
internal/modules/{module}/
├── handler.go    # HTTP request handlers
├── service.go    # Business logic
├── repository.go # Data access
├── dto.go        # Request/Response types
└── model.go      # Module-specific models
```

## Middleware Stack

1. `gin.Recovery()` - Panic recovery
2. `gin.Logger()` - Request logging
3. `logger.RequestLogger()` - Custom logging
4. `logger.ErrorLogger()` - Error logging
5. `middleware.SecurityHeaders()` - Security headers
6. `middleware.CORS()` - CORS handling
7. `middleware.RateLimiter()` - Rate limiting
8. `middleware.ErrorHandler()` - Error handling
9. `middleware.Monitoring()` - Monitoring
10. `middleware.BodyLimit()` - Body size limit
11. `middleware.Authorized()` - JWT validation

## Security

- JWT tokens in httpOnly cookies
- Rate limiting (100 req/60s per IP)
- Domain-based CORS validation
- Admin-only routes with `middleware.AdminOnly()`

## Configuration

Environment variables (see `.env`):
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `REDIS_HOST`, `REDIS_PORT`
- `JWT_SECRET`
- `ALLOWED_DOMAINS` (comma-separated)
- `PORT` (default: 8800)

## Quick Start

```bash
# Install dependencies
go mod download

# Run with hot reload
air

# Or run directly
go run main.go
```

## Modules

| Module | Description |
|--------|-------------|
| Auth | Login, register, token refresh, sessions |
| User | User CRUD operations |
| Project | Multi-tenant project management |
| Product | Product & variant management |
| Order | Order processing |
| Cart | Shopping cart |
| Discount | Discount code management |
| Payment | Payment processing |
| Page | CMS page management |
| Media | File upload & management |
| Blog | Blog posts & comments |
| Mail | Email sending |

## Database

Uses GORM with automatic migrations. The database schema maintains v2 compatibility.

## Testing

```bash
go test ./...
```

## API Version

Current version: **v3**
Base path: `/api/v3`