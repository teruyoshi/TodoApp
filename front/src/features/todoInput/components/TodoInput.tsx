import { useCreateTodoMutation } from '../api'

import { TodoInputForm, TodoInputTitle } from '.'
import type { TodoInputFormInputs } from '.'

function TodoInput() {
  const [createTodo] = useCreateTodoMutation()
  return (
    <>
      <TodoInputTitle />
      <TodoInputForm
        onSubmitHandler={(data: TodoInputFormInputs) => {
          createTodo(data)
        }}
      />
    </>
  )
}

export default TodoInput
