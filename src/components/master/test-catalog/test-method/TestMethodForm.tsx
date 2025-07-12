import React, { useState, useEffect } from "react";
import type { TestMethod } from "@/types/test-method";

interface TestMethodFormProps {
  initialData?: TestMethod | null;
  onSave: (data: TestMethod) => void;
  onClose: () => void;
}

const TestMethodForm: React.FC<TestMethodFormProps> = ({ initialData, onSave, onClose }) => {
  const [methodName, setMethodName] = useState(initialData?.methodName || "");

  useEffect(() => {
    setMethodName(initialData?.methodName || "");
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!methodName.trim()) return;
    onSave({
      methodId: initialData?.methodId || 0,
      methodName: methodName.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Test Method Name</label>
        <input
          className="border px-2 py-1 w-full"
          value={methodName}
          onChange={e => setMethodName(e.target.value)}
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

export default TestMethodForm;
