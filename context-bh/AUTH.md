# PlayCMS Authentication System

> Documented: April 2026
> Go Version: 1.26

## Overview

The PlayCMS authentication system uses **JWT-based access tokens** with **Redis-backed refresh tokens** and **httpOnly cookies** for secure token storage across both frontends (Admin Nuxt and Client Next.js).

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                CLIENTS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  Admin Frontend (Nuxt)     │  Client App (Next.js)                       │
│  - useAuth composable     │  - useAuth hook                             │
│  - $fetch API             │  - NextAuth.js                              │
│  - httpOnly cookies       │  - httpOnly cookies                         │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         PROXY / API GATEWAY                              │
│  /api/auth/login    → backend/api/v3/auth/login                         │
│  /api/auth/refresh → backend/api/v3/auth/refresh                       │
│  /api/auth/logout  → backend/api/v3/auth/logout                         │
│  /api/auth/me      → backend/api/v3/auth/me                             │
│  /api/auth/sessions → backend/api/v3/auth/sessions                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                              BACKEND                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  Access Token (JWT)                    │  Refresh Token (Redis)          │
│  - Stored in PostgreSQL                │  - Stored in Redis              │
│  - 7 days (normal) / 30 days (rememberMe) │  - 5-minute window           │
│  - Family-based rotation              │  - Family-based revocation      │
│  - Blacklist on logout                │  - Max 24h TTL                   │
└─────────────────────────────────────────────────────────────────────────┘
```

## Token Strategy

### Access Token

| Property | Value |
|----------|-------|
| Type | JWT (HS256) |
| Issuer | `playcms-v3` |
| Duration (normal) | 7 days |
| Duration (rememberMe) | 30 days |
| Storage | httpOnly cookie (`_g_access_token`) |
| Database | PostgreSQL (`access_token_records`) |

### Refresh Token

| Property | Value |
|----------|-------|
| Type | Opaque token |
| Duration | 5-minute window |
| Max TTL | 24 hours (Redis TTL) |
| Storage | httpOnly cookie (`_g_refresh_token`) |
| Database | Redis |
| Key Pattern | `refresh:{token_hash}`, `user_tokens:{user_id}` |

### Token Families

Tokens use family-based rotation for security:
- Every login creates a new `family_id`
- Refresh tokens belong to a family
- Logout revokes entire family (`revoked_family:{family_id}`)
- Token reuse detection blacklists entire family

## Cookie Structure

| Cookie | Prefix | httpOnly | JS Read | Purpose |
|--------|--------|----------|---------|---------|
| `_g_access_token` | ✓ | ✓ | ✗ | Access token (JWT) |
| `_g_refresh_token` | ✓ | ✓ | ✗ | Refresh token |
| `_g_remember` | ✓ | ✗ | ✓ | RememberMe preference |

### Cookie Options

```typescript
{
  path: '/',
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,  // except _g_remember
  prefix: '_g'
}
```

## API Endpoints (Backend)

### Auth Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/v3/auth/login` | POST | No | Login with username, password, rememberMe |
| `/api/v3/auth/register` | POST | No | User registration |
| `/api/v3/auth/refresh` | POST | No | Refresh access token |
| `/api/v3/auth/logout` | POST | Yes | Logout current session |
| `/api/v3/auth/logout/all` | POST | Yes | Logout all sessions |
| `/api/v3/auth/me` | GET | Yes | Get current user |
| `/api/v3/auth/sessions` | GET | Yes | List sessions (paginated) |
| `/api/v3/auth/sessions/:id` | DELETE | Yes | Revoke specific session |
| `/api/v3/auth/reset` | POST | No | Request password reset |
| `/api/v3/auth/reset/password` | POST | No | Change password with token |
| `/api/v3/auth/confirm` | GET | No | Confirm email address |
| `/api/v3/auth/resend` | POST | No | Resend verification token |

### Request/Response Examples

#### Login

```
POST /api/v3/auth/login
Body: { username, password, rememberMe }
Response: { user }
Cookies: _g_access_token, _g_refresh_token, _g_remember
```

#### Refresh

```
POST /api/v3/auth/refresh
Headers: X-Refresh-Token: <refresh_token>
Cookies: _g_refresh_token, _g_remember
Response: { access_token, access_token_expires_at }
```

#### Logout

```
POST /api/v3/auth/logout
Response: { success: true }
Side Effect: Clears all _g_ cookies, blacklists access token
```

#### Sessions

```
GET /api/v3/auth/sessions?page=1&limit=50
Response: { sessions: [], pagination: { page, limit, total } }

DELETE /api/v3/auth/sessions/:id
Response: { success: true }
```

### Admin Override

```
GET /api/v3/auth/sessions?admin=true&user_id=<target_user_id>
DELETE /api/v3/auth/sessions/:id?admin=true&user_id=<target_user_id>
```

## DTOs

### Request DTOs

