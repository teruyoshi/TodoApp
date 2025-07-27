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

type MockTodoHandler struct {
	CreateFunc func(w http.ResponseWriter, r *http.Request)
	FetchFunc  func(w http.ResponseWriter, r *http.Request)
}

func (m *MockTodoHandler) Create(w http.ResponseWriter, r *http.Request) {
	m.CreateFunc(w, r)
}

func (m *MockTodoHandler) Fetch(w http.ResponseWriter, r *http.Request) {
	m.FetchFunc(w, r)
}
