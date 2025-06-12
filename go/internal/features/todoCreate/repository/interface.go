package repository

import "github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"

// TodoRepository defines behavior for persisting Todo entities.
type TodoRepository interface {
	Create(t entity.Todo) (entity.Todo, error)
}
