import { useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      message: "Great post!",
      status: "Pending",
    },
    {
      id: 2,
      name: "Sarah",
      message: "Very helpful content",
      status: "Approved",
    },
  ]);

  const handleDelete = (id) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleApprove = (id) => {
    setComments(
      comments.map((c) => (c.id === id ? { ...c, status: "Approved" } : c)),
    );
  };

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
            </tr>
          </thead>

          <tbody>
            {comments.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.message}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      c.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-3 flex gap-3">
                  {c.status !== "Approved" && (
                    <button
                      onClick={() => handleApprove(c.id)}
                      className="text-green-600"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(c.id)}
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
