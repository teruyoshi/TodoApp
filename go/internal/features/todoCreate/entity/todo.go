package entity

// Todo represents a todo item received from the frontend.
type Todo struct {
	TodoTitle       string `json:"todoTitle"`
	TodoDescription string `json:"todoDescription"`
	TodoDateFrom    string `json:"todoDateFrom"`
	TodoDateTo      string `json:"todoDateTo"`
}
