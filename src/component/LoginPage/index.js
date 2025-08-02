import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./index.css"

const LoginPage = () => {
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === 'AnviRobotics') {
      navigate('/todos')
    } else {
      alert('Invalid password')
    }
  }

  return (
    <div className="cont">
    <div className="login-container">
      <h1 className="anvirobotics">Login with AnviRobotics</h1>
      <input
        className="text-input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn" onClick={handleLogin}>Login</button>
    </div>
    
      
    </div>
  )
}

export default LoginPage
