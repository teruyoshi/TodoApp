import React from 'react'
import { TodoInput } from '@features/todoInputs'
import { Typography } from '@mui/material'

function TodoApp() {
  return (
    <>
      <Typography variant="h4">TODO管理アプリ</Typography>
      <TodoInput />
    </>
  )
}

export default TodoApp
