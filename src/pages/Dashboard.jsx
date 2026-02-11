import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    fetchApplications()
  }, [])

  // Analytics calculations
  const total = applications.length
  const interviews = applications.filter(a => a.status === "INTERVIEW").length
  const offers = applications.filter(a => a.status === "OFFER").length

  return (
    <div className="min-h-screen bg-background text-white p-8">

      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">
        HireForge Dashboard
      </h1>

      <p className="text-gray-400 mb-8">
        Track and manage your job applications
      </p>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-card p-6 rounded-xl shadow-md">
          <p className="text-gray-400 text-sm">Total Applications</p>
          <h3 className="text-3xl font-bold mt-2">{total}</h3>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-md">
          <p className="text-gray-400 text-sm">Interviews</p>
          <h3 className="text-3xl font-bold mt-2">{interviews}</h3>
        </div>

        <div className="bg-card p-6 rounded-xl shadow-md">
          <p className="text-gray-400 text-sm">Offers</p>
          <h3 className="text-3xl font-bold mt-2">{offers}</h3>
        </div>

      </div>

      {/* Applications Section */}
      {loading ? (
        <p className="text-gray-400">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No applications yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-lg font-semibold">
                {app.companyName}
              </h3>

              <p className="text-gray-400">
                {app.jobTitle}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm px-3 py-1 rounded-full bg-purple-600">
                  {app.status}
                </span>

                <span className="text-xs text-gray-500">
                  {app.appliedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Dashboard
