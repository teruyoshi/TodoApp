package router

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/go-chi/chi/v5"
	"github.com/stretchr/testify/assert"
	"github.com/teruyoshi/todoApp/internal/features/todos/handler"
)

func TestRegisterTodoRoutes(t *testing.T) {
	t.Run("should call Create method of the handler when a POST request is made to /todos/", func(t *testing.T) {
		// Arrange
		called := false
		mockHandler := &handler.MockTodoHandler{
			CreateFunc: func(w http.ResponseWriter, r *http.Request) {
				called = true
				w.WriteHeader(http.StatusOK)
			},
		}

		r := chi.NewRouter()
		RegisterTodoRoutes(r, mockHandler)

		req := httptest.NewRequest("POST", "/todos/", strings.NewReader(`{}`))
		w := httptest.NewRecorder()

		// Act
		r.ServeHTTP(w, req)

		// Assert
		assert.True(t, called, "expected Create method to be called")
	})

	// t.Run("GET で /todos/ にアクセスすると Fetch メソッドが呼ばれること", func(t *testing.T) {
	// 	// Arrange
	// 	called := false
	// 	mockHandler := &handler.MockTodoFetchHandler{
	// 		FetchFunc: func(w http.ResponseWriter, r *http.Request) {
	// 			called = true
	// 			w.WriteHeader(http.StatusOK)
	// 		},
	// 	}

	// 	r := chi.NewRouter()
	// 	RegisterTodoRoutes(r, mockHandler)

	// 	req := httptest.NewRequest("GET", "/todos/", strings.NewReader(`{}`))
	// 	w := httptest.NewRecorder()

	// 	// Act
	// 	r.ServeHTTP(w, req)

	// 	// Assert
	// 	assert.True(t, called, "Fetch メソッドが呼ばれることを期待している")
	// })
}
