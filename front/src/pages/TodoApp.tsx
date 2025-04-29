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
      <LeftMarginIndentBox level={1}>
        <Typography variant="h5">TODOリスト</Typography>
      </LeftMarginIndentBox>
    </>
  )
}

export default TodoApp
