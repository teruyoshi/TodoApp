package handler

import (
	"net/http"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
)

// MockTodoCreator is a mock of TodoCreator for testing.
// It allows you to control the behavior of the Execute method.
type MockTodoCreator struct {
	ExecuteFunc func(entity.Todo) (entity.Todo, error)
}

// Execute calls the underlying ExecuteFunc.
func (m *MockTodoCreator) Execute(t entity.Todo) (entity.Todo, error) {
	return m.ExecuteFunc(t)
}

// MockTodoCreateHandler is a mock of TodoCreateHandler for testing.
// It allows you to control the behavior of the Create method.
type MockTodoCreateHandler struct {
	CreateFunc func(w http.ResponseWriter, r *http.Request)
}

// Create calls the underlying CreateFunc.
func (m *MockTodoCreateHandler) Create(w http.ResponseWriter, r *http.Request) {
	m.CreateFunc(w, r)
}
