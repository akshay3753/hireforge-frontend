import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220]">
      <div className="bg-[#111827] p-8 rounded-2xl shadow-2xl w-96 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back
        </h2>

        <input
          className="w-full mb-4 px-4 py-2 rounded-lg bg-[#1f2937] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-6 px-4 py-2 rounded-lg bg-[#1f2937] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-white font-semibold transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
