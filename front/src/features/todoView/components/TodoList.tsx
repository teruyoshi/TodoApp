import { List, ListItem, ListItemText } from '@mui/material'
import { TodoListTitle } from '.'

function TodoList() {
  return (
    <>
      <TodoListTitle />
      <List>
        <ListItem>
          <ListItemText primary="国語の勉強" />
        </ListItem>
        <ListItem>
          <ListItemText primary="数学の勉強" />
        </ListItem>
        <ListItem>
          <ListItemText primary="英語の勉強" />
        </ListItem>
      </List>
    </>
  )
}

export default TodoList
