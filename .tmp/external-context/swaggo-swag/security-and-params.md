---
source: Context7 API + Official GitHub README
library: swaggo/swag
package: github.com/swaggo/swag
topic: security-and-params
fetched: 2026-04-25T12:00:00Z
official_docs: https://github.com/swaggo/swag#security
---

# Swaggo — Security Definitions & Param Syntax Reference

---

## 1. Defining Security Schemes (in main.go / General API Info)

### BearerAuth (JWT / HTTP Bearer)

Swaggo does **NOT** have a `@securityDefinitions.http` annotation. Instead, you define
an API key security scheme with `in: header` and `name: Authorization` to simulate
Bearer auth. This is the standard Swagger 2.0 approach.

```go
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
```

This creates a security definition where the user provides `Authorization: Bearer <token>`
in the header. In Swagger UI, the user enters the JWT token and the UI prepends "Bearer ".

### ApiKeyAuth (Custom Header API Key)

```go
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name X-API-Key
// @description API key for service-to-service authentication.
```

For API key in a query parameter instead:

```go
// @securityDefinitions.apikey ApiKeyAuth
// @in query
// @name api_key
// @description API key passed as query parameter.
```

### BasicAuth

```go
// @securityDefinitions.basic BasicAuth
```

### OAuth2 Application Flow

```go
// @securitydefinitions.oauth2.application OAuth2Application
// @tokenUrl https://example.com/oauth/token
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information
```

### OAuth2 Implicit Flow

```go
// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @authorizationurl https://example.com/oauth/authorize
// @scope.read Grants read access
// @scope.write Grants write access
```

### OAuth2 Password Flow

```go
// @securitydefinitions.oauth2.password OAuth2Password
// @tokenUrl https://example.com/oauth/token
// @scope.read Grants read access
// @scope.write Grants write access
```

### OAuth2 Access Code Flow

```go
// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
// @tokenUrl https://example.com/oauth/token
// @authorizationurl https://example.com/oauth/authorize
// @scope.read Grants read access
```

---

## 2. Applying @Security to Endpoints

### Single Security Requirement

```go
// @Security BearerAuth
```

```go
// @Security ApiKeyAuth
```

### OR Condition (Multiple @Security Lines = Any One Satisfies)

When you list multiple `@Security` annotations on separate lines, it means
**any one** of them can satisfy the security requirement (OR logic):

```go
// @Security ApiKeyAuth
// @Security BearerAuth
```

This means: the endpoint accepts EITHER ApiKeyAuth OR BearerAuth.

### AND Condition (Single Line with &&)

When you use `&&` on a single line, ALL security requirements must be satisfied:

```go
// @Security ApiKeyAuth && firebase
// @Security OAuth2Application[write, admin] && APIKeyAuth
```

### OAuth2 with Scopes

```go
// @Security OAuth2Application[write, admin]
```

### Combined AND + OR

```go
// @Security ApiKeyAuth && SomeOtherAuth
// @Security OAuth2Application[write, admin]
```

This means: (ApiKeyAuth AND SomeOtherAuth) OR (OAuth2Application with write+admin scopes).

---

## 3. Handling OptionalAuth (No Auth OR API Key OR JWT)

**Swagger 2.0 Limitation:** There is no native "optional security" concept in Swagger 2.0.
Security is either required or not. However, there are practical approaches:

### Approach A: Multiple @Security Lines (OR condition) — Best for Swagger UI

Define both security schemes in main.go:

```go
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name X-API-Key
// @description API key for service-to-service authentication.
```

Then on the endpoint, use multiple `@Security` lines (OR logic):

```go
// @Security ApiKeyAuth
// @Security BearerAuth
```

**Caveat:** Swagger 2.0 treats this as "at least one must be provided." There's no way
to express "no auth is also fine" in the spec itself. The actual enforcement of
optional auth happens in your Go middleware (e.g., `OptionalAuth()`), not in the
Swagger spec.

### Approach B: Document Without @Security + Add Description

For truly optional auth endpoints, omit `@Security` entirely and add a description:

```go
// @Summary Get published blog posts
// @Description Returns published blog posts. Authentication is optional — provides project context if authenticated via API key or JWT.
// @Tags blogs
// @Accept json
// @Produce json
// @Param project_id query int false "Filter by project ID (required if not authenticated)"
// @Success 200 {array} dto.BlogResponse
// @Failure 400 {object} httputil.HTTPError
// @Router /blogs [get]
```

### Approach C: Separate Endpoints in Docs

Document the same logical endpoint twice with different security:

```go
// GetBlogsPublic godoc
// @Summary Get published blogs (public)
// @Description Public access to published blogs
// @Tags blogs
// @Produce json
// @Success 200 {array} dto.BlogResponse
// @Router /blogs [get]

// GetBlogsAuthed godoc
// @Summary Get blogs (authenticated)
// @Description Authenticated access with project context
// @Tags blogs
// @Security ApiKeyAuth
// @Security BearerAuth
// @Produce json
// @Success 200 {array} dto.BlogResponse
// @Router /blogs [get]
```

**Recommendation for PlayCMS:** Use **Approach A** for endpoints that accept either
API key or JWT (like `ApiKeyAuth() + RequireApiKey()` routes), and **Approach B**
for truly optional auth endpoints (like `OptionalAuth()` routes). The Swagger spec
is documentation, not enforcement — your Gin middleware handles the actual auth logic.

---

## 4. @Param Syntax — Complete Reference

### General Format

```
// @Param <name> <paramType> <dataType> <required> <description> [<attribute>...]
```

