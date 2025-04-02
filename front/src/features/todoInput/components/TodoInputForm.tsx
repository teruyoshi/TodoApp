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
import { FormProvider, useForm } from 'react-hook-form'
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
  const methods = useForm<TodoInputFormInputs>({
    defaultValues: {
      title: '',
      description: '',
      dateFrom: dayjs().format('YYYY/MM/DD'),
      dateTo: dayjs().format('YYYY/MM/DD'),
    },
  })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmitHandler(data)
        })}
      >
        <LeftMarginIndentBox level={1}>
          <VerticalBox gap={3} sx={fitContentHorizontalSx}>
            <Box sx={fitContentHorizontalSx}>
              <TodoTitleTextField name="title" />
            </Box>
            <TodoDescriptionTextField name="description" />
            <HorizontalBottomAlignmentBox gap={2} sx={fitContentHorizontalSx}>
              <TodoPeriodInputs />
            </HorizontalBottomAlignmentBox>
            <SubmitButton />
          </VerticalBox>
        </LeftMarginIndentBox>
      </form>
    </FormProvider>
  )
}

export default TodoInputForm
