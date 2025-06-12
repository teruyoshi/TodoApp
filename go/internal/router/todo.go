package router

import (
	"fmt"
	"os"

	"github.com/go-chi/chi/v5"

	todoCreateHandler "github.com/teruyoshi/todoApp/internal/features/todoCreate/handler"
	todoCreateRepoMysql "github.com/teruyoshi/todoApp/internal/features/todoCreate/repository/mysql"
	todoCreateUseCase "github.com/teruyoshi/todoApp/internal/features/todoCreate/usecase"
)

func RegisterTodoRoutes(r chi.Router) {
	dsn := fmt.Sprintf("%s:%s@tcp(db:3306)/%s?parseTime=true",
		os.Getenv("DATABASE_USER"),
		os.Getenv("DATABASE_PASSWORD"),
		os.Getenv("DATABASE_DBNAME"),
	)
	repo, err := todoCreateRepoMysql.NewTodoRepository(dsn)
	if err != nil {
		panic(err)
	}
	if err := repo.AutoMigrate(&todoCreateRepoMysql.TTodo{}); err != nil {
		panic(err)
	}
	uc := todoCreateUseCase.NewTodoCreateUseCase(repo)
	handler := todoCreateHandler.NewTodoCreateHandler(uc)

	r.Post("/todos/", handler.Create)
}
