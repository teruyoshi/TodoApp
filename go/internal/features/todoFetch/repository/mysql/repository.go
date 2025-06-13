package mysql

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// TodoRepository provides methods to fetch todos from database.
type TodoRepository struct {
	db *gorm.DB
}

// NewTodoRepository creates a new TodoRepository with the given DSN.
func NewTodoRepository(dsn string) (*TodoRepository, error) {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return &TodoRepository{db: db}, nil
}

// Fetch retrieves all todos from t_todos and returns them as a slice of TTodo.
func (r *TodoRepository) Fetch() ([]TTodo, error) {
	var todos []TTodo
	if err := r.db.Model(&TTodo{}).Find(&todos).Error; err != nil {
		return nil, err
	}
	return todos, nil
}
