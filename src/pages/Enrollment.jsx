import { useEffect, useState } from "react";
import api from "../api/axios";

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get("/enrollments");
      setEnrollments(res.data.enrollments || []);
    } catch (error) {
      console.error("Failed to fetch enrollments:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveEnrollment = async (id) => {
    try {
      await api.patch(`/enrollments/${id}/approve`);
      await fetchEnrollments();
    } catch (error) {
      console.error("Failed to approve enrollment:", error);
      alert(error.response?.data?.message || "Failed to approve enrollment.");
    }
  };

  const rejectEnrollment = async (id) => {
    try {
      await api.patch(`/enrollments/${id}/reject`);
      await fetchEnrollments();
    } catch (error) {
      console.error("Failed to reject enrollment:", error);
      alert(error.response?.data?.message || "Failed to reject enrollment.");
    }
  };

  const deleteEnrollment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enrollment?")) {
      return;
    }

    try {
      await api.delete(`/enrollments/${id}`);
      await fetchEnrollments();
    } catch (error) {
      console.error("Failed to delete enrollment:", error);
      alert(error.response?.data?.message || "Failed to delete enrollment.");
    }
  };

  const filteredEnrollments = enrollments.filter((enrollment) => {
    const searchTerm = search.toLowerCase();

    return (
      enrollment.fullName?.toLowerCase().includes(searchTerm) ||
      enrollment.email?.toLowerCase().includes(searchTerm) ||
      enrollment.program?.toLowerCase().includes(searchTerm) ||
      enrollment.country?.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading enrollments...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Enrollments</h1>
          <p className="text-gray-500">
            Manage program enrollment applications.
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">
          {enrollments.length} Total
        </span>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, program or country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-300 p-3 rounded-lg mb-6 outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Empty State */}
      {filteredEnrollments.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500">No enrollments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnrollments.map((item) => (
            <div
              key={item._id}
              className="bg-white border rounded-xl shadow-sm p-5"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-lg font-bold">{item.fullName}</h2>

                  <p className="text-gray-600">{item.email}</p>

                  <p className="text-gray-600">{item.phone}</p>
                </div>

                {/* Status */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status
                    ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
                    : "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4 mt-5 text-sm">
                <div>
                  <strong>Program:</strong> {item.program || "N/A"}
                </div>

                <div>
                  <strong>Experience:</strong> {item.experienceLevel || "N/A"}
                </div>

                <div>
                  <strong>Country:</strong> {item.country || "N/A"}
                </div>

                <div>
                  <strong>State:</strong> {item.state || "N/A"}
                </div>

                <div>
                  <strong>Gender:</strong> {item.gender || "N/A"}
                </div>

                <div>
                  <strong>Age:</strong> {item.age || "N/A"}
                </div>

                <div>
                  <strong>Organization:</strong> {item.organization || "N/A"}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <strong>Message:</strong>
                <p className="mt-1 text-gray-600">{item.message}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-5 flex-wrap">
                {item.status !== "approved" && (
                  <button
                    onClick={() => approveEnrollment(item._id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Approve
                  </button>
                )}

                {item.status !== "rejected" && (
                  <button
                    onClick={() => rejectEnrollment(item._id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                  >
                    Reject
                  </button>
                )}

                <button
                  onClick={() => deleteEnrollment(item._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Enrollments;
