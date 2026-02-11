import { useEffect, useState } from "react"
import axios from "axios"
import ApplicationModal from "../components/ApplicationModal"

function Dashboard() {

  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token")

      const response = await axios.get(
        "http://localhost:8080/api/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setApplications(response.data.content)
    } catch (error) {
      console.log("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleCreate = (newApp) => {
    setApplications(prev => [newApp, ...prev])
  }

  const total = applications.length
  const interviews = applications.filter(a => a.status === "INTERVIEW").length
  const offers = applications.filter(a => a.status === "OFFER").length

  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-600"
      case "INTERVIEW":
        return "bg-yellow-500 text-black"
      case "OFFER":
        return "bg-green-600"
      case "REJECTED":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const formatStatus = (status) =>
    status.charAt(0) + status.slice(1).toLowerCase()

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-wide">
            Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Track and manage your job applications
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition"
        >
          + Add Application
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Total Applications</p>
          <h3 className="text-3xl font-bold mt-2">{total}</h3>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Interviews</p>
          <h3 className="text-3xl font-bold mt-2">{interviews}</h3>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-xl border border-gray-800">
          <p className="text-gray-400 text-sm">Offers</p>
          <h3 className="text-3xl font-bold mt-2">{offers}</h3>
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No applications yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-card p-6 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-800"
            >
              <h3 className="text-lg font-semibold">
                {app.companyName}
              </h3>

              <p className="text-gray-400 mt-1">
                {app.jobTitle}
              </p>

              <div className="mt-5 flex justify-between items-center">

                <span
                  className={`text-sm px-3 py-1 rounded-full ${getStatusColor(app.status)}`}
                >
                  {formatStatus(app.status)}
                </span>

                <span className="text-xs text-gray-400">
                  {app.appliedDate}
                </span>

              </div>
            </div>
          ))}
        </div>
      )}

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreate}
      />

    </div>
  )
}

export default Dashboard
