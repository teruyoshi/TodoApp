import {
  LeftMarginIndentBox,
  HorizontalBottomAlignmentBox,
  VerticalBox,
} from '@components'
import {
  SubmitButton,
  TodoDescriptionTextField,
  TodoPeriodInputs,
  TodoTitleTextField,
} from './formParts'
import { Box } from '@mui/material'
import { fitContentHorizontalSx } from '@styles'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'

export interface TodoInputFormInputs {
  title: string
  description: string
  dateFrom: string
  dateTo: string
}

interface TodoInputFormProps {
  onSubmitHandler: (data: TodoInputFormInputs) => void
}

function TodoInputForm(props: TodoInputFormProps) {
  const { onSubmitHandler } = props
  const { handleSubmit } = useForm<TodoInputFormInputs>({
    defaultValues: {
      title: '',
      description: '',
      dateFrom: dayjs().format('YYYY/MM/DD'),
      dateTo: dayjs().format('YYYY/MM/DD'),
    },
  })

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler(data)
      })}
    >
      <LeftMarginIndentBox level={1}>
        <VerticalBox gap={3} sx={fitContentHorizontalSx}>
          <Box sx={fitContentHorizontalSx}>
            <TodoTitleTextField />
          </Box>
          <TodoDescriptionTextField />
          <HorizontalBottomAlignmentBox gap={2} sx={fitContentHorizontalSx}>
            <TodoPeriodInputs />
          </HorizontalBottomAlignmentBox>
          <SubmitButton />
        </VerticalBox>
      </LeftMarginIndentBox>
    </form>
  )
}

export default TodoInputForm
