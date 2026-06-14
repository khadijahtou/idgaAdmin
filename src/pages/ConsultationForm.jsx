import { useState } from "react";
import { getStorage, setStorage } from "../utils/storage";

const ConsultationForm = () => {
  const formFields = getStorage("consult_form", []);

  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing = getStorage("consult_submissions", []);

    const newSubmission = {
      id: Date.now(),
      data: formData,
      status: "Pending",
    };

    const updated = [newSubmission, ...existing];

    setStorage("consult_submissions", updated);
    setFormData({});
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Consultation Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map((field) => (
          <div key={field.id}>
            <label className="block mb-1">{field.label}</label>

            {field.type === "text" && (
              <input
                className="border p-2 w-full"
                value={formData[field.label] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.label]: e.target.value,
                  })
                }
              />
            )}

            {field.type === "email" && (
              <input
                className="border p-2 w-full"
                type="email"
                value={formData[field.label] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.label]: e.target.value,
                  })
                }
              />
            )}

            {field.type === "textarea" && (
              <textarea
                className="border p-2 w-full"
                value={formData[field.label] || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [field.label]: e.target.value,
                  })
                }
              />
            )}
          </div>
        ))}

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConsultationForm;
