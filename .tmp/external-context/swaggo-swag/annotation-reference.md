---
source: Context7 API + Official GitHub README
library: swaggo/swag
package: github.com/swaggo/swag
topic: annotation-reference
fetched: 2026-04-25T12:00:00Z
official_docs: https://github.com/swaggo/swag#declarative-comments-format
---

# Swaggo (swag) — Complete Annotation Reference

Swag converts Go annotations to Swagger Documentation 2.0.

---

## 1. General API Info Annotations

These go in your `main.go` (or the file specified via `swag init -g`).

| Annotation | Description | Example |
|---|---|---|
| `title` | **Required.** The title of the application. | `// @title Swagger Example API` |
| `version` | **Required.** The version of the application API. | `// @version 1.0` |
| `description` | A short description of the application. | `// @description This is a sample server.` |
| `description.markdown` | Description parsed from a markdown file. | `// @description.markdown` (reads `api.md`) |
| `tag.name` | Name of a tag. | `// @tag.name Users` |
| `tag.description` | Description of the tag. | `// @tag.description User operations` |
| `tag.docs.url` | URL of external documentation for the tag. | `// @tag.docs.url https://example.com` |
| `tag.docs.description` | Description of the external docs. | `// @tag.docs.description Best docs` |
| `termsOfService` | The Terms of Service for the API. | `// @termsOfService http://swagger.io/terms/` |
| `contact.name` | The contact name for the API. | `// @contact.name API Support` |
| `contact.url` | The contact URL. | `// @contact.url http://www.swagger.io/support` |
| `contact.email` | The contact email. | `// @contact.email support@swagger.io` |
| `license.name` | **Required.** The license name. | `// @license.name Apache 2.0` |
| `license.url` | A URL to the license. | `// @license.url http://www.apache.org/licenses/LICENSE-2.0.html` |
| `host` | The host serving the API. | `// @host localhost:8080` |
| `BasePath` | The base path on which the API is served. | `// @BasePath /api/v1` |
| `schemes` | The transfer protocol(s), space-separated. | `// @schemes http https` |
| `accept` | MIME types the APIs can consume (global). | `// @accept json` |
| `produce` | MIME types the APIs can produce (global). | `// @produce json` |
| `query.collection.format` | Default array param format in query. | `// @query.collection.format multi` |
| `externalDocs.description` | Description of external document. | `// @externalDocs.description OpenAPI` |
| `externalDocs.url` | URL of external document. | `// @externalDocs.url https://swagger.io/resources/open-api/` |
| `x-name` | Extension key (must start with `x-`, takes JSON value). | `// @x-example-key {"key": "value"}` |

### Security Definition Annotations (General API Info)

| Annotation | Description | Parameters | Example |
|---|---|---|---|
| `securityDefinitions.basic` | Basic authentication | (none) | `// @securityDefinitions.basic BasicAuth` |
| `securityDefinitions.apikey` | API key authentication | `in`, `name`, `description` | `// @securityDefinitions.apikey ApiKeyAuth` |
| `securityDefinitions.oauth2.application` | OAuth2 application flow | `tokenUrl`, `scope`, `description` | `// @securitydefinitions.oauth2.application OAuth2Application` |
| `securityDefinitions.oauth2.implicit` | OAuth2 implicit flow | `authorizationUrl`, `scope`, `description` | `// @securitydefinitions.oauth2.implicit OAuth2Implicit` |
| `securityDefinitions.oauth2.password` | OAuth2 password flow | `tokenUrl`, `scope`, `description` | `// @securitydefinitions.oauth2.password OAuth2Password` |
| `securityDefinitions.oauth2.accessCode` | OAuth2 access code flow | `tokenUrl`, `authorizationUrl`, `scope`, `description` | `// @securitydefinitions.oauth2.accessCode OAuth2AccessCode` |

### Security Definition Parameter Annotations

| Parameter Annotation | Example |
|---|---|
| `in` | `// @in header` |
| `name` | `// @name Authorization` |
| `tokenUrl` | `// @tokenUrl https://example.com/oauth/token` |
| `authorizationurl` | `// @authorizationurl https://example.com/oauth/authorize` |
| `scope.hoge` | `// @scope.write Grants write access` |
| `description` | `// @description OAuth protects our entity endpoints` |

---

## 2. API Operation Annotations

These go above each handler function.

| Annotation | Description |
|---|---|
| `description` | A verbose explanation of the operation behavior. |
| `description.markdown` | Description loaded from a markdown file. E.g. `@description.markdown details` loads `details.md` |
| `id` | A unique string used to identify the operation. Must be unique among all API operations. |
| `tags` | A list of tags separated by commas. |
| `summary` | A short summary of what the operation does. |
| `accept` | MIME types the API can consume (json, xml, plain, html, mpfd, x-www-form-urlencoded, etc.) |
| `produce` | MIME types the API can produce. |
| `param` | Parameters separated by spaces: `param name`, `param type`, `data type`, `is mandatory?`, `comment` `attribute(optional)` |
| `security` | Security to apply to this API operation. |
| `success` | Success response: `return code or default`, `{param type}`, `data type`, `comment` |
| `failure` | Failure response: `return code or default`, `{param type}`, `data type`, `comment` |
| `response` | Same as `success` and `failure`. |
| `header` | Header in response: `return code`, `{param type}`, `data type`, `comment` |
| `router` | Path definition: `path`, `[httpMethod]` |
| `deprecatedrouter` | Same as router, but deprecated. |
| `x-name` | Extension key (must start with `x-`, takes JSON value). |
| `x-codeSample` | Optional Markdown. Takes `file` as parameter. Searches for a file named like the summary. |
| `deprecated` | Mark endpoint as deprecated. |

