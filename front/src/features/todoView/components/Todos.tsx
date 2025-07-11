import { List } from '@mui/material'
import { Todo, TodoLine } from '.'

function Todos({ children: todos }: { children: Todo[] }) {
  return (
    <List>
      {todos.map((todo) => (
        <TodoLine key={todo.id} todo={todo} />
      ))}
    </List>
  )
}

export default Todos
