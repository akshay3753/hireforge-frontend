import { Outlet, NavLink } from "react-router-dom"

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-gray-800 p-6 hidden md:flex flex-col">

        <h2 className="text-xl font-bold tracking-wide">
          HireForge
        </h2>

        <nav className="flex flex-col gap-3 mt-10">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            Applications
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            Analytics
          </NavLink>

        </nav>

      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-[#0f172a]">
          <h1 className="text-lg font-semibold tracking-wide">
            Admin Panel
          </h1>

          <button
            onClick={() => {
              localStorage.clear()
              window.location.href = "/login"
            }}
            className="text-sm text-red-400 hover:text-red-500 transition"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-10">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default MainLayout
