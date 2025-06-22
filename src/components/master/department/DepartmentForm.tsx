import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { DepartmentType, Staff, Department } from '@/types';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import { fetchStaff } from '@/ai/fakeStaffAPI';

interface Props {
  initialData?: Department | null;
  onSave: (data: Department) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export default function DepartmentForm({ initialData, onSave, onClose, readOnly }: Props) {
  const [form, setForm] = useState<Department>(
    initialData || {
      id: 0,
      name: '',
      description: '',
      departmentTypeId: 0,
      headOfDepartmentId: 0,
      contactNumber: '',
      email: '',
      status: 'Active',
      location: '',
      departmentCode: '',
    }
  );
  const [departmentTypes, setDepartmentTypes] = useState<DepartmentType[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    fetchDepartmentTypes().then(setDepartmentTypes);
    fetchStaff().then(setStaffList);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Department'
          : form.id
          ? 'Edit Department'
          : 'Add Department'}
      </h3>
      <Input
        name="name"
        placeholder="Department Name"
        value={form.name}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <select
        name="departmentTypeId"
        value={form.departmentTypeId}
        onChange={handleSelectChange}
        required
        disabled={readOnly}
        className="w-full border rounded p-2"
      >
        <option value="">Select Department Type</option>
        {departmentTypes.map(type => (
          <option key={type.id} value={type.id}>{type.name}</option>
        ))}
      </select>
      <select
        name="headOfDepartmentId"
        value={form.headOfDepartmentId}
        onChange={handleSelectChange}
        required
        disabled={readOnly}
        className="w-full border rounded p-2"
      >
        <option value="">Select Staff</option>
        {staffList.map(staff => (
          <option key={staff.id} value={staff.id}>{staff.fullName}</option>
        ))}
      </select>
      <Input
        name="contactNumber"
        placeholder="Contact Number"
        value={form.contactNumber}
        onChange={handleChange}
        disabled={readOnly}
      />
      <Input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
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
      <Input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        disabled={readOnly}
      />
      <Input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        disabled={readOnly}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        {!readOnly && <Button type="submit">Save</Button>}
      </div>
    </form>
  );
}
