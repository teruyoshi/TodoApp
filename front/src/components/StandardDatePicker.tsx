import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'

interface StandardDatePickerProps {
  children: string
}

function StandardDatePicker(props: StandardDatePickerProps) {
  const { children } = props

  return (
    <DatePicker
      label={children}
      slotProps={{ textField: { variant: 'standard' } }}
    />
  )
}

export default StandardDatePicker
