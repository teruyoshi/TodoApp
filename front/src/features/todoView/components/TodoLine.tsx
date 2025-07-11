import { ListItem } from '@mui/material'
import { Todo } from '.'
import { TodoTitle } from './parts'

interface TodoLineProps {
  todo: Todo
}

function TodoLine({ todo }: TodoLineProps) {
  return (
    <ListItem>
      <TodoTitle>{todo.title}</TodoTitle>
    </ListItem>
  )
}

export default TodoLine
