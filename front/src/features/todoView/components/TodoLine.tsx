import { ListItem, ListItemText } from '@mui/material'
import { Todo } from '.'
import { TodoTitle } from './parts'

interface TodoLineProps {
  todo: Todo
}

function TodoLine({ todo }: TodoLineProps) {
  return (
    <ListItem>
      <TodoTitle>{todo.title}</TodoTitle>
      <ListItemText>{todo.description}</ListItemText>
    </ListItem>
  )
}

export default TodoLine
