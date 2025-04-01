import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface TodoTitleTextFieldProps {
  name: string
}

function TodoTitleTextField(props: TodoTitleTextFieldProps) {
  const { name } = props
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField label="タイトル" variant="standard" {...field} />
      )}
    />
  )
}

export default TodoTitleTextField
