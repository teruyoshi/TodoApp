package mysql

type TTodo struct {
	ID              uint   `gorm:"column:id;primaryKey;autoIncrement"`
	TodoTitle       string `gorm:"column:title;type:varchar(20)"`
	TodoDescription string `gorm:"column:description;type:varchar(200)"`
	TodoDateFrom    string `gorm:"column:date_from;type:varchar(200)"`
	TodoDateTo      string `gorm:"column:date_to;type:varchar(200)"`
}

func (TTodo) TableName() string {
	return "t_todos"
}
