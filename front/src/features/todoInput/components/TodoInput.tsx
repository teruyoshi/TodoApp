import { TodoInputForm, TodoInputTitle } from '.'
import type { TodoInputFormInputs } from '.'
import { useCreateTodoMutation } from '../api'

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
