import { useState, useEffect } from "react";
import api from "../api/axios";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await api.get("/comments");

      setComments(res.data.comments);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await api.delete(`/comments/${id}`);

      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.patch(`/comments/${id}/approve`);

      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <p className="text-white">Loading comments...</p>;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Message</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
              <th className="p-3">Post</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.message}</td>
                <td className="p-3">{c.content?.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      c.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  {c.status !== "approved" && (
                    <button
                      onClick={() => handleApprove(c._id)}
                      className="text-green-600"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comments;
