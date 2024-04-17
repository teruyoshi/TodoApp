import { useState } from 'react'
import AddTodoForm from './Components/AddTodoForm'
import Title from './Components/Title'
import TodoList from './Components/TodoList'

function App() {
  const [todos, setTodos] = useState([
      {text:'部屋掃除'},
      {text:'風呂掃除'},
      {text:'晩飯'}
  ])

  const addTodos = (todo:string) => {
    const newTodos = [...todos]
    newTodos.push({text:todo})
    setTodos(newTodos)
  }

  return (
    <>
      <Title />
      <AddTodoForm addTodos={addTodos} />
      <TodoList todos={todos} />
    </>
  )
}

export default App
