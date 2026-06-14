import { useState } from "react";
import toast from "react-hot-toast";

const dummyEnrollments = [
  {
    _id: "1",
    name: "Amina Yusuf",
    email: "amina@email.com",
    course: "Web Development Bootcamp",
    status: "Pending",
  },
  {
    _id: "2",
    name: "David Mark",
    email: "david@email.com",
    course: "UI/UX Design",
    status: "Approved",
  },
  {
    _id: "3",
    name: "Sara Ahmed",
    email: "sara@email.com",
    course: "Frontend Mastery",
    status: "Rejected",
  },
];

const Enrollments = () => {
  const [enrollments, setEnrollments] = useState(dummyEnrollments);
  const [search, setSearch] = useState("");

  const filtered = enrollments.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const updateStatus = (id, status) => {
    const updated = enrollments.map((item) =>
      item._id === id ? { ...item, status } : item,
    );

    setEnrollments(updated);
    toast.success(`Marked as ${status}`);
  };

  const deleteItem = (id) => {
    const updated = enrollments.filter((item) => item._id !== id);

    setEnrollments(updated);
    toast.error("Enrollment deleted");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Course Enrollments</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search enrollments..."
        className="border p-2 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow-sm bg-white">
            <h2 className="font-bold text-lg">{item.name}</h2>

            <p>{item.email}</p>
            <p>{item.course}</p>

            {/* Status */}
            <p className="mt-2">
              Status:{" "}
              <span
                className={
                  item.status === "Approved"
                    ? "text-green-600 font-bold"
                    : item.status === "Rejected"
                      ? "text-red-600 font-bold"
                      : "text-yellow-600 font-bold"
                }
              >
                {item.status}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <button
                onClick={() => updateStatus(item._id, "Approved")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(item._id, "Rejected")}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Reject
              </button>

              <button
                onClick={() => deleteItem(item._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
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

export default Enrollments;
