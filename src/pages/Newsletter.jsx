import { useState } from "react";

const Newsletter = () => {
  const [subs, setSubs] = useState([
    { id: 1, email: "test@mail.com" },
    { id: 2, email: "user@mail.com" },
  ]);

  const handleDelete = (id) => {
    setSubs(subs.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Newsletter</h2>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-3">{s.email}</td>

                <td className="p-3">
                  <button
                    onClick={() => handleDelete(s.id)}
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

export default Newsletter;
