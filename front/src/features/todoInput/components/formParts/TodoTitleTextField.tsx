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
        validate: (value) => ((value.length <= 20) || 'タイトルは20文字以内で入力してください')
      }}
      render={({ field, fieldState: { error } }) => (
        <TextField label="タイトル" variant="standard" error={!!error} {...field} />
      )}
    />
  )
}

export default TodoTitleTextField
