package router

import (
	"net/http"

	"github.com/go-chi/chi/v5"

	todoCreateHandler "github.com/teruyoshi/todoApp/internal/features/todoCreate/handler"
	todoCreateUsecase "github.com/teruyoshi/todoApp/internal/features/todoCreate/usecase"
)

func RegisterTodoRoutes(r chi.Router) {
	usecase := todoCreateUsecase.NewTodoCreateUsecase()
	handler := todoCreateHandler.NewTodoCreateHandler(usecase)

	r.Post("/todos/", handler.Create)
}
