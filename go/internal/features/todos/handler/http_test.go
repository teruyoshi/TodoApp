package handler

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/repository"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

type stubRepo struct {
	createFunc func(t entity.Todo) (entity.Todo, error)
}

func (s stubRepo) Create(t entity.Todo) (entity.Todo, error) {
	return s.createFunc(t)
}

// failingResponseWriter is used to simulate write failures
// to trigger JSON encoding errors.
type failingResponseWriter struct {
	header     http.Header
	statusCode int
	body       bytes.Buffer
}

func (w *failingResponseWriter) Header() http.Header {
	if w.header == nil {
		w.header = make(http.Header)
	}
	return w.header
}

func (w *failingResponseWriter) Write(b []byte) (int, error) {
	w.body.Write(b)
	return 0, errors.New("write error")
}

func (w *failingResponseWriter) WriteHeader(code int) {
	w.statusCode = code
}

func newHandler(repo repository.TodoRepository) *todoCreateHandler {
	uc := usecase.NewTodoCreateUseCase(repo)
	return NewTodoCreateHandler(uc)
}

func TestCreate_Success(t *testing.T) {
	todo := entity.Todo{TodoTitle: "title", TodoDescription: "desc"}
	h := newHandler(stubRepo{createFunc: func(t entity.Todo) (entity.Todo, error) {
		if t != todo {
			t.Errorf("unexpected input: %v", t)
		}
		return todo, nil
	}})

	body, _ := json.Marshal(todo)
	req := httptest.NewRequest(http.MethodPost, "/todos", bytes.NewReader(body))
	w := httptest.NewRecorder()

	h.Create(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", w.Code)
	}

	if got := w.Header().Get("Content-Type"); got != "application/json" {
		t.Fatalf("unexpected content type: %s", got)
	}

	var resp entity.Todo
	if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
		t.Fatalf("failed to decode response: %v", err)
	}

	if resp != todo {
		t.Fatalf("unexpected todo: %+v", resp)
	}
}

func TestCreate_InvalidJSON(t *testing.T) {
	h := newHandler(stubRepo{createFunc: func(t entity.Todo) (entity.Todo, error) {
		return entity.Todo{}, nil
	}})

	req := httptest.NewRequest(http.MethodPost, "/todos", bytes.NewBufferString("invalid"))
	w := httptest.NewRecorder()

	h.Create(w, req)

	if w.Code != http.StatusBadRequest {
		t.Fatalf("expected status 400, got %d", w.Code)
	}

	if !strings.Contains(w.Body.String(), "invalid json") {
		t.Fatalf("unexpected body: %s", w.Body.String())
	}
}

func TestCreate_UseCaseError(t *testing.T) {
	h := newHandler(stubRepo{createFunc: func(t entity.Todo) (entity.Todo, error) {
		return entity.Todo{}, errors.New("db error")
	}})

	todo := entity.Todo{TodoTitle: "title"}
	body, _ := json.Marshal(todo)
	req := httptest.NewRequest(http.MethodPost, "/todos", bytes.NewReader(body))
	w := httptest.NewRecorder()

	h.Create(w, req)

	if w.Code != http.StatusInternalServerError {
		t.Fatalf("expected status 500, got %d", w.Code)
	}

	if !strings.Contains(w.Body.String(), "failed to create todo") {
		t.Fatalf("unexpected body: %s", w.Body.String())
	}
}

func TestCreate_EncodingError(t *testing.T) {
	todo := entity.Todo{TodoTitle: "title"}
	h := newHandler(stubRepo{createFunc: func(t entity.Todo) (entity.Todo, error) {
		return todo, nil
	}})

	body, _ := json.Marshal(todo)
	req := httptest.NewRequest(http.MethodPost, "/todos", bytes.NewReader(body))
	w := &failingResponseWriter{}

	h.Create(w, req)

	if w.statusCode != http.StatusInternalServerError {
		t.Fatalf("expected status 500, got %d", w.statusCode)
	}

	if !strings.Contains(w.body.String(), "failed to encode json") {
		t.Fatalf("unexpected body: %s", w.body.String())
	}
}
