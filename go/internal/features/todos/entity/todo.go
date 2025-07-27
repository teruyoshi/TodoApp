package entity

type Todo struct {
	ID              uint   `json:"id"`
	TodoTitle       string `json:"todoTitle"`
	TodoDescription string `json:"todoDescription"`
	TodoDateFrom    string `json:"todoDateFrom"`
	TodoDateTo      string `json:"todoDateTo"`
}
