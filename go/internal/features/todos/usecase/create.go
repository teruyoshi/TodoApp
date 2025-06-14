package usecase

import (
	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	repo "github.com/teruyoshi/todoApp/internal/features/todos/repository"
)

// TodoCreator represents an interactor capable of creating todos.
// It allows handlers to depend on behavior instead of a concrete
// implementation which improves testability.
type TodoCreator interface {
	Execute(entity.Todo) (entity.Todo, error)
}

type TodoCreateUseCase struct {
	repo repo.TodoRepository
}

func NewTodoCreateUseCase(r repo.TodoRepository) *TodoCreateUseCase {
	return &TodoCreateUseCase{repo: r}
}

func (u *TodoCreateUseCase) Execute(t entity.Todo) (entity.Todo, error) {
	return u.repo.Create(t)
}
