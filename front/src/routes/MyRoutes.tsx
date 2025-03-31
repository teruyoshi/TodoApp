import TodoApp from '../pages/TodoApp'
import { Route, Routes } from 'react-router'

function MyRoutes() {
  return (
    <Routes>
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  )
}

export default MyRoutes
