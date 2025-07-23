import { TodoListTitle, ListedTodos } from '.'
import { useFetchTodosQuery } from '../api/todoListApi'

interface Todo {
  id: number
  todoTitle: string
  todoDescription: string
}

type Todos = Todo[]

function TodoList() {
  // const todos: Todos = [
  //   { id: 1, title: '国語の勉強', description: '音読と漢字の宿題' },
  //   { id: 2, title: '数学の勉強', description: '計算ドリル' },
  //   { id: 3, title: '英語の勉強', description: '単語帳の暗記' },
  // ]
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
