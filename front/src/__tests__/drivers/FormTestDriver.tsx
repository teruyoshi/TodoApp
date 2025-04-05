import { FormProvider, useForm } from "react-hook-form"

interface FormTestDriverProps {
  defaultValues?: Object
  children: React.ReactNode
}

function FormTestDriver(props: FormTestDriverProps) {
  const { defaultValues, children } = props
  const methods = useForm({ defaultValues })
  return (<FormProvider {...methods}>
    {children}
  </FormProvider>)
}

export default FormTestDriver