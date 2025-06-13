package usecase

import (
	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	repo "github.com/teruyoshi/todoApp/internal/features/todos/repository"
)

type TodoCreateUseCase struct {
	repo repo.TodoRepository
}

func NewTodoCreateUseCase(r repo.TodoRepository) *TodoCreateUseCase {
	return &TodoCreateUseCase{repo: r}
}

func (u *TodoCreateUseCase) Execute(t entity.Todo) (entity.Todo, error) {
	return u.repo.Create(t)
}
