import React, { useState, useEffect } from 'react';
import type { TestUnit } from '@/types';
import { addTestUnit, updateTestUnit } from '@/ai/fakeTestUnitAPI';
import { Button } from '@/components/ui/button';

interface Props {
  initialData?: TestUnit | null;
  onSave: (data: TestUnit) => void;
  onClose: () => void;
  readOnly?: boolean;
}



export default function TestUnitForm({ initialData, onSave, onClose, readOnly }: Props) {
  const [form, setForm] = useState<TestUnit>(
    initialData || {
      unitId: 0,
      unitName: '',
      symbol: ''
    }
  );

  useEffect(() => {
    if (initialData) {
      setForm({
        unitId: initialData.unitId,
        unitName: initialData.unitName,
        symbol: initialData.symbol || ''
      });
    } else {
      setForm({ unitId: 0, unitName: '', symbol: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let saved: TestUnit;
    if (initialData && initialData.unitId) {
      saved = await updateTestUnit({ ...initialData, ...form });
    } else {
      saved = await addTestUnit(form);
    }
    onSave(saved);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Unit'
          : initialData && initialData.unitId
          ? 'Edit Unit'
          : 'Add Unit'}
      </h3>
      <input
        name="unitName"
        placeholder="Unit Name"
        value={form.unitName}
        onChange={handleChange}
        required
        disabled={readOnly}
        className="w-full border rounded px-2 py-1"
      />
      <input
        name="symbol"
        placeholder="Symbol"
        value={form.symbol}
        onChange={handleChange}
        required
        disabled={readOnly}
        className="w-full border rounded px-2 py-1"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        {!readOnly && <Button type="submit">Save</Button>}
      </div>
    </form>
  );
}


