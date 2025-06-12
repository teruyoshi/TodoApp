package mysql

import (
	"database/sql"

	"github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"
	repo "github.com/teruyoshi/todoApp/internal/features/todoCreate/repository"
)

// TodoRepository implements repo.TodoRepository using MySQL.
type TodoRepository struct {
	db *sql.DB
}

// NewTodoRepository returns a new TodoRepository instance.
func NewTodoRepository(db *sql.DB) *TodoRepository {
	return &TodoRepository{db: db}
}

// Create inserts the given Todo into the database.
func (r *TodoRepository) Create(t entity.Todo) (entity.Todo, error) {
	const query = `INSERT INTO todos (title, description, date_from, date_to) VALUES (?, ?, ?, ?)`
	if _, err := r.db.Exec(query, t.TodoTitle, t.TodoDescription, t.TodoDateFrom, t.TodoDateTo); err != nil {
		return entity.Todo{}, err
	}
	return t, nil
}

var _ repo.TodoRepository = (*TodoRepository)(nil)
