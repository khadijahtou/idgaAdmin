import { useState } from "react";

const dummyData = [
  {
    _id: "1",
    name: "Aisha Bello",
    email: "aisha@email.com",
    service: "Interior Design",
    preferredDate: "2026-06-20",
    status: "Pending",
  },
  {
    _id: "2",
    name: "John Doe",
    email: "john@email.com",
    service: "Brand Consultation",
    preferredDate: "2026-06-22",
    status: "Approved",
  },
  {
    _id: "3",
    name: "Fatima Ali",
    email: "fatima@email.com",
    service: "Web Design",
    preferredDate: "2026-06-25",
    status: "Rejected",
  },
];

const Consultations = () => {
  const [consultations, setConsultations] = useState(dummyData);
  const [search, setSearch] = useState("");

  const filtered = consultations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  const updateStatus = (id, status) => {
    const updated = consultations.map((item) =>
      item._id === id ? { ...item, status } : item,
    );
    setConsultations(updated);
  };

  const deleteItem = (id) => {
    const updated = consultations.filter((item) => item._id !== id);
    setConsultations(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Consultations</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search consultations..."
        className="border p-2 rounded w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item._id} className="border p-4 rounded shadow-sm">
            <h2 className="font-bold text-lg">{item.name}</h2>
            <p>{item.email}</p>
            <p>{item.service}</p>
            <p>{item.preferredDate}</p>

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

export default Consultations;
