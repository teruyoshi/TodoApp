package mysql

type TTodo struct {
	TodoTitle       string `gorm:"column:title"`
	TodoDescription string `gorm:"column:description"`
	TodoDateFrom    string `gorm:"column:date_from"`
	TodoDateTo      string `gorm:"column:date_to"`
}

func (TTodo) TableName() string {
	return "t_todos"
}
