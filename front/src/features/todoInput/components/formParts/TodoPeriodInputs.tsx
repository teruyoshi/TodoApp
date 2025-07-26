import { Box, FormControl, FormHelperText } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useEffect } from 'react'

import { HorizontalBottomAlignmentBox } from '@/components'
import { fitContentHorizontalSx } from '@/styles'

import { TodoPeriodFromInput, TodoPeriodToInput } from './period'

interface TodoPeriodInputsProps {
  name: string
}

function TodoPeriodInputs(props: TodoPeriodInputsProps) {
  const { name } = props

  const {
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext()

  const from = watch(`${name}From`)
  const to = watch(`${name}To`)

  useEffect(() => {
    if (!(from && to)) {
      return
    }
    if (from.isAfter(to)) {
      setError(name, {
        type: 'custom',
        message: '終了日は開始日以前の日付にしてください',
      })
    } else {
      clearErrors(name)
    }
  }, [from, to, setError, clearErrors])

  return (
    <>
      <FormControl>
        <HorizontalBottomAlignmentBox gap={2} sx={fitContentHorizontalSx}>
          <TodoPeriodFromInput name={`${name}From`} />
          <Box sx={{ textAlign: 'center' }}>～</Box>
          <TodoPeriodToInput name={`${name}To`} />
        </HorizontalBottomAlignmentBox>
        {errors[name] && (
          <FormHelperText error={!!errors[name]}>
            {errors[name].message as string}
          </FormHelperText>
        )}
      </FormControl>
    </>
  )
}

export default TodoPeriodInputs
