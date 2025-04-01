import { TodoInputForm, TodoInputTitle } from '.'
import type { TodoInputFormInputs } from '.'

function TodoInput() {
  return (
    <>
      <TodoInputTitle />
      <TodoInputForm
        onSubmitHandler={(data: TodoInputFormInputs) => {
          console.log(data)
        }}
      />
    </>
  )
}

export default TodoInput
