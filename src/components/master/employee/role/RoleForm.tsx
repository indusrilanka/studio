import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Role } from '@/types';

interface Props {
  initialData?: Role | null;
  onSave: (data: Role) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export default function RoleForm({ initialData, onSave, onClose, readOnly }: Props) {
  const [form, setForm] = useState<Role>(
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
          ? 'View Role'
          : form.id
          ? 'Edit Role'
          : 'Add Role'}
      </h3>
      <Input
        name="name"
        placeholder="Role Name"
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
