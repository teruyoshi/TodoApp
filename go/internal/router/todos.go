package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

// RegisterTodoRoutes registers routes related to todos.
func RegisterTodoRoutes(r chi.Router) {
	r.Post("/todos/", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Hello World\n"))
	})
}
