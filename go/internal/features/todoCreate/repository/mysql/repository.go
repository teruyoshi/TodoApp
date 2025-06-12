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

func (r *TodoRepository) AutoMigrate(dst ...interface{}) error {
	return r.db.AutoMigrate(dst...)
}

func NewTodoRepository(dsn string) (*TodoRepository, error) {
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}
	return &TodoRepository{db: db}, nil
}

func (r *TodoRepository) Create(t entity.Todo) (entity.Todo, error) {
	dbModel := TTodo{
		TodoTitle:       t.TodoTitle,
		TodoDescription: t.TodoDescription,
		TodoDateFrom:    t.TodoDateFrom,
		TodoDateTo:      t.TodoDateTo,
	}
	if err := r.db.Create(&dbModel).Error; err != nil {
		return entity.Todo{}, err
	}
	return entity.Todo{
		TodoTitle:       dbModel.TodoTitle,
		TodoDescription: dbModel.TodoDescription,
		TodoDateFrom:    dbModel.TodoDateFrom,
		TodoDateTo:      dbModel.TodoDateTo,
	}, nil
}
