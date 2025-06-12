package usecase

import "github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"

type TodoCreateUseCase struct{}

func NewTodoCreateUseCase() *TodoCreateUseCase {
	return &TodoCreateUseCase{}
}

func (u *TodoCreateUseCase) Execute(t entity.Todo) (entity.Todo, error) {

	return t, nil
}
