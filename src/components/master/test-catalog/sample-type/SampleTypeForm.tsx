import React, { useState, useEffect } from "react";
import type { SampleType } from "@/types";

interface SampleTypeFormProps {
  initialData?: SampleType | null;
  onSave: (data: SampleType) => void;
  onClose: () => void;
}

const SampleTypeForm: React.FC<SampleTypeFormProps> = ({ initialData, onSave, onClose }) => {
  const [sampleTypeName, setSampleTypeName] = useState(initialData?.sampleTypeName || "");

  useEffect(() => {
    setSampleTypeName(initialData?.sampleTypeName || "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sampleTypeName.trim()) return;
    onSave({
      sampleTypeId: initialData?.sampleTypeId || 0,
      sampleTypeName: sampleTypeName.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Sample Type Name</label>
        <input
          className="border px-2 py-1 w-full"
          value={sampleTypeName}
          onChange={e => setSampleTypeName(e.target.value)}
          required
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>Cancel</button>
        <button type="submit" className="px-3 py-1 bg-primary text-white rounded">Save</button>
      </div>
    </form>
  );
};

export default SampleTypeForm;
