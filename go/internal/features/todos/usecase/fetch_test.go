package usecase_test

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

func TestTodoFetchUseCase_Execute(t *testing.T) {
	t.Run("Todo 群の取得がうまくいく", func(t *testing.T) {
		todos := []entity.Todo{
			{TodoTitle: "国語の勉強", TodoDescription: "音読と漢字の宿題"},
			{TodoTitle: "数学の勉強", TodoDescription: "計算ドリル"},
			{TodoTitle: "英語の勉強", TodoDescription: "単語帳の暗記"},
		}
		// Arrange
		mockRepo := &mockTodoRepository{
			FetchFunc: func() ([]entity.Todo, error) {
				return todos, nil
			},
		}
		uc := usecase.NewTodoFetchUseCase(mockRepo)

		// Act
		fetchedTodo, err := uc.Execute()

		// Assert
		assert.NoError(t, err)
		assert.Equal(t, todos[0].TodoTitle, fetchedTodo[0].TodoTitle)
		assert.Equal(t, todos[0].TodoDescription, fetchedTodo[0].TodoDescription)
	})

// 	t.Run("should return an error if repository fails", func(t *testing.T) {
// 		// Arrange
// 		mockRepo := &mockTodoRepository{
// 			CreateFunc: func(e entity.Todo) (entity.Todo, error) {
// 				return entity.Todo{}, errors.New("repository error")
// 			},
// 		}
// 		uc := usecase.NewTodoCreateUseCase(mockRepo)
// 		todo := entity.Todo{
// 			TodoTitle: "Test Title",
// 		}

// 		// Act
// 		_, err := uc.Execute(todo)

// 		// Assert
// 		assert.Error(t, err)
// 		assert.Equal(t, "repository error", err.Error())
// 	})
}
