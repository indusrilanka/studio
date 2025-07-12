import React, { useState, useEffect } from "react";

interface SimpleNameFormProps {
  initialData?: { [key: string]: any } | null;
  onSave: (data: any) => void;
  onCancel: () => void;
  nameField: string; // e.g. "sampleTypeName", "methodName"
  label: string; // e.g. "Sample Type Name", "Test Method Name"
  idField?: string; // e.g. "sampleTypeId", "methodId"
}

const SimpleNameForm: React.FC<SimpleNameFormProps> = ({ initialData, onSave, onCancel, nameField, label, idField }) => {
  const [name, setName] = useState(initialData?.[nameField] || "");

  useEffect(() => {
    setName(initialData?.[nameField] || "");
  }, [initialData, nameField]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      ...(idField ? { [idField]: initialData?.[idField] || 0 } : {}),
      [nameField]: name.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">{label}</label>
        <input
          className="border px-2 py-1 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={onCancel}>Cancel</button>
        <button type="submit" className="px-3 py-1 bg-primary text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default SimpleNameForm;
