package handler

import (
	"encoding/json"
	"net/http"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

type todoCreateHandler struct {
	uc *usecase.TodoCreateUseCase
}

func NewTodoCreateHandler(uc *usecase.TodoCreateUseCase) *todoCreateHandler {
	return &todoCreateHandler{uc: uc}
}

func (h *todoCreateHandler) Create(w http.ResponseWriter, r *http.Request) {
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
