import { TodoListTitle, ListedTodos } from '.'
import { useFetchTodosQuery } from '../api/todoListApi'

interface Todo {
  id: number
  todoTitle: string
  todoDescription: string
}

type Todos = Todo[]

function TodoList() {
  const { data } = useFetchTodosQuery()

  return (
    <>
      <TodoListTitle />
      {data && <ListedTodos>{data}</ListedTodos>}
    </>
  )
}

export default TodoList
export type { Todo, Todos }