| Component | Description | Values |
|---|---|---|
| `name` | The parameter name as it appears in the URL/header/body | Any string |
| `paramType` | Where the parameter comes from | `query`, `path`, `header`, `body`, `formData` |
| `dataType` | The data type | `string`, `int`, `integer`, `number`, `boolean`, `file`, or a struct like `model.Account` |
| `required` | Whether the parameter is mandatory | `true` or `false` |
| `description` | Human-readable description (in quotes) | Any string |
| `attribute` | Optional validation/formatting attributes | See below |

### Path Parameters

```go
// @Param id path int true "Account ID"
// @Param group_id path int true "Group ID"
// @Param account_id path int true "Account ID"
// @Param slug path string true "Post slug"
```

Corresponding router:
```go
// @Router /accounts/{id} [get]
// @Router /examples/groups/{group_id}/accounts/{account_id} [get]
```

### Query Parameters

```go
// @Param q query string false "name search by q" Format(email)
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(20) minimum(1) maximum(100)
// @Param sort query string false "Sort order" Enums(asc, desc) default(asc)
// @Param status query string false "Filter by status" Enums(active, inactive, pending)
// @Param project_id query int false "Filter by project ID"
```

### Request Body (JSON)

```go
// @Param request body dto.CreateBlogRequest true "Blog creation payload"
// @Param body body model.Account true "Account object"
```

For function-scoped structs:
```go
// @Param request body main.MyHandler.request true "query params"
```

### Request Headers

```go
// @Param X-MyHeader header string true "MyHeader must be set for valid response"
// @Param X-API-VERSION header string true "API version eg.: 1.0"
// @Param Authorization header string true "Bearer JWT token"
```

### Form Data

```go
// @Param name formData string true "Account name"
// @Param file formData file true "Upload file"
```

### File Upload

```go
// @Param file formData file true "Upload image"
```

### Array Parameters

```go
// @Param tags query []string false "Filter by tags" collectionFormat(multi)
// @Param ids query []int false "Filter by IDs" collectionFormat(csv)
```

### With Attributes

```go
// @Param enumstring query string false "string enums" Enums(A, B, C)
// @Param enumint query int false "int enums" Enums(1, 2, 3)
// @Param string query string false "string valid" minlength(5) maxlength(10)
// @Param int query int false "int valid" minimum(1) maximum(10)
// @Param default query string false "string default" default(A)
// @Param example query string false "string example" example(string)
// @Param collection query []string false "string collection" collectionFormat(multi)
// @Param extensions query []string false "string collection" extensions(x-example=test,x-nullable)
```

### SchemaExample for Body

```go
// @Param email body string true "message/rfc822" SchemaExample(Subject: Testmail\r\n\r\nBody Message\r\n)
```

---

## 5. Complete PlayCMS-Style Example

### main.go — Security Definitions

```go
// @title PlayCMS API
// @version 2.0
// @description PlayCMS Content Management System API
// @host localhost:8080
// @BasePath /api
// @schemes http https

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description JWT Bearer token. Format: "Bearer <token>"

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name X-API-Key
// @description API key for service-to-service authentication

func main() { ... }
```

### Handler — OptionalAuth Endpoint (public read, auth optional)

```go
// GetBlogs godoc
// @Summary Get published blogs
// @Description Returns published blogs. Auth is optional — provides project context if authenticated.
// @Tags blogs
// @Accept json
// @Produce json
// @Param project_id query int false "Filter by project ID (required if not authenticated)"
// @Param page query int false "Page number" default(1)
// @Param limit query int false "Items per page" default(20)
// @Success 200 {array} dto.BlogResponse
// @Failure 400 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /blogs [get]
func (h *BlogHandler) GetBlogs(c *gin.Context) { ... }
```

### Handler — API Key Required Endpoint

```go
// GetCategories godoc
// @Summary Get categories
// @Description Returns all categories. Requires API key.
// @Tags categories
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param project_id query int true "Project ID"
// @Success 200 {array} dto.CategoryResponse
// @Failure 401 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /categories [get]
func (h *CategoryHandler) GetCategories(c *gin.Context) { ... }
```

### Handler — JWT Required Endpoint

```go
// CreateBlog godoc
// @Summary Create a blog
// @Description Creates a new blog. Requires JWT authentication.
// @Tags blogs
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param request body dto.CreateBlogRequest true "Blog creation payload"
// @Success 201 {object} dto.BlogResponse
// @Failure 400 {object} httputil.HTTPError
// @Failure 401 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /blogs [post]
func (h *BlogHandler) CreateBlog(c *gin.Context) { ... }
```

### Handler — Admin Only Endpoint (JWT + Admin)

```go
// CreateProduct godoc
// @Summary Create a product
// @Description Creates a new product. Requires admin JWT.
// @Tags products
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param request body dto.CreateProductRequest true "Product creation payload"
// @Success 201 {object} dto.ProductResponse
// @Failure 400 {object} httputil.HTTPError
// @Failure 401 {object} httputil.HTTPError
// @Failure 403 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /products [post]
func (h *ProductHandler) CreateProduct(c *gin.Context) { ... }
```

### Handler — Accepts Either API Key OR JWT

```go
// GetBlogBySlug godoc
// @Summary Get blog by slug
// @Description Get a blog by its slug. Accepts API key or JWT.
// @Tags blogs
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Security BearerAuth
// @Param slug path string true "Blog slug"
// @Success 200 {object} dto.BlogResponse
// @Failure 404 {object} httputil.HTTPError
// @Router /blogs/{slug} [get]
func (h *BlogHandler) GetBlogBySlug(c *gin.Context) { ... }
```
