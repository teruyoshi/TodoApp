import { TodoListTitle, Todos } from '.'

interface Todo {
  id: number
  title: string
}

function TodoList() {
  const todos: Todo[] = [
    { id: 1, title: '国語の勉強' },
    { id: 2, title: '数学の勉強' },
    { id: 3, title: '英語の勉強' },
  ]

  return (
    <>
      <TodoListTitle />
      <Todos>{todos}</Todos>
    </>
  )
}

export default TodoList
export type { Todo }
