package router

import (
	"github.com/go-chi/chi/v5"

	todoCreateHandler "github.com/teruyoshi/todoApp/internal/features/todoCreate/handler"
	todoCreateUseCase "github.com/teruyoshi/todoApp/internal/features/todoCreate/usecase"
)

func RegisterTodoRoutes(r chi.Router) {
	uc := todoCreateUseCase.NewTodoCreateUseCase()
	handler := todoCreateHandler.NewTodoCreateHandler(uc)

	r.Post("/todos/", handler.Create)
}
