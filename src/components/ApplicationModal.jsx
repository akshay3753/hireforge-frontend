import { useState } from "react";

export default function ApplicationModal({ isOpen, onClose, onCreate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Add Application</h2>

        <form className="space-y-4">
          <input
            type="text"
            placeholder="Company"
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Role"
            className="w-full border rounded-lg p-2"
          />

          <select className="w-full border rounded-lg p-2">
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <input
            type="date"
            className="w-full border rounded-lg p-2"
          />

          <textarea
            placeholder="Notes"
            className="w-full border rounded-lg p-2"
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-black text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
