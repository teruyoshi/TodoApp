package repository

import "github.com/teruyoshi/todoApp/internal/features/todos/entity"

// TodoRepository provides methods to fetch todos.
type TodoRepository interface {
	Fetch() ([]entity.Todo, error)
}
