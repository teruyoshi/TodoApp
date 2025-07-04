
package mysql_test

import (
	"testing"
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/stretchr/testify/assert"
	"github.com/teruyoshi/todoApp/internal/features/todos/entity"
	mysqlRepo "github.com/teruyoshi/todoApp/internal/features/todos/repository/mysql"
	gorm_mysql "gorm.io/driver/mysql"
	"gorm.io/gorm"
)

func TestTodoRepository_Create(t *testing.T) {
	db, mock, err := sqlmock.New(sqlmock.QueryMatcherOption(sqlmock.QueryMatcherEqual))
	assert.NoError(t, err)
	defer db.Close()

	gormDB, err := gorm.Open(gorm_mysql.New(gorm_mysql.Config{
		Conn:                      db,
		SkipInitializeWithVersion: true,
	}), &gorm.Config{})
	assert.NoError(t, err)

	repo := mysqlRepo.New(gormDB)

	t.Run("should create a todo successfully", func(t *testing.T) {
		todo := entity.Todo{
			TodoTitle:       "Test Title",
			TodoDescription: "Test Description",
			TodoDateFrom:    time.Now().Format(time.RFC3339),
			TodoDateTo:      time.Now().Add(24 * time.Hour).Format(time.RFC3339),
		}

		mock.ExpectBegin()
		mock.ExpectExec("INSERT INTO `t_todos` (`title`,`description`,`date_from`,`date_to`) VALUES (?,?,?,?)").
			WithArgs(todo.TodoTitle, todo.TodoDescription, todo.TodoDateFrom, todo.TodoDateTo).
			WillReturnResult(sqlmock.NewResult(1, 1))
		mock.ExpectCommit()

		createdTodo, err := repo.Create(todo)

		assert.NoError(t, err)
		assert.Equal(t, todo.TodoTitle, createdTodo.TodoTitle)
		assert.NoError(t, mock.ExpectationsWereMet())
	})
}

func TestTodoRepository_Fetch(t *testing.T) {
	db, mock, err := sqlmock.New(sqlmock.QueryMatcherOption(sqlmock.QueryMatcherEqual))
	assert.NoError(t, err)
	defer db.Close()

	gormDB, err := gorm.Open(gorm_mysql.New(gorm_mysql.Config{
		Conn:                      db,
		SkipInitializeWithVersion: true,
	}), &gorm.Config{})
	assert.NoError(t, err)

	repo := mysqlRepo.New(gormDB)

	t.Run("should fetch todos successfully", func(t *testing.T) {
		rows := sqlmock.NewRows([]string{"id", "title", "description", "date_from", "date_to"}).
			AddRow(1, "Title 1", "Description 1", time.Now().Format(time.RFC3339), time.Now().Add(24*time.Hour).Format(time.RFC3339)).
			AddRow(2, "Title 2", "Description 2", time.Now().Format(time.RFC3339), time.Now().Add(48*time.Hour).Format(time.RFC3339))

		mock.ExpectQuery("SELECT * FROM `t_todos`").WillReturnRows(rows)

		todos, err := repo.Fetch()

		assert.NoError(t, err)
		assert.Len(t, todos, 2)
		assert.Equal(t, "Title 1", todos[0].TodoTitle)
		assert.NoError(t, mock.ExpectationsWereMet())
	})
}
