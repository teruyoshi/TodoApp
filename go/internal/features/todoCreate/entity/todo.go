package entity

type Todo struct {
	TodoTitle       string `json:"todoTitle" gorm:"column:title"`
	TodoDescription string `json:"todoDescription" gorm:"column:description"`
	TodoDateFrom    string `json:"todoDateFrom" gorm:"column:date_from"`
	TodoDateTo      string `json:"todoDateTo" gorm:"column:date_to"`
}
