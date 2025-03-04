package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func main() {
	router := chi.NewRouter()

	// CORS の設定
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"}, // 許可するオリジンを指定
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // キャッシュの有効期限
	}))

	router.Route("/api/v1", func(r chi.Router) {
		router.Get("/test", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("Hello World\n"))
			w.WriteHeader(http.StatusOK)
		})
	})

	srv := &http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			fmt.Println("サーバー起動に失敗しました: %v", err)
		}
	}()
}
