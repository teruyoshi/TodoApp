import { StandardDatePicker } from '@components'

interface TodoPeriodFromtInputProps {
  name: string
}

function TodoPeriodFromInput(props: TodoPeriodFromtInputProps) {
  const { name } = props
  return <StandardDatePicker name={name}>開始日</StandardDatePicker>
}

export default TodoPeriodFromInput
