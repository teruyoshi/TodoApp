import { StandardDatePicker } from '@/components'

interface TodoPeriodToInputProps {
  name: string
}

function TodoPeriodToInput(props: TodoPeriodToInputProps) {
  const { name } = props

  return (
    <StandardDatePicker
      name={name}
      rules={{ required: '終了日を入力してください' }}
    >
      終了日
    </StandardDatePicker>
  )
}

export default TodoPeriodToInput
