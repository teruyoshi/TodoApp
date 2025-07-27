package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"
)

type TodoHandler interface {
	Create(w http.ResponseWriter, r *http.Request)
	Fetch(w http.ResponseWriter, r *http.Request)
}

func RegisterTodoRoutes(r chi.Router, handler TodoHandler) {
	r.Post("/todos/", handler.Create)
	r.Get("/todos/", handler.Fetch)
}
