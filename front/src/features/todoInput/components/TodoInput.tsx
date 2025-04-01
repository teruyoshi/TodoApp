import { TodoInputForm, TodoInputTitle } from '.'

function TodoInput() {
  return (
    <>
      <TodoInputTitle />
      <TodoInputForm
        onSubmitHandler={() => {
          console.log('submit')
        }}
      />
    </>
  )
}

export default TodoInput
