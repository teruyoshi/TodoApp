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
      rules={{
        required: '説明を入力してください',
        maxLength: {
          value: 200,
          message: '説明は200文字以内で入力してください',
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ width: '100%' }}
          label="説明"
          variant="filled"
          rows={3}
          multiline
          error={!!error}
          helperText={error?.message}
          {...field}
        />
      )}
    />
  )
}

export default TodoDescriptionTextField
