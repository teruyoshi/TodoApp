package handler

import (
	"encoding/json"
	"net/http"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

type TodoHandler struct {
	creator usecase.TodoCreator
	fetcher usecase.TodoFetcher
}

func NewTodoHandler(creator usecase.TodoCreator, fetcher usecase.TodoFetcher) *TodoHandler {
	return &TodoHandler{creator: creator, fetcher: fetcher}
}

func (h *TodoHandler) Create(w http.ResponseWriter, r *http.Request) {
	var t entity.Todo
	if err := json.NewDecoder(r.Body).Decode(&t); err != nil {
		http.Error(w, "invalid json", http.StatusBadRequest)
		return
	}

	todo, err := h.creator.Execute(t)
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

func (h *TodoHandler) Fetch(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	todos, _ := h.fetcher.Execute()
	if err := json.NewEncoder(w).Encode(todos); err != nil {
		http.Error(w, "failed to encode json", http.StatusInternalServerError)
		return
	}
}
