package router

import (
	"testing"

	"github.com/go-chi/chi/v5"
)

func TestRegisterTodoRoutes_PanicsOnInvalidDSN(t *testing.T) {
	t.Setenv("DATABASE_USER", "invalid")
	t.Setenv("DATABASE_PASSWORD", "invalid")
	t.Setenv("DATABASE_DBNAME", string(rune(0))) // cause invalid DSN
	r := chi.NewRouter()
	defer func() {
		if recover() == nil {
			t.Fatal("expected panic when repository initialization fails")
		}
	}()
	RegisterTodoRoutes(r)
}
