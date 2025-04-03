import { LeftMarginIndentBox } from '@/components'
import { TodoInput } from '@/features/todoInput'
import { Typography } from '@mui/material'

function TodoApp() {
  return (
    <>
      <Typography variant="h4">TODO管理アプリ</Typography>
      <LeftMarginIndentBox level={1}>
        <TodoInput />
      </LeftMarginIndentBox>
    </>
  )
}

export default TodoApp
