import React from 'react'
import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
  FieldErrors,
} from 'react-hook-form'

interface FormTestDriverProps<T extends FieldValues> {
  defaultValues?: UseFormProps<T>['defaultValues']
  onSubmitHandler?: (data: T) => void
  spyOnError?: (errors: FieldErrors<T>) => void
  children: React.ReactNode
}

function FormTestDriver<T extends FieldValues>(props: FormTestDriverProps<T>) {
  const { defaultValues, onSubmitHandler, spyOnError, children } = props
  const methods = useForm<T>({ mode: 'onChange', defaultValues })
  const {
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmitHandler?.(data)
        })}
      >
        {children}
        <button
          type="submit"
          onClick={() => {
            spyOnError?.(errors)
          }}
        >
          送信
        </button>
      </form>
    </FormProvider>
  )
}

export default FormTestDriver
