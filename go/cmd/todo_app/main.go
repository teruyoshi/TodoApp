package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	todoHandler "github.com/teruyoshi/todoApp/internal/features/todos/handler"
	todoCreateRepoMysql "github.com/teruyoshi/todoApp/internal/features/todos/repository/mysql"
	todoUseCase "github.com/teruyoshi/todoApp/internal/features/todos/usecase"
	routerPkg "github.com/teruyoshi/todoApp/internal/router"
)

func main() {
	fmt.Println("Starting Todo App...")

	router := chi.NewRouter()

	// CORS の設定
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173", "http://front:5173", "https://teruyoshi-todo-app.web.app"}, // 許可するオリジンを指定
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // キャッシュの有効期限
	}))
	fmt.Println("CORS middleware configured")

	// 依存関係の構築
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		os.Getenv("DATABASE_USER"),
		os.Getenv("DATABASE_PASSWORD"),
		os.Getenv("DATABASE_HOST"),
		os.Getenv("DATABASE_PORT"),
		os.Getenv("DATABASE_DBNAME"),
	)

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	repo := todoCreateRepoMysql.NewTodoRepository(db)
	if err := repo.AutoMigrate(&todoCreateRepoMysql.TTodo{}); err != nil {
		panic(err)
	}
	creator := todoUseCase.NewTodoCreateUseCase(repo)
	fetcher := todoUseCase.NewTodoFetchUseCase(repo)

	handler := todoHandler.NewTodoHandler(creator, fetcher)

	router.Route("/api/v1", func(r chi.Router) {
		r.Get("/test", func(w http.ResponseWriter, r *http.Request) {
			w.WriteHeader(http.StatusOK)
			_, err = w.Write([]byte("Hello World\n"))
			if err != nil {
				http.Error(w, "Failed to write response", http.StatusInternalServerError)
				return
			}
			fmt.Println("Test endpoint hit")
		})

		routerPkg.RegisterTodoRoutes(r, handler)
	})

	srv := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		fmt.Printf("サーバー起動に失敗しました: %v\n", err)
	}
}
