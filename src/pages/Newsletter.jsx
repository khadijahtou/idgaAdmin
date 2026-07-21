import { useEffect, useState } from "react";
import api from "../api/axios";

const Newsletter = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch subscribers from backend
  const fetchSubscribers = async () => {
    try {
      const res = await api.get("/newsletter");
      setSubs(res.data.subscribers || []);
    } catch (error) {
      console.error("Failed to fetch subscribers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Delete subscriber
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subscriber?")) return;

    try {
      await api.delete(`/newsletter/${id}`);

      // Refresh list after deletion
      fetchSubscribers();
    } catch (error) {
      console.error("Failed to delete subscriber:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p>Loading subscribers...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Newsletter</h2>

      <div className="bg-white shadow rounded overflow-hidden">
        {subs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg">No subscribers yet.</p>
            <p className="text-sm mt-2">
              Newsletter subscribers will appear here.
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subs.map((subscriber) => (
                <tr key={subscriber._id} className="border-t">
                  <td className="p-3">{subscriber.email}</td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        subscriber.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {subscriber.status === "active"
                        ? "Active"
                        : "Unsubscribed"}
                    </span>
                  </td>

                  <td className="p-3">
                    {new Date(subscriber.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(subscriber._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
