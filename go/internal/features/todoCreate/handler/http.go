package handler

import (
	"encoding/json"
	"net/http"
)

// Todo represents the structure of the todo JSON sent from the frontend.
type Todo struct {
	TodoTitle       string `json:"todoTitle"`
	TodoDescription string `json:"todoDescription"`
	TodoDateFrom    string `json:"todoDateFrom"`
	TodoDateTo      string `json:"todoDateTo"`
}

// todoCreateHandler handles todo creation requests.
type todoCreateHandler struct{}

// newTodoCreateHandler returns a new instance of todoCreateHandler.
func newTodoCreateHandler() *todoCreateHandler {
	return &todoCreateHandler{}
}

// Create handles the creation of a todo.
// It simply echoes back the received JSON.
func (h *todoCreateHandler) Create(w http.ResponseWriter, r *http.Request) {
	var t Todo
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
