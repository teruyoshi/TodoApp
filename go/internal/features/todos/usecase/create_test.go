package usecase_test

import (
	"errors"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

func TestTodoCreateUseCase_Execute(t *testing.T) {
	t.Run("should create a todo successfully", func(t *testing.T) {
		// Arrange
		mockRepo := &mockTodoRepository{
			CreateFunc: func(e entity.Todo) (entity.Todo, error) {
				return e, nil
			},
		}
		uc := usecase.NewTodoCreateUseCase(mockRepo)
		todo := entity.Todo{
			TodoTitle:       "Test Title",
			TodoDescription: "Test Description",
			TodoDateFrom:    time.Now().Format(time.RFC3339),
			TodoDateTo:      time.Now().Add(24 * time.Hour).Format(time.RFC3339),
		}

		// Act
		createdTodo, err := uc.Execute(todo)

		// Assert
		assert.NoError(t, err)
		assert.Equal(t, todo.TodoTitle, createdTodo.TodoTitle)
		assert.Equal(t, todo.TodoDescription, createdTodo.TodoDescription)
	})

	t.Run("should return an error if repository fails", func(t *testing.T) {
		// Arrange
		mockRepo := &mockTodoRepository{
			CreateFunc: func(e entity.Todo) (entity.Todo, error) {
				return entity.Todo{}, errors.New("repository error")
			},
		}
		uc := usecase.NewTodoCreateUseCase(mockRepo)
		todo := entity.Todo{
			TodoTitle: "Test Title",
		}

		// Act
		_, err := uc.Execute(todo)

		// Assert
		assert.Error(t, err)
		assert.Equal(t, "repository error", err.Error())
	})
}
