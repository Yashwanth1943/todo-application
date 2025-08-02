import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './component/LoginPage'
import Todos from './component/Todos'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
