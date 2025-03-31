import { Box } from '@mui/material'
import { TodoPeriodFromInput, TodoPeriodToInput } from './period'

function TodoPeriodInputs() {
  return (
    <>
      <TodoPeriodFromInput />
      <Box sx={{ textAlign: 'center' }}>～</Box>
      <TodoPeriodToInput />
    </>
  )
}

export default TodoPeriodInputs
