import { Box } from '@mui/material'
import { TodoPeriodFromInput, TodoPeriodToInput } from './period'

interface TodoPeriodInputsProps {
  name: string
}

function TodoPeriodInputs(props: TodoPeriodInputsProps) {
  const { name } = props
  return (
    <>
      <TodoPeriodFromInput name={`${name}From`} />
      <Box sx={{ textAlign: 'center' }}>～</Box>
      <TodoPeriodToInput name={`${name}To`} />
    </>
  )
}

export default TodoPeriodInputs
