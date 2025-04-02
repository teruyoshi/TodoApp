import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { Controller, useFormContext } from 'react-hook-form'
import { useState } from 'react'

interface StandardDatePickerProps {
  name: string
  children: string
}

function StandardDatePicker(props: StandardDatePickerProps) {
  const { name, children } = props
  const { control, getValues } = useFormContext()
  const [value, setValue] = useState(getValues(name))

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <DatePicker
          label={children}
          sx={{ minWidth: '10em' }}
          slotProps={{ textField: { variant: 'standard' } }}
          {...field}
        />
      )}
    />
  )
}

export default StandardDatePicker
