package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	todoCreateHandler "github.com/teruyoshi/todoApp/internal/features/todoCreate/handler"
)

func RegisterTodoRoutes(r chi.Router) {
	handler := todoCreateHandler.NewTodoCreateHandler()

	r.Post("/todos/", handler.Create)
}
