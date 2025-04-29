import { StandardDatePicker } from '@/components'

interface TodoPeriodFromtInputProps {
  name: string
}

function TodoPeriodFromInput(props: TodoPeriodFromtInputProps) {
  const { name } = props
  return <StandardDatePicker name={name} rules={{ required: '開始日を入力してください' }}>開始日</StandardDatePicker>
}

export default TodoPeriodFromInput
