package mysql

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"
	repo "github.com/teruyoshi/todoApp/internal/features/todoCreate/repository"
)

var _ repo.TodoRepository = (*TodoRepository)(nil)

type TodoRepository struct {
	db *gorm.DB
}

func NewTodoRepository(dsn string) (*TodoRepository, error) {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return &TodoRepository{db: db}, nil
}

func (r *TodoRepository) Create(t entity.Todo) (entity.Todo, error) {
	if err := r.db.Create(&t).Error; err != nil {
		return entity.Todo{}, err
	}
	return t, nil
}
