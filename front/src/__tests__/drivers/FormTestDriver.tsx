import { FormProvider, useForm } from 'react-hook-form'

interface FormTestDriverProps {
  defaultValues?: object
  onSubmitHandler?: (data: any) => void
  spyOnError?: (errors: any) => void
  children: React.ReactNode
}

function FormTestDriver(props: FormTestDriverProps) {
  const { defaultValues, onSubmitHandler, spyOnError, children } = props
  const methods = useForm({ mode: 'onChange', defaultValues })
  const {
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmitHandler && onSubmitHandler(data)
        })}
      >
        {children}
        <button
          type="submit"
          onClick={() => {
            spyOnError && spyOnError(errors)
          }}
        >
          送信
        </button>
      </form>
    </FormProvider>
  )
}

export default FormTestDriver
