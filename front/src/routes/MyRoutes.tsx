import { Route, Routes } from 'react-router'

import TodoApp from '../pages/TodoApp'

function MyRoutes() {
  return (
    <Routes>
      <Route path="/todo" element={<TodoApp />} />
    </Routes>
  )
}

export default MyRoutes
