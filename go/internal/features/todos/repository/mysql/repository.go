package mysql

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	repo "github.com/teruyoshi/todoApp/internal/features/todos/repository"
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

// Fetch retrieves all todos from t_todos and returns them as a slice of entity.Todo.
func (r *TodoRepository) Fetch() ([]entity.Todo, error) {
	var dbModels []TTodo
	if err := r.db.Model(&TTodo{}).Find(&dbModels).Error; err != nil {
		return nil, err
	}

	todos := make([]entity.Todo, len(dbModels))
	for i, m := range dbModels {
		todos[i] = entity.Todo{
			TodoTitle:       m.TodoTitle,
			TodoDescription: m.TodoDescription,
			TodoDateFrom:    m.TodoDateFrom,
			TodoDateTo:      m.TodoDateTo,
		}
	}
	return todos, nil
}
