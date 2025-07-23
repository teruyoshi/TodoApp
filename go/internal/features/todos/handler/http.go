package handler

import (
	"encoding/json"
	"net/http"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

type TodoHandler struct {
	uc usecase.TodoCreator
}

func NewTodoHandler(uc usecase.TodoCreator) *TodoHandler {
	return &TodoHandler{uc: uc}
}

func (h *TodoHandler) Create(w http.ResponseWriter, r *http.Request) {
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
