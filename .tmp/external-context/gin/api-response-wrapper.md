---
source: Context7 API
library: Gin
package: gin-gonic/gin
topic: api-response-wrapper
fetched: 2026-04-09T10:00:00Z
official_docs: https://gin-gonic.com/en/docs/routing/api-design
---

# Gin API Response Wrapper Best Practices

## Standard API Response Envelope

To ensure a consistent JSON structure across all API endpoints, use a standard response envelope. This allows clients to predictably handle data, errors, and metadata.

### Implementation

```go
package response

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

// Response is the standard API envelope.
type Response struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *ErrorInfo  `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

type ErrorInfo struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

type Meta struct {
	Page       int `json:"page,omitempty"`
	PerPage    int `json:"per_page,omitempty"`
	Total      int `json:"total,omitempty"`
	TotalPages int `json:"total_pages,omitempty"`
}

// OK sends a success response.
func OK(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, Response{
		Success: true,
		Data:    data,
	})
}

// Fail sends an error response.
func Fail(c *gin.Context, status int, code, message string) {
	c.JSON(status, Response{
		Success: false,
		Error:   &ErrorInfo{Code: code, Message: message},
	})
}
```

## Global Error Handling Middleware

Instead of handling errors in every route, use a centralized middleware that catches errors added to the Gin context via `c.Error()`.

### Custom AppError Type

Define a structured error type to carry HTTP status codes and internal error codes.

```go
package response

import (
	"fmt"
)

// AppError represents a structured API error.
type AppError struct {
	Status  int    `json:"-"`
	Code    string `json:"code"`
	Message string `json:"message"`
}

func (e *AppError) Error() string {
	return e.Message
}

// Common AppErrors
var (
	ErrNotFound     = &AppError{Status: 404, Code: "NOT_FOUND", Message: "resource not found"}
	ErrUnauthorized = &AppError{Status: 401, Code: "UNAUTHORIZED", Message: "authentication required"}
	ErrBadRequest   = &AppError{Status: 400, Code: "BAD_REQUEST", Message: "invalid request"}
	ErrInternal     = &AppError{Status: 500, Code: "INTERNAL", Message: "an unexpected error occurred"}
)
```

### ErrorHandler Middleware

The middleware processes the request and then checks for any errors in the context.

```go
package middleware

import (
	"errors"
	"net/http"
	"github.com/gin-gonic/gin"
	"your-project/internal/response"
)

func ErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if len(c.Errors) == 0 {
			return
		}

		err := c.Errors.Last().Err
		var appErr *response.AppError
		if errors.As(err, &appErr) {
			c.JSON(appErr.Status, response.Response{
				Success: false,
				Error: &response.ErrorInfo{
					Code:    appErr.Code,
					Message: appErr.Message,
				},
			})
		} else {
			c.JSON(http.StatusInternalServerError, response.Response{
				Success: false,
				Error: &response.ErrorInfo{
					Code:    "INTERNAL",
					Message: "an unexpected error occurred",
				},
			})
		}
	}
}
```

## Integration Example

```go
func main() {
	r := gin.Default()
	
	// Attach the error-handling middleware
	r.Use(middleware.ErrorHandler())

	r.GET("/api/items/:id", func(c *gin.Context) {
		id := c.Param("id")
		if id == "0" {
			// Use c.Error to pass the error to the middleware
			_ = c.Error(response.ErrNotFound)
			return
		}
		
		// Use helper for success
		response.OK(c, gin.H{"id": id, "name": "Sample Item"})
	})

	r.Run(":8080")
}
```
