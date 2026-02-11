import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        name,
        email,
        password
      })
      navigate('/')
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input placeholder='Name' onChange={e => setName(e.target.value)} />
      <input placeholder='Email' onChange={e => setEmail(e.target.value)} />
      <input placeholder='Password' type='password' onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
