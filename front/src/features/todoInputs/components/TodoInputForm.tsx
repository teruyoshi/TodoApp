import React from 'react'
import { HorizontalBottomAlignment } from '@components'
import {
  SubmitButton,
  TodoDescriptionTextField,
  TodoPeriodInputs,
  TodoTitleTextField,
} from './formParts'

function TodoInputForm() {
  return (
    <form>
      <HorizontalBottomAlignment gap={2}>
        <TodoTitleTextField />
        <TodoDescriptionTextField />
      </HorizontalBottomAlignment>
      <HorizontalBottomAlignment gap={2}>
        <TodoPeriodInputs />
        <SubmitButton />
      </HorizontalBottomAlignment>
    </form>
  )
}

export default TodoInputForm
