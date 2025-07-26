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
      rules={{
        required: 'タイトルを入力してください',
        maxLength: {
          value: 20,
          message: 'タイトルは20文字以内で入力してください',
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          label="タイトル"
          variant="standard"
          error={!!error}
          helperText={error?.message}
          {...field}
        />
      )}
    />
  )
}

export default TodoTitleTextField
