package handler

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"reflect"
	"strings"
	"testing"

	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	"github.com/teruyoshi/todoApp/internal/features/todos/usecase"
)

type stubCreator struct {
	execFunc func(t entity.Todo) (entity.Todo, error)
}

type stubFetcher struct {
	execFunc func() ([]entity.Todo, error)
}

func (s stubCreator) Execute(t entity.Todo) (entity.Todo, error) {
	return s.execFunc(t)
}

func (s stubFetcher) Execute() ([]entity.Todo, error) {
	return s.execFunc()
}

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

func newHandler(creator usecase.TodoCreator, fetcher interface {
	Execute() ([]entity.Todo, error)
}) *TodoHandler {
	return NewTodoHandler(creator, fetcher)
}

func TestCreate(t *testing.T) {
	t.Run("Todo の作成が成功する", func(t *testing.T) {
		todo := entity.Todo{TodoTitle: "title", TodoDescription: "desc"}
		h := newHandler(stubCreator{execFunc: func(todoValue entity.Todo) (entity.Todo, error) {
			if todoValue != todo {
				t.Errorf("unexpected input: %v", todoValue)
			}
			return todo, nil
		}}, stubFetcher{execFunc: func() ([]entity.Todo, error) {
			return []entity.Todo{{}, {}}, nil
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
	})

	t.Run("Todo 作成の際に不正な JSON が指定されるとエラーする", func(t *testing.T) {
		h := newHandler(stubCreator{execFunc: func(t entity.Todo) (entity.Todo, error) {
			return entity.Todo{}, nil
		}}, stubFetcher{execFunc: func() ([]entity.Todo, error) {
			return []entity.Todo{{}, {}}, nil
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
	})

	t.Run("Todo 作成の際に UseCase がエラーするとエラーする", func(t *testing.T) {
		h := newHandler(stubCreator{execFunc: func(t entity.Todo) (entity.Todo, error) {
			return entity.Todo{}, errors.New("db error")
		}}, stubFetcher{execFunc: func() ([]entity.Todo, error) {
			return []entity.Todo{{}, {}}, nil
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
	})

	t.Run("Todo 作成の際にエンコーディングに失敗するとエラーする", func(t *testing.T) {
		todo := entity.Todo{TodoTitle: "title"}
		h := newHandler(stubCreator{execFunc: func(t entity.Todo) (entity.Todo, error) {
			return todo, nil
		}}, stubFetcher{execFunc: func() ([]entity.Todo, error) {
			return []entity.Todo{{}, {}}, nil
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
	})
}

func TestFetch(t *testing.T) {
	t.Run("Todo の取得が成功する", func(t *testing.T) {
		todos := []entity.Todo{
			{TodoTitle: "国語の勉強", TodoDescription: "音読と漢字の宿題"},
			{TodoTitle: "数学の勉強", TodoDescription: "計算ドリル"},
			{TodoTitle: "英語の勉強", TodoDescription: "単語帳の暗記"},
		}
		h := newHandler(
			stubCreator{execFunc: func(todoValue entity.Todo) (entity.Todo, error) {
				return todos[0], nil
			}},
			stubFetcher{execFunc: func() ([]entity.Todo, error) {
				return todos, nil
			}},
		)

		req := httptest.NewRequest(http.MethodGet, "/todos", nil)
		w := httptest.NewRecorder()

		h.Fetch(w, req)

		if w.Code != http.StatusOK {
			t.Fatalf("expected status 200, got %d", w.Code)
		}

		if got := w.Header().Get("Content-Type"); got != "application/json" {
			t.Fatalf("unexpected content type: %s", got)
		}

		var resp []entity.Todo
		if err := json.NewDecoder(w.Body).Decode(&resp); err != nil {
			t.Fatalf("failed to decode response: %v", err)
		}

		if !reflect.DeepEqual(resp, todos) {
			t.Fatalf("unexpected todo: %+v", resp)
		}
	})
}
