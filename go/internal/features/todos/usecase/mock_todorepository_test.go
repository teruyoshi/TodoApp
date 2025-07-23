package usecase_test

import "github.com/teruyoshi/todoApp/internal/features/todos/entity"

type mockTodoRepository struct {
	CreateFunc func(entity.Todo) (entity.Todo, error)
	FetchFunc  func() ([]entity.Todo, error)
}

func (m *mockTodoRepository) Create(t entity.Todo) (entity.Todo, error) {
	return m.CreateFunc(t)
}

func (m *mockTodoRepository) Fetch() ([]entity.Todo, error) {
	return m.FetchFunc()
}
