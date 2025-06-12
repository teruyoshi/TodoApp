package usecase

import "github.com/teruyoshi/todoApp/internal/features/todoCreate/entity"

// TodoCreateUsecase handles creation logic for Todo entities.
type TodoCreateUsecase struct{}

// NewTodoCreateUsecase returns a new instance of TodoCreateUsecase.
func NewTodoCreateUsecase() *TodoCreateUsecase {
	return &TodoCreateUsecase{}
}

// Execute processes the given Todo.
// Currently it simply returns the provided entity without modification.
func (u *TodoCreateUsecase) Execute(t entity.Todo) (entity.Todo, error) {
	// In a real implementation, business logic such as validation or
	// persistence would be performed here.
	return t, nil
}
