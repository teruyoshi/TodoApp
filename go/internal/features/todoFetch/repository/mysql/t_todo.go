package mysql

// TTodo represents the todo entity stored in t_todos table.
type TTodo struct {
	TodoTitle       string `gorm:"column:title;type:varchar(20)"`
	TodoDescription string `gorm:"column:description;type:varchar(200)"`
	TodoDateFrom    string `gorm:"column:date_from;type:date"`
	TodoDateTo      string `gorm:"column:date_to;type:date"`
}

// TableName returns the table name for gorm.
func (TTodo) TableName() string {
	return "t_todos"
}
