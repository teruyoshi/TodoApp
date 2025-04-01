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

interface TodoInputFormProps {
  onSubmitHandler: () => void
}

function TodoInputForm(props: TodoInputFormProps) {
  const { onSubmitHandler } = props
  const { handleSubmit } = useForm()
  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmitHandler()
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
