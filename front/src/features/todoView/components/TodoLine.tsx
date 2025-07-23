import { ListItem, ListItemText } from '@mui/material'
import { Todo } from '.'
import { TodoTitle } from './parts'

interface TodoLineProps {
  todo: Todo
}

function TodoLine({ todo }: TodoLineProps) {
  return (
    <ListItem>
      <TodoTitle>{todo.todoTitle}</TodoTitle>
      <ListItemText>{todo.todoDescription}</ListItemText>
    </ListItem>
  )
}

export default TodoLine
