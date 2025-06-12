package handler

import (
	"encoding/json"
	"net/http"

	"github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"
)

type todoCreateHandler struct{}

func NewTodoCreateHandler() *todoCreateHandler {
	return &todoCreateHandler{}
}

func (h *todoCreateHandler) Create(w http.ResponseWriter, r *http.Request) {
	var t entity.Todo
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(t); err != nil {
		http.Error(w, "failed to encode json", http.StatusInternalServerError)
		return
	}
}
