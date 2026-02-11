import { useState } from "react"
import { useNavigate } from "react-router-dom"
import authService from "../api/authService" // Use the service we made!

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    try {
      // Use the authService logic which already uses the VITE_API_BASE_URL
      await authService.login(email, password)
      
      // If login is successful, authService already saved the token to localStorage
      navigate("/dashboard")

    } catch (err) {
      // Improved error message to catch specific backend responses
      const errorMessage = err.response?.data?.error || "Invalid email or password";
      setError(errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>
        
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-2 rounded-lg bg-[#1e293b] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-2 rounded-lg font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
