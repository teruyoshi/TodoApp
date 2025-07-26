import { Box } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect } from 'react'

import { fitContentHorizontalSx } from '@/styles'
import { LeftMarginIndentBox, VerticalBox } from '@/components'

import {
  SubmitButton,
  TodoDescriptionTextField,
  TodoPeriodInputs,
  TodoTitleTextField,
} from './formParts'

export interface TodoInputFormInputs {
  title: string
  description: string
  dateFrom: Dayjs
  dateTo: Dayjs
}

interface TodoInputFormProps {
  onSubmitHandler: (data: TodoInputFormInputs) => void
}

function TodoInputForm(props: TodoInputFormProps) {
  const { onSubmitHandler } = props

  const methods = useForm<TodoInputFormInputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      dateFrom: dayjs(dayjs().format('YYYY/MM/DD')),
      dateTo: dayjs(dayjs().format('YYYY/MM/DD')),
    },
  })
  const { handleSubmit, formState, reset } = methods

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState])

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
            <TodoPeriodInputs name="date" />
            <SubmitButton />
          </VerticalBox>
        </LeftMarginIndentBox>
      </form>
    </FormProvider>
  )
}

export default TodoInputForm
