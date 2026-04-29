import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setSaving(true);
      await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.code === "ERR_NETWORK") {
        setError("Backend is not running. Start the backend on port 8080, then try again.");
      } else {
        setError(err.response?.data?.message || err.response?.data?.error || "Registration failed.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b1220] px-4">
      <div className="bg-[#111827] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Start tracking your applications
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-950/40 border border-red-900 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="w-full px-4 py-3 rounded-lg bg-[#1f2937] text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-lg text-white font-semibold transition disabled:opacity-50"
          >
            {saving ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
