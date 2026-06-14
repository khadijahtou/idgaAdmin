import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContentList = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("blog");
  const [search, setSearch] = useState("");

  const [content] = useState([
    {
      id: 1,
      title: "AI in Education",
      type: "blog",
      status: "Published",
      date: "2026-06-01",
    },
    {
      id: 2,
      title: "E-commerce Platform",
      type: "project",
      status: "Draft",
      date: "2026-05-20",
    },
    {
      id: 3,
      title: "Digital Marketing Tips",
      type: "blog",
      status: "Draft",
      date: "2026-05-10",
    },
  ]);

  const filteredContent = content
    .filter((item) => item.type === activeTab)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id) => {
    console.log("Delete:", id);
  };

  const totalBlogs = content.filter((item) => item.type === "blog").length;

  const totalProjects = content.filter(
    (item) => item.type === "project",
  ).length;

  const totalPublished = content.filter(
    (item) => item.status === "Published",
  ).length;

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">
            Content Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage blogs and projects published on IDGA
          </p>
        </div>

        <button
          onClick={() => navigate("/content/create")}
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-2xl
            shadow-lg
            transition
            font-medium
          "
        >
          + New Content
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500">Total Content</p>
          <h2 className="text-3xl font-bold mt-2">{content.length}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500">Blogs</p>
          <h2 className="text-3xl font-bold mt-2">{totalBlogs}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500">Projects</p>
          <h2 className="text-3xl font-bold mt-2">{totalProjects}</h2>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition">
          <p className="text-sm text-gray-500">Published</p>
          <h2 className="text-3xl font-bold mt-2">{totalPublished}</h2>
        </div>
      </div>

      {/* Search + Tabs */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-3 sm:p-5">
        <div className="flex flex-row lg:flex-row gap-4 justify-between">
          <input
            type="text"
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              flex-1
              border
              border-gray-200
              rounded-2xl
              px-5
              py-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <div className="bg-slate-100 rounded-2xl p-1 flex w-fit">
            <button
              onClick={() => setActiveTab("blog")}
              className={`px-5 py-2 rounded-xl transition ${
                activeTab === "blog"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Blogs
            </button>

            <button
              onClick={() => setActiveTab("project")}
              className={`px-5 py-2 rounded-xl transition ${
                activeTab === "project"
                  ? "bg-white shadow text-blue-600"
                  : "text-gray-600"
              }`}
            >
              Projects
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-2 sm:p-5 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="p-2 sm:p-5 text-left text-sm font-semibold">
                  Type
                </th>

                <th className="p-2 sm:p-5 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="p-2 sm:p-5 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="p-2 sm:p-5 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredContent.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-20">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-700">
                        No content found
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Create your first {activeTab}.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredContent.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50 transition"
                  >
                    <td className="p-2 sm:p-5 font-medium">{item.title}</td>

                    <td className="p-2 sm:p-5 capitalize">{item.type}</td>

                    <td className="p-2 sm:p-5 text-gray-500">{item.date}</td>

                    <td className="p-2 sm:p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="p-2 sm:p-5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/content/edit/${item.id}`)}
                          className="
                            bg-blue-50
                            text-blue-600
                            px-4
                            py-2
                            rounded-xl
                            hover:bg-blue-100
                            transition
                          "
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="
                            bg-red-50
                            text-red-600
                            px-4
                            py-2
                            rounded-xl
                            hover:bg-red-100
                            transition
                          "
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContentList;
