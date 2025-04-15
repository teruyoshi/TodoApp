import { DatePicker } from '@mui/x-date-pickers'
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form'

interface StandardDatePickerProps {
  name: string
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined
  children: string
}

function StandardDatePicker(props: StandardDatePickerProps) {
  const { name, rules, children } = props
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={children}
          sx={{ minWidth: '10em' }}
          slotProps={{ textField: { variant: 'standard', error: !!error, helperText: error?.message } }}
          {...field}
        />
      )}
    />
  )
}

export default StandardDatePicker
