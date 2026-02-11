import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", {
        name,
        email,
        password
      })

      navigate("/")
    } catch (err) {
      console.error("Registration failed:", err)
      alert("Registration failed")
    }
  }

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  )
}

export default Register
