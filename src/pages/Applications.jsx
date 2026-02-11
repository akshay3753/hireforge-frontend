import { useEffect, useState } from "react"
import axios from "axios"
import ApplicationModal from "../components/ApplicationModal"

function Applications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingApp, setEditingApp] = useState(null)

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
      console.log(error)
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

  const handleUpdate = (updatedApp) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === updatedApp.id ? updatedApp : app
      )
    )
  }

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return

    const token = localStorage.getItem("token")

    await axios.delete(
      `http://localhost:8080/api/applications/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    setApplications(prev => prev.filter(app => app.id !== id))
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">All Applications</h2>

        <button
          onClick={() => {
            setEditingApp(null)
            setIsModalOpen(true)
          }}
          className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
        >
          + Add Application
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-400">No applications yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-card p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-lg font-semibold">
                {app.companyName}
              </h3>

              <p className="text-gray-400 mt-1">
                {app.jobTitle}
              </p>

              <div className="mt-4 flex justify-between items-center">

                <span className="text-sm px-3 py-1 rounded-full bg-blue-600">
                  {app.status}
                </span>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {app.appliedDate}
                  </span>

                  <button
                    onClick={() => {
                      setEditingApp(app)
                      setIsModalOpen(true)
                    }}
                    className="text-blue-400 text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(app.id)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingApp(null)
        }}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        initialData={editingApp}
      />

    </div>
  )
}

export default Applications
