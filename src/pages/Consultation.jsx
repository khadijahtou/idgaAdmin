import { useState, useEffect } from "react";
import api from "../api/axios";

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchConsultations();
  }, []);

  // Fetch consultations from backend
  const fetchConsultations = async () => {
    try {
      const res = await api.get("/consultations");

      setConsultations(res.data.consultations || []);
    } catch (error) {
      console.error(
        "Failed to fetch consultations:",
        error.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Approve consultation
  const approve = async (id) => {
    try {
      await api.patch(`/consultations/${id}/approve`);

      fetchConsultations();
    } catch (error) {
      console.error(
        "Failed to approve consultation:",
        error.response?.data || error.message,
      );
    }
  };

  // Reject consultation
  const reject = async (id) => {
    try {
      await api.patch(`/consultations/${id}/reject`);

      fetchConsultations();
    } catch (error) {
      console.error(
        "Failed to reject consultation:",
        error.response?.data || error.message,
      );
    }
  };

  // Delete consultation
  const remove = async (id) => {
    if (!window.confirm("Delete this consultation?")) return;

    try {
      await api.delete(`/consultations/${id}`);

      fetchConsultations();
    } catch (error) {
      console.error(
        "Failed to delete consultation:",
        error.response?.data || error.message,
      );
    }
  };

  // Search consultations
  const filteredConsultations = consultations.filter((item) => {
    const searchTerm = search.toLowerCase();

    return (
      item.fullName?.toLowerCase().includes(searchTerm) ||
      item.email?.toLowerCase().includes(searchTerm) ||
      item.service?.toLowerCase().includes(searchTerm) ||
      item.organization?.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-white">Loading consultations...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Consultations</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, service or organization..."
        className="border p-3 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* No consultations */}
      {filteredConsultations.length === 0 && (
        <div className="bg-white p-6 rounded shadow">
          <p>No consultations found.</p>
        </div>
      )}

      {/* Consultation List */}
      <div className="space-y-4">
        {filteredConsultations.map((item) => (
          <div
            key={item._id}
            className="bg-white border p-5 rounded-xl shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h2 className="font-bold text-lg">{item.fullName}</h2>

                <p className="text-gray-600">{item.email}</p>

                <p className="text-gray-600">{item.phone}</p>
              </div>

              {/* Status */}
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  item.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : item.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Details */}
            <div className="mt-4 space-y-2">
              <p>
                <strong>Organization:</strong>{" "}
                {item.organization || "Not provided"}
              </p>

              <p>
                <strong>Service:</strong> {item.service}
              </p>

              <p>
                <strong>Message:</strong> {item.message}
              </p>

              <p className="text-sm text-gray-500">
                Submitted:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-5 flex-wrap">
              {item.status !== "approved" && (
                <button
                  onClick={() => approve(item._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Approve
                </button>
              )}

              {item.status !== "rejected" && (
                <button
                  onClick={() => reject(item._id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              )}

              <button
                onClick={() => remove(item._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Consultations;
