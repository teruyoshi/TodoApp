package usecase

import (
	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	repo "github.com/teruyoshi/todoApp/internal/features/todos/repository"
)

type TodoFetcher interface {
	Execute() ([]entity.Todo, error)
}

type TodoFetchUseCase struct {
	repo repo.TodoRepository
}

func NewTodoFetchUseCase(r repo.TodoRepository) *TodoFetchUseCase {
	return &TodoFetchUseCase{repo: r}
}

func (u *TodoFetchUseCase) Execute() ([]entity.Todo, error) {
	return u.repo.Fetch()
}
