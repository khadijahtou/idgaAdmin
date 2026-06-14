import { useState } from "react";
import { getStorage, setStorage } from "../../utils/storage";

const FormBuilder = () => {
  const [formFields, setFormFields] = useState(() =>
    getStorage("consult_form", [
      { id: 1, label: "Name", type: "text", required: true },
      { id: 2, label: "Email", type: "email", required: true },
      { id: 3, label: "Message", type: "textarea", required: false },
    ]),
  );

  const addField = () => {
    const updated = [
      ...formFields,
      {
        id: Date.now(),
        label: "New Field",
        type: "text",
        required: false,
      },
    ];

    setFormFields(updated);
    setStorage("consult_form", updated);
  };

  const updateField = (id, key, value) => {
    const updated = formFields.map((f) =>
      f.id === id ? { ...f, [key]: value } : f,
    );

    setFormFields(updated);
    setStorage("consult_form", updated);
  };

  const deleteField = (id) => {
    const updated = formFields.filter((f) => f.id !== id);

    setFormFields(updated);
    setStorage("consult_form", updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>

      <button
        onClick={addField}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        type="button"
      >
        + Add Field
      </button>

      {formFields.map((field) => (
        <div key={field.id} className="border p-4 mb-4 rounded-xl">
          <input
            value={field.label}
            onChange={(e) => updateField(field.id, "label", e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <select
            value={field.type}
            onChange={(e) => updateField(field.id, "type", e.target.value)}
            className="border p-2 w-full mb-2"
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="textarea">Textarea</option>
          </select>

          <button
            onClick={() => deleteField(field.id)}
            className="text-red-600"
            type="button"
          >
            Delete Field
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormBuilder;
