import { useState, useEffect } from "react";
import api from "../api/axios";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add comment modal
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  // Form
  const [formData, setFormData] = useState({
    content: "",
    name: "",
    email: "",
    website: "",
    message: "",
    createdAt: "",
  });

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  // =========================
  // FETCH COMMENTS
  // =========================
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

  // =========================
  // FETCH BLOGS
  // =========================
  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);

      // Change this endpoint if your content route is different
      const res = await api.get("/content");

      const allContent = res.data.content || res.data.contents || [];

      // Only allow blogs
      const blogPosts = allContent.filter((item) => item.type === "blog");

      setBlogs(blogPosts);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  };

  // =========================
  // OPEN MODAL
  // =========================
  const handleOpenModal = () => {
    setShowModal(true);
    fetchBlogs();
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const handleCloseModal = () => {
    setShowModal(false);

    setFormData({
      content: "",
      name: "",
      email: "",
      website: "",
      message: "",
      createdAt: "",
    });
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CREATE BACKDATED COMMENT
  // =========================
  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (
      !formData.content ||
      !formData.name ||
      !formData.message ||
      !formData.createdAt
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/comments/admin", {
        content: formData.content,
        name: formData.name,
        email: formData.email,
        website: formData.website,
        message: formData.message,
        createdAt: new Date(formData.createdAt).toISOString(),
        status: "approved",
      });

      alert("Comment added successfully!");

      handleCloseModal();
      fetchComments();
    } catch (error) {
      console.error("Failed to create comment:", error);

      alert(error.response?.data?.message || "Failed to add comment.");
    } finally {
      setSubmitting(false);
    }
  };

  // =========================
  // DELETE COMMENT
  // =========================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await api.delete(`/comments/${id}`);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // APPROVE COMMENT
  // =========================
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
    <div className="relative">
      {/* =========================
          HEADER
      ========================= */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Comments</h2>

        <button
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
        >
          + Add Comment
        </button>
      </div>

      {/* =========================
          COMMENTS TABLE
      ========================= */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full min-w-225">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>

              <th className="p-3 text-left">Message</th>

              <th className="p-3 text-left">Post</th>

              <th className="p-3 text-left">Date</th>

              <th className="p-3 text-left">Status</th>

              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {comments.map((c) => (
              <tr key={c._id} className="border-t">
                {/* NAME */}
                <td className="p-3">{c.name}</td>

                {/* MESSAGE */}
                <td className="p-3 max-w-75">
                  <p className="truncate">{c.message}</p>
                </td>

                {/* POST */}
                <td className="p-3">{c.content?.title || "Unknown Post"}</td>

                {/* DATE */}
                <td className="p-3 whitespace-nowrap">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleDateString()
                    : "—"}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      c.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : c.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex gap-3">
                    {c.status !== "approved" && (
                      <button
                        onClick={() => handleApprove(c._id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {comments.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  No comments yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =========================
          ADD COMMENT MODAL
      ========================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white text-gray-800 w-full max-w-2xl rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h3 className="text-xl font-bold">Add Historical Comment</h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a comment with its original date.
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleCreateComment} className="p-6 space-y-5">
              {/* BLOG */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Blog Post *
                </label>

                <select
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loadingBlogs}
                >
                  <option value="">
                    {loadingBlogs ? "Loading blogs..." : "Select a blog"}
                  </option>

                  {blogs.map((blog) => (
                    <option key={blog._id} value={blog._id}>
                      {blog.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* NAME + EMAIL */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Commenter's name"
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Comment *
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write the comment..."
                  rows="5"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              {/* DATE */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Comment Date *
                </label>

                <input
                  type="datetime-local"
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <p className="text-xs text-gray-500 mt-2">
                  Choose the original date and time when this comment was
                  posted.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-3 border rounded-xl hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50"
                >
                  {submitting ? "Adding..." : "Add Comment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
