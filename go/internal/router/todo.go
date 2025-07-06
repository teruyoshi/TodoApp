package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// TodoCreatorHandler defines the interface for todo creation handlers.
// This allows us to pass both real handlers and mocks to the router.
type TodoCreatorHandler interface {
	Create(w http.ResponseWriter, r *http.Request)
}

func RegisterTodoRoutes(r chi.Router, handler TodoCreatorHandler) {
	r.Post("/todos/", handler.Create)
}
