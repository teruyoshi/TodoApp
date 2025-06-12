package repository

import "github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"

type TodoRepository interface {
	Create(t entity.Todo) (entity.Todo, error)
}
