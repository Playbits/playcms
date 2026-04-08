# External Integrations

**Analysis Date:** 2026-04-08

## APIs & External Services

**Storage & Media:**
- AWS S3 - Used for storing media files and attachments.
  - SDK: `github.com/aws/aws-sdk-go-v2/service/s3`
  - Auth: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

**Email Delivery:**
- AWS SES - Primary email sending service.
  - SDK: `github.com/aws/aws-sdk-go-v2/service/ses`
- Resend - Alternative email delivery service.
  - SDK: `github.com/resend/resend-go/v2`
- Mailjet - Legacy/Alternative email service.
  - SDK: `github.com/mailjet/mailjet-apiv3-go`

**Payments:**
- Paystack - Client-side payment integration.
  - SDK: `react-paystack` (`playcms_client_app/package.json`)
  - Auth: `PAYSTACK_API_KEY`

## Data Storage

**Databases:**
- PostgreSQL - Production database.
  - Connection: `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`
  - Client: GORM (`gorm.io/driver/postgres`)
- SQLite - Local development database.
  - Client: GORM (`gorm.io/driver/sqlite`)

**File Storage:**
- AWS S3 - Remote storage for uploads.

**Caching:**
- Redis - Used for session caching and Asynq task queueing.
  - Connection: `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`
  - Client: `github.com/redis/go-redis/v9`

## Authentication & Identity

**Auth Provider:**
- Custom JWT Implementation - Backend handles token generation and validation.
  - Implementation: `golang-jwt/jwt/v5` in `backend/`
- NextAuth - Handles session and auth state in the client application.
  - Implementation: `next-auth` in `playcms_client_app/`

## Monitoring & Observability

**Error Tracking:**
- Not detected.

**Logs:**
- Standard output/error logs in Go and Node.js.

## CI/CD & Deployment

**Hosting:**
- S3 + CloudFront (Dev environment for client app)
- Custom Linux server (Production backend)

**CI Pipeline:**
- Not explicitly detected in manifest files, but mentions of "coastline_dev" and "main" branches suggest a Git-based deployment workflow.

## Environment Configuration

**Required env vars:**
- **Backend**: `DB_CONNECTION`, `DB_HOST`, `REDIS_HOST`, `APP_SECRET`, `AWS_BUCKET_NAME`
- **Admin**: `NUXT_API_URL`, `NUXT_COOKIE_NAME`, `NUXT_COOKIE_SECRET`
- **Client**: `API_BASE_URL`, `API_TOKEN`, `FRONTEND_URL`, `PAYSTACK_API_KEY`

**Secrets location:**
- Managed via `.env` files (not committed to git).

## Webhooks & Callbacks

**Incoming:**
- Not explicitly mapped, but expected for Paystack payment notifications.

**Outgoing:**
- Outgoing requests to AWS S3, SES, Resend, and Mailjet for infrastructure services.

---

*Integration audit: 2026-04-08*
