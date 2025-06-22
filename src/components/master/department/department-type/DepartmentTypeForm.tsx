import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { DepartmentType } from '@/types';

interface Props {
  initialData?: DepartmentType | null;
  onSave: (data: DepartmentType) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export default function DepartmentTypeForm({ initialData, onSave, onClose, readOnly }: Props) {
  const [form, setForm] = useState<DepartmentType>(
    initialData || {
      id: 0,
      name: '',
    }
  );

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Department Type'
          : form.id
          ? 'Edit Department Type'
          : 'Add Department Type'}
      </h3>
      <Input
        name="name"
        placeholder="Department Type Name"
        value={form.name}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        {!readOnly && <Button type="submit">Save</Button>}
      </div>
    </form>
  );
}
