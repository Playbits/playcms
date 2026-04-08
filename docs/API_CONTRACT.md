# API Contract - PlayCMS v3

## Base URL
```
http://localhost:8800/api/v3
```

## Authentication

All protected endpoints require a valid JWT access token passed in the `Authorization` header:
```
Authorization: Bearer <access_token>
```

Tokens are set as httpOnly cookies on login:
- `_g_access_token` - JWT access token
- `_g_refresh_token` - Refresh token

## Endpoints

---

### Auth Module

#### POST /auth/login
Login with credentials.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123",
  "project_id": 1,
  "rememberMe": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "...",
    "refresh_token": "...",
    "token_type": "Bearer"
  },
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@playcms.com",
    "role": "admin"
  }
}
```

#### POST /auth/register
Register new user.

**Request:**
```json
{
  "username": "newuser",
  "email": "user@example.com",
  "password": "password123",
  "project_id": 1
}
```

#### POST /auth/refresh
Refresh access token. Requires `X-Refresh-Token` header with refresh token.

#### GET /auth/me
Get current user info. Requires authentication.

#### POST /auth/logout
Logout and clear tokens.

---

### User Module

All user endpoints require authentication.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | List users |
| GET | /users/:id | Get user by ID |
| POST | /users | Create user (admin) |
| PATCH | /users/:id | Update user |
| DELETE | /users/:id | Delete user |

---

### Project Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /projects/domain/:domain | Get project by domain |
| GET | /projects/my | Get user's projects |
| GET | /projects | List projects |
| GET | /projects/:id | Get project by ID |
| POST | /projects | Create project (admin) |
| PATCH | /projects/:id | Update project (admin) |
| DELETE | /projects/:id | Delete project (admin) |

---

### Product Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /products/project/:projectId | Get products by project |
| GET | /product/all | Get products (BFF alias) |
| GET | /products | List all products |
| GET | /products/:id | Get product by ID |
| POST | /products | Create product |
| PATCH | /products/:id | Update product |
| DELETE | /products/:id | Delete product |
| POST | /products/:id/variants | Create variant |
| DELETE | /products/:id/variants/:variantId | Delete variant |

---

### Order Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /orders/project/:projectId | Get orders by project |
| GET | /order/all | Get orders (BFF alias) |
| GET | /orders/my | Get current user's orders |
| GET | /orders | List all orders |
| GET | /orders/:id | Get order by ID |
| POST | /orders | Create order |
| PATCH | /orders/:id | Update order |
| POST | /orders/:id/cancel | Cancel order |

---

### Cart Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /cart/project/:projectId | Get user's cart |
| POST | /cart/project/:projectId/items | Add item to cart |
| PATCH | /cart/:cartId/items/:itemId | Update cart item |
| DELETE | /cart/:cartId/items/:itemId | Remove cart item |
| DELETE | /cart/:cartId | Clear cart |

---

### Discount Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /discounts/project/:projectId | Get discounts by project |
| GET | /discount/all | Get discounts (BFF alias) |
| GET | /discounts | List discounts |
| GET | /discounts/:id | Get discount by ID |
| GET | /discounts/code/:code | Get discount by code |
| POST | /discounts | Create discount |
| PATCH | /discounts/:id | Update discount |
| DELETE | /discounts/:id | Delete discount |
| GET | /discounts/validate/:code | Validate discount code |

---

### Payment Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /payments/order/:orderId | Get payments by order |
| GET | /payments/:id | Get payment by ID |
| POST | /payments | Create payment |

---

### Page Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /pages/project/:projectId | Get pages by project |
| GET | /page/all | Get pages (BFF alias) |
| GET | /pages/by-project/:projectId/by-slug/:slug | Get page by slug |
| GET | /pages | List all pages |
| GET | /pages/:id | Get page by ID |
| POST | /pages | Create page |
| PATCH | /pages/:id | Update page |
| DELETE | /pages/:id | Delete page |

---

### Media Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /media/project/:projectId | Get media by project |
| GET | /media/:id | Get media by ID |
| POST | /media | Upload media |
| POST | /media/batch | Batch upload |
| DELETE | /media/:id | Delete media |
| POST | /media/attach | Attach to product |
| POST | /media/detach | Detach from product |

---

### Blog Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /blogs/:id | Get blog |
| GET | /blogs/:blogId/posts | Get blog posts |
| GET | /post/:id/comments | Get comments |
| GET | /blogs | List blogs |
| POST | /blogs | Create blog |
| PATCH | /blogs/:id | Update blog |
| DELETE | /blogs/:id | Delete blog |
| POST | /blogs/post | Create post |
| PATCH | blogs/post/:id | Update post |
| DELETE | blogs/post/:id | Delete post |

---

### Mail Module

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /mail/send | Send email |
| POST | /mail/test | Send test email |

---

## Error Responses

Standard error format:
```json
{
  "error": "Error message",
  "statusCode": 400
}
```

Common status codes:
- 200 - Success
- 201 - Created
- 400 - Bad Request
- 401 - Unauthorized
- 403 - Forbidden
- 404 - Not Found
- 500 - Internal Server Error