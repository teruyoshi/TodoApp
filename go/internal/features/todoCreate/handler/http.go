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

// Create handles the creation of a todo.
// It simply echoes back the received JSON.
func Create(w http.ResponseWriter, r *http.Request) {
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
