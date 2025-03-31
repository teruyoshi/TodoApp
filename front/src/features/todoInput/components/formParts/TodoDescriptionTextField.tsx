import { TextField } from '@mui/material'

function TodoDescriptionTextField() {
  return (
    <TextField
      sx={{ width: '100%' }}
      label="説明"
      variant="filled"
      rows={3}
      multiline
    />
  )
}

export default TodoDescriptionTextField
