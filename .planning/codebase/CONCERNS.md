# Codebase Concerns

**Analysis Date:** 2026-04-08

## Tech Debt

**Authentication Performance:**
- Issue: The `Authorized` middleware performs multiple database calls on every single request. It first calls `ValidateAccessToken` (which checks the `BlacklistedToken` table in the DB) and then calls `sessionService.GetUser` (another DB fetch).
- Files: `backend/internal/middleware/auth.go`, `backend/internal/services/token_service.go`
- Impact: Significant latency increase and database load as the number of requests grows.
- Fix approach: Cache the blacklist and user session data in Redis with a short TTL to reduce DB pressure.

**Go Version Inconsistency:**
- Issue: `go.mod` specifies `go 1.26.0`, which is not a currently released stable version of Go.
- Files: `backend/go.mod`
- Impact: Potential build instability or confusion during CI/CD and developer onboarding.
- Fix approach: Correct the version to a stable release (e.g., 1.23 or 1.24).

**Hardcoded Abilities:**
- Issue: User abilities are hardcoded as `{"web", "shop"}` during token generation.
- Files: `backend/internal/services/token_service.go`
- Impact: Lack of flexibility for granular permission management.
- Fix approach: Implement a proper permissions/roles mapping in the database.

## Known Bugs

Not detected during initial mapping.

## Security Considerations

**Client-side Auth Version:**
- Risk: `playcms_client_app` uses `next-auth` v4.
- Files: `playcms_client_app/package.json`
- Current mitigation: Stable v4 release.
- Recommendations: Migrate to Auth.js (v5) to align with Next.js 16 and React 19 patterns.

**Content Security Policy (CSP):**
- Risk: The CSP includes `'unsafe-inline'` for scripts and styles.
- Files: `backend/internal/middleware/security.go`
- Current mitigation: Restricts other sources to `'self'`.
- Recommendations: Move inline scripts/styles to external files and use nonces or hashes for necessary inline blocks.

**Cross-Site Cookie Configuration:**
- Risk: Production environment uses `SameSite=None`.
- Files: `backend/internal/modules/auth/handler.go`
- Current mitigation: `Secure=true` is enforced in production.
- Recommendations: Evaluate if `SameSite=Lax` is sufficient; `None` should only be used if cross-site requests are explicitly required.

## Performance Bottlenecks

**Token Blacklist Lookup:**
- Problem: Blacklisted tokens are stored and checked in the database.
- Files: `backend/internal/services/token_service.go`
- Cause: `ValidateAccessToken` performs a `COUNT` query on the `BlacklistedToken` table.
- Improvement path: Move the blacklist to a Redis set for O(1) lookup time.

## Fragile Areas

**Environment Variable Dependency:**
- Files: `backend/internal/services/token_service.go`
- Why fragile: The application panics immediately if `APP_SECRET` is missing during token generation or parsing.
- Safe modification: Implement a configuration validation step at startup that ensures all required env vars are present before the server starts.

## Scaling Limits

**Database Session Management:**
- Current capacity: Limited by PostgreSQL connection pool and disk I/O for session/token records.
- Limit: High-frequency token validation will bottleneck on DB I/O.
- Scaling path: Implement a distributed cache (Redis) for session and token validation.

## Dependencies at Risk

**Next-Auth v4:**
- Risk: Legacy version compared to Auth.js v5.
- Impact: Missing out on improved Next.js App Router integration and type safety.
- Migration plan: Update to `@auth/core` and `next-auth@beta`.

## Missing Critical Features

**Granular Permissions:**
- Problem: No system for assigning specific permissions to users beyond basic roles.
- Blocks: Ability to create "Editor" or "Moderator" roles with restricted access to specific modules.

## Test Coverage Gaps

**Authentication Middleware:**
- What's not tested: Edge cases for token rotation and family revocation in high-concurrency scenarios.
- Files: `backend/internal/services/token_service.go`, `backend/internal/middleware/auth.go`
- Risk: Token reuse attacks might not be fully mitigated or race conditions during rotation could lock users out.
- Priority: High

---

*Concerns audit: 2026-04-08*
