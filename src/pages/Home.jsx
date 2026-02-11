import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="min-h-screen bg-dark text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-gray-800">
        <h1 className="text-xl font-bold">HireForge</h1>

        <div className="space-x-6">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
          <Link
            to="/login"
            className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center mt-32 px-6">
        <h2 className="text-5xl font-bold mb-6">
          Track Your Job Applications
        </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          A clean, minimal dashboard to manage your job search like a pro.
        </p>

        <Link
          to="/login"
          className="bg-purple-600 px-6 py-3 rounded-xl text-lg hover:bg-purple-700"
        >
          Start Now
        </Link>
      </div>

    </div>
  )
}

export default Home
