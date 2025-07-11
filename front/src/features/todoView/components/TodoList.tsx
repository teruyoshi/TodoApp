import { TodoListTitle, Todos } from '.'

interface Todo {
  id: number
  title: string
  description: string
}

function TodoList() {
  const todos: Todo[] = [
    { id: 1, title: '国語の勉強', description: '音読と漢字の宿題' },
    { id: 2, title: '数学の勉強', description: '計算ドリル' },
    { id: 3, title: '英語の勉強', description: '単語帳の暗記' },
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