---

## 3. MIME Type Aliases

| Alias | MIME Type |
|---|---|
| `json` | `application/json` |
| `xml` | `text/xml` |
| `plain` | `text/plain` |
| `html` | `text/html` |
| `mpfd` | `multipart/form-data` |
| `x-www-form-urlencoded` | `application/x-www-form-urlencoded` |
| `json-api` | `application/vnd.api+json` |
| `json-stream` | `application/x-json-stream` |
| `octet-stream` | `application/octet-stream` |
| `png` | `image/png` |
| `jpeg` | `image/jpeg` |
| `gif` | `image/gif` |
| `event-stream` | `text/event-stream` |

---

## 4. Param Types

- `query` — URL query parameter
- `path` — URL path parameter
- `header` — HTTP request header
- `body` — Request body
- `formData` — Form data field

---

## 5. Data Types

- `string` (string)
- `integer` (int, uint, uint32, uint64)
- `number` (float32)
- `boolean` (bool)
- `file` (param data type when uploading)
- user defined struct (e.g., `model.Account`)

---

## 6. Param Attributes

```go
// @Param enumstring query string false "string enums" Enums(A, B, C)
// @Param enumint query int false "int enums" Enums(1, 2, 3)
// @Param enumnumber query number false "int enums" Enums(1.1, 1.2, 1.3)
// @Param string query string false "string valid" minlength(5) maxlength(10)
// @Param int query int false "int valid" minimum(1) maximum(10)
// @Param default query string false "string default" default(A)
// @Param example query string false "string example" example(string)
// @Param collection query []string false "string collection" collectionFormat(multi)
// @Param extensions query []string false "string collection" extensions(x-example=test,x-nullable)
```

### Available Field Tags on Structs

| Tag | Type | Description |
|---|---|---|
| `validate` | string | `required` or `optional` |
| `json` | string | JSON tag options; `omitempty` marks as not required |
| `default` | * | Default value if none provided |
| `maximum` | number | Maximum value |
| `minimum` | number | Minimum value |
| `multipleOf` | number | Must be multiple of |
| `maxLength` | integer | Max string length |
| `minLength` | integer | Min string length |
| `enums` | [*] | Enum values |
| `format` | string | Extended format (e.g., email, uuid, date-time) |
| `collectionFormat` | string | Array format: csv, ssv, tsv, pipes, multi |
| `example` | * | Example value |
| `extensions` | string | Extension fields (must start with `x-`) |

---

## 7. Response Param Types

In `@Success` and `@Failure`:

- `{object}` — a single object (struct)
- `{array}` — an array of objects
- `{string}` — a plain string
- `{integer}` — a plain integer

### Model Composition in Response

```go
// Override JSONResult's data field with a specific type
// @success 200 {object} jsonresult.JSONResult{data=proto.Order} "desc"

// Array of objects as nested response
// @success 200 {object} jsonresult.JSONResult{data=[]proto.Order} "desc"

// Primitive types as nested response
// @success 200 {object} jsonresult.JSONResult{data=string} "desc"
// @success 200 {object} jsonresult.JSONResult{data=[]string} "desc"

// Overriding multiple fields
// @success 200 {object} jsonresult.JSONResult{data1=string,data2=[]string,data3=proto.Order} "desc"

// Deep-level field overriding
// @success 200 {object} jsonresult.JSONResult{data1=proto.Order{data=proto.DeepObject}} "desc"
```

---

## 8. Response Headers

```go
// @Success 200 {string} string "ok"
// @failure 400 {string} string "error"
// @response default {string} string "other error"
// @Header 200 {string} Location "/entity/1"
// @Header 200,400,default {string} Token "token"
// @Header all {string} Token2 "token2"
```

---

## 9. Generics Support

```go
// @Success 200 {object} web.GenericNestedResponse[types.Post]
// @Success 204 {object} web.GenericNestedResponse[types.Post, Types.AnotherOne]
// @Success 201 {object} web.GenericNestedResponse[web.GenericInnerType[types.Post]]
```

---

## 10. Full Example (Gin Handler)

```go
// ShowAccount godoc
// @Summary Show an account
// @Description get string by ID
// @Tags accounts
// @Accept json
// @Produce json
// @Param id path int true "Account ID"
// @Success 200 {object} model.Account
// @Failure 400 {object} httputil.HTTPError
// @Failure 404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Router /accounts/{id} [get]
func (c *Controller) ShowAccount(ctx *gin.Context) {
    id := ctx.Param("id")
    aid, err := strconv.Atoi(id)
    if err != nil {
        httputil.NewError(ctx, http.StatusBadRequest, err)
        return
    }
    account, err := model.AccountOne(aid)
    if err != nil {
        httputil.NewError(ctx, http.StatusNotFound, err)
        return
    }
    ctx.JSON(http.StatusOK, account)
}
```

### Multiple Paths for One Handler

```go
// @Param group_id path int true "Group ID"
// @Param user_id path int true "User ID"
// @Router /examples/groups/{group_id}/user/{user_id}/address [put]
// @Router /examples/user/{user_id}/address [put]
```

### Function-Scoped Struct Declaration

```go
package main

// @Param request body main.MyHandler.request true "query params"
// @Success 200 {object} main.MyHandler.response
// @Router /test [post]
func MyHandler() {
    type request struct {
        RequestField string
    }
    type response struct {
        ResponseField string
    }
}
```
