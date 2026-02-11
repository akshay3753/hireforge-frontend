import { useEffect, useState } from "react"
import api from "../api/axios"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

function Analytics() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/applications")
        setApplications(response.data.content)
      } catch (error) {
        console.log("Error fetching analytics data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const statusCounts = [
    { name: "Applied", value: applications.filter(a => a.status === "APPLIED").length },
    { name: "Interview", value: applications.filter(a => a.status === "INTERVIEW").length },
    { name: "Offer", value: applications.filter(a => a.status === "OFFER").length },
    { name: "Rejected", value: applications.filter(a => a.status === "REJECTED").length },
  ]

  const COLORS = ["#3b82f6", "#eab308", "#22c55e", "#ef4444"]

  if (loading) {
    return <div className="text-gray-400 text-center mt-20">Loading analytics...</div>
  }

  if (applications.length === 0) {
    return <div className="text-gray-400 text-center mt-20">No analytics data yet.</div>
  }

  return (
    <div className="space-y-10">
      <h2 className="text-2xl font-semibold">Analytics Overview</h2>

      <div className="grid md:grid-cols-2 gap-10">

        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800">
          <h3 className="mb-4 text-lg font-medium">Application Status</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusCounts}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl shadow-xl border border-gray-800">
          <h3 className="mb-4 text-lg font-medium">Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusCounts}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {statusCounts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  )
}

export default Analytics
