package handler

import (
	"encoding/json"
	"net/http"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

// todoCreateHandler handles HTTP requests for creating todos.
// It depends on the TodoCreator interface which makes it easy to
// replace the actual use case with a stub in tests.
type TodoCreateHandler struct {
	uc usecase.TodoCreator
}

// NewTodoCreateHandler constructs a handler with the given use case.
func NewTodoCreateHandler(uc usecase.TodoCreator) *TodoCreateHandler {
	return &TodoCreateHandler{uc: uc}
}

func (h *TodoCreateHandler) Create(w http.ResponseWriter, r *http.Request) {
	var t entity.Todo
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	todo, err := h.uc.Execute(t)
	if err != nil {
		http.Error(w, "failed to create todo", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(todo); err != nil {
		http.Error(w, "failed to encode json", http.StatusInternalServerError)
		return
	}
}
