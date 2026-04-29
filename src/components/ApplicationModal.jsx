import { useState, useEffect } from "react";
import api from "../api/axios"


export default function ApplicationModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  initialData
}) {

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    status: "APPLIED",
    appliedDate: "",
    notes: ""
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        companyName: "",
        jobTitle: "",
        status: "APPLIED",
        appliedDate: "",
        notes: ""
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setSaving(true);

      if (initialData) {
        const response = await api.put(
          `/api/applications/${initialData.id}`,
          formData
        );

        onUpdate(response.data);

      } else {
          const response = await api.post(
            "/api/applications",
            formData
          );


        onCreate(response.data);
      }

      onClose();

    } catch (err) {
      console.error(err);
      setError("Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card text-white w-full max-w-lg rounded-2xl shadow-2xl p-8 border border-gray-800">

        <h2 className="text-2xl font-semibold mb-6">
          {initialData ? "Edit Application" : "Add Application"}
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Company */}
          <input
            type="text"
            name="companyName"
            placeholder="Company"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full bg-[#0f172a] text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            required
          />

          {/* Role */}
          <input
            type="text"
            name="jobTitle"
            placeholder="Role"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full bg-[#0f172a] text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            required
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-[#0f172a] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          >
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            style={{ colorScheme: "dark" }}
            className="w-full bg-[#0f172a] text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            required
          />

          {/* Notes */}
          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows={4}
            className="w-full bg-[#0f172a] text-white placeholder-gray-400 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
