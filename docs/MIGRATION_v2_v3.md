# Migration Guide: v2 to v3

## Breaking Changes

### 1. API Base Path
- **v2**: `/api/v2`
- **v3**: `/api/v3`

### 2. Authentication
- **v2**: Tokens in response body
- **v3**: Tokens in httpOnly cookies (`_g_access_token`, `_g_refresh_token`)

### 3. Route Changes

| v2 | v3 | Notes |
|----|-----|-------|
| `PATCH /cart/items/:itemId` | `PATCH /cart/:cartId/items/:itemId` | Added cartId param |
| `DELETE /cart/items/:itemId` | `DELETE /cart/:cartId/items/:itemId` | Added cartId param |

### 4. Project-Scoped Endpoints
- **v2**: Some endpoints public
- **v3**: All project-scoped endpoints require authentication

### 5. Project Management
- **v2**: All project routes accessible
- **v3**: Only read operations for regular users; create/update/delete require admin role

### 6. Database Schema
- Products now use many2many relationship with projects (`project_product` table)
- Orders use `order_purchase` for product associations

## Migration Steps

### 1. Update API Base URL
```javascript
// Before (v2)
const API_URL = 'http://localhost:8800/api/v2'

// After (v3)
const API_URL = 'http://localhost:8800/api/v3'
```

### 2. Update Authentication Flow
- Login now returns tokens in cookies instead of response body
- Subsequent requests automatically send cookies
- Token refresh updates cookies automatically

### 3. Update Cart Routes
```javascript
// Before (v2)
PATCH /cart/items/:itemId

// After (v3)
PATCH /cart/:cartId/items/:itemId
```

### 4. Add Authorization Header
All API requests now require authentication:
```javascript
// Frontend (Nuxt) - automatic via cookies
// Client (Next.js) - use NextAuth session
```

## Frontend Changes Required

### Admin Frontend (Nuxt)
1. Cart API routes updated to use `/cart/project/:projectId`
2. Order API routes: `is_admin` param removed

### Client App (Next.js)
1. Update cart endpoints
2. Update discount endpoint from `/discounts/:code` to `/discounts/code/:code`
3. Fix orders POST from `/order` to `/orders`

## Database Changes

No manual migration required - GORM handles schema automatically.

## Testing Checklist

- [ ] Login works and sets cookies
- [ ] Authenticated requests work
- [ ] Products list returns data
- [ ] Cart operations work
- [ ] Orders can be created
- [ ] Discount codes can be validated
- [ ] Token refresh works
- [ ] Logout clears tokens