import { Typography } from '@mui/material'

import { LeftMarginIndentBox } from '@/components'
import { TodoInput } from '@/features/todoInput'
import { TodoList } from '@/features/todoView'

function TodoApp() {
  return (
    <>
      <Typography variant="h4">TODO管理アプリ</Typography>
      <LeftMarginIndentBox level={1}>
        <TodoInput />
      </LeftMarginIndentBox>
      <LeftMarginIndentBox level={1}>
        <TodoList />
      </LeftMarginIndentBox>
    </>
  )
}

export default TodoApp
