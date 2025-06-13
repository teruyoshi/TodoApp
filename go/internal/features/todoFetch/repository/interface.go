package repository

import "github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"

// TodoRepository provides methods to fetch todos.
type TodoRepository interface {
	Fetch() ([]entity.Todo, error)
}
