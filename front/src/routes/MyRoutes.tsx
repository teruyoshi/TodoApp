import React from 'react'
import { Route, Routes } from 'react-router'

function MyRoutes() {
  return (
    <Routes>
      <Route path="/todo" element={<div>TODO リスト</div>} />
    </Routes>
  )
}

export default MyRoutes