```go
type LoginRequest struct {
    Username   string `json:"username" binding:"required"`
    Password   string `json:"password" binding:"required"`
    ProjectID  uint   `json:"project_id"`
    RememberMe bool   `json:"remember_me"`
}

type RegisterRequest struct {
    FirstName string `json:"first_name" binding:"required,min=1,max=100"`
    LastName  string `json:"last_name" binding:"required,min=1,max=100"`
    Username  string `json:"username" binding:"required,min=3,max=50"`
    Email     string `json:"email" binding:"required,email,max=255"`
    Phone     string `json:"phone"`
    Password  string `json:"password" binding:"required,min=8,max=128"`
    ProjectID uint   `json:"project_id"`
}

type RefreshRequest struct {
    RefreshToken string `json:"refresh_token"`
    RememberMe   bool   `json:"remember_me"`
}
```

### Response DTOs

```go
type TokenResponse struct {
    AccessToken        string `json:"access_token"`
    AccessTokenExpiry  string `json:"access_token_expires_at"`
    RefreshToken       string `json:"refresh_token"`
    RefreshTokenExpiry string `json:"refresh_token_expires_at"`
    TokenType          string `json:"token_type"`
}

type UserResponse struct {
    ID        uint   `json:"id"`
    FirstName string `json:"first_name"`
    LastName  string `json:"last_name"`
    Username  string `json:"username"`
    Email     string `json:"email"`
    Phone     string `json:"phone"`
    Role      string `json:"role"`
}

type SessionResponse struct {
    ID         uint   `json:"id"`
    DeviceInfo string `json:"device_info"`
    IPAddress  string `json:"ip_address"`
    UserAgent  string `json:"user_agent"`
    CreatedAt  string `json:"created_at"`
    LastUsedAt string `json:"last_used_at"`
}
```

## Environment Variables

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `ACCESS_TOKEN_TTL` | `168h` (7 days) | Normal access token duration |
| `ACCESS_TOKEN_LONG_TTL` | `720h` (30 days) | RememberMe access token duration |
| `REFRESH_TOKEN_TTL` | `5m` | Refresh token window |
| `REFRESH_TOKEN_MAX_TTL` | `24h` | Maximum refresh token TTL |
| `APP_SECRET` | - | JWT signing secret (required) |
| `REDIS_URL` | `localhost:6379` | Redis connection |

## Security Features

### Token Storage

- Access tokens stored in **httpOnly** cookies - inaccessible to JavaScript
- Prevents XSS token theft
- `SameSite=strict` prevents CSRF

### Token Rotation

- Refresh tokens rotated on each use
- Family-based revocation (all tokens in family invalidated on logout)
- 5-minute window prevents replay attacks

### Token Blacklist

- Blacklisted tokens stored in PostgreSQL
- JTI (JWT ID) used for identification
- Checked on every authorized request

### Error Handling

- Generic error messages in production
- No `err.Error()` exposed to clients
- Proper HTTP status codes
- Phone number removed from login responses

## Middleware

### Auth Middleware

```go
// Context keys
const (
    ContextUserKey   = "auth_user"      // *models.User
    ContextClaimsKey = "auth_claims"   // *services.AccessTokenClaims
    ContextJTIKey    = "auth_jti"      // string (JWT ID)
)

// Middleware functions
Authorized()      // Requires valid JWT
OptionalAuth()    // Parses if present, continues if invalid
AdminOnly()       // Requires admin role
```

## Frontend Implementation

### Admin Frontend (Nuxt)

```typescript
// composables/useAuth.ts
const { login, logout, refreshTokens, user, isAuthenticated } = useAuth();

// Login
await login({ username, password, rememberMe });

// Check auth
if (isAuthenticated.value) {
  console.log(user.value);
}

// Logout
await logout();
```

### Client App (Next.js)

```typescript
// hooks/useAuth.ts
const { login, logout, listSessions, revokeSession } = useAuth();

// Login via NextAuth
await login({ username, password, rememberMe });

// List sessions
const sessions = await listSessions();

// Revoke session
await revokeSession('123');
```

## Migration Notes

### Changes from Previous Version

1. **Go 1.26**: Updated from Go 1.25
2. **Redis Refresh Tokens**: Moved from PostgreSQL to Redis
3. **httpOnly Cookies**: Tokens now in httpOnly cookies (not localStorage)
4. **SameSite=Strict**: All auth cookies use strict same-site policy
5. **Prefix**: All cookies use `_g_` prefix
6. **RememberMe**: Stored in separate non-httpOnly cookie
7. **Token Families**: Family-based revocation for security
8. **Token Blacklist**: Blacklist check on every authorized request

### Breaking Changes

- Token endpoints no longer return tokens in response body
- Query string refresh tokens disabled
- Phone number removed from login/register responses

## Troubleshooting

### Token Refresh Fails

1. Check Redis connection
2. Verify `_g_remember` cookie is set
3. Check token hasn't exceeded 24-hour max TTL
4. Check if family has been revoked

### Session Not Found

1. Session may have expired (7-30 days)
2. Session may have been revoked
3. Check Redis for refresh token

### Admin Cannot View Other User Sessions

1. Verify user has ADMIN role
2. Include `?admin=true` query param
3. Check user_id parameter for specific user

### Token Reuse Detected

1. Token reuse blacklists entire family
2. User must re-login
3. Check for concurrent refresh requests (missing isRefreshing lock)
