import { DatePicker } from '@mui/x-date-pickers'

interface StandardDatePickerProps {
  children: string
}

function StandardDatePicker(props: StandardDatePickerProps) {
  const { children } = props

  return (
    <DatePicker
      label={children}
      sx={{ minWidth: '10em' }}
      slotProps={{ textField: { variant: 'standard' } }}
    />
  )
}

export default StandardDatePicker
