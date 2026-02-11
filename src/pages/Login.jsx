import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log("LOGIN BUTTON CLICKED")

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        { email, password }
      )

      console.log('JWT:', response.data)

      // IMPORTANT: backend returns plain text
      localStorage.setItem('token', response.data)

      navigate('/dashboard')

     } catch (error) {
        console.log("ERROR OBJECT:", error);
        console.log("ERROR MESSAGE:", error.message);
        console.log("ERROR RESPONSE:", error.response);
        console.log("ERROR STATUS:", error.response?.status);
        console.log("ERROR DATA:", error.response?.data);
        alert("Login failed");
      }

  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
