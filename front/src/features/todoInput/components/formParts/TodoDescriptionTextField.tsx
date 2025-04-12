import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

interface TodoDescriptionTextFieldProps {
  name: string
}

function TodoDescriptionTextField(props: TodoDescriptionTextFieldProps) {
  const { name } = props
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: '説明を入力してください' }}
      render={({ field }) => (
        <TextField
          sx={{ width: '100%' }}
          label="説明"
          variant="filled"
          rows={3}
          multiline
          {...field}
        />
      )}
    />
  )
}

export default TodoDescriptionTextField
