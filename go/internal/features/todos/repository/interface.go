package repository

import "github.com/teruyoshi/todoApp/internal/features/todos/entity"

type TodoRepository interface {
	Create(t entity.Todo) (entity.Todo, error)
	Fetch() ([]entity.Todo, error)
}
