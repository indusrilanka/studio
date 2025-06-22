import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Staff, Role } from '@/types';
import { fetchRoles } from '@/ai/fakeRoleAPI';

interface Props {
  initialData?: Staff | null;
  onSave: (data: Staff) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export default function StaffForm({ initialData, onSave, onClose, readOnly }: Props) {
  const [form, setForm] = useState<Staff>(
    initialData || {
      id: 0,
      fullName: '',
      roleId: 0,
      departmentCode: '',
      contactNumber: '',
      email: '',
      status: 'Active',
    }
  );
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, roleId: Number(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Staff'
          : form.id
          ? 'Edit Staff'
          : 'Add Staff'}
      </h3>
      <Input
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <select
        name="roleId"
        value={form.roleId}
        onChange={handleRoleChange}
        required
        disabled={readOnly}
        className="w-full border rounded p-2"
      >
        <option value="">Select Role</option>
        {roles.map(role => (
          <option key={role.id} value={role.id}>{role.name}</option>
        ))}
      </select>
      <Input
        name="departmentCode"
        placeholder="Department Code"
        value={form.departmentCode}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <Input
        name="contactNumber"
        placeholder="Contact Number"
        value={form.contactNumber}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        required
        disabled={readOnly}
        className="w-full border rounded p-2"
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        {!readOnly && <Button type="submit">Save</Button>}
      </div>
    </form>
  );
}
