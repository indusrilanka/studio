import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { ReferringDoctor } from '@/types';
import { SPECIALIZATIONS } from '@/types';

interface Props {
  initialData?: ReferringDoctor | null;
  onSave: (data: ReferringDoctor) => void;
  onClose: () => void;
  readOnly?: boolean;
}

export default function ReferringDoctorForm({ initialData, onSave, onClose, readOnly }: Props) {
  const [form, setForm] = useState<ReferringDoctor>(
    initialData || {
      id: 0,
      fullName: '',
      specializationId: 0,
      specializationName: '',
      registrationNumber: '',
      hospitalOrClinic: '',
      contactNumber: '',
      email: '',
      address: '',
      status: 'Active',
    }
  );

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    const name = SPECIALIZATIONS.find(s => s.id === id)?.name || '';
    setForm((prev) => ({ ...prev, specializationId: id, specializationName: name }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Referring Doctor'
          : form.id
          ? 'Edit Referring Doctor'
          : 'Add Referring Doctor'}
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
        name="specializationId"
        value={form.specializationId}
        onChange={handleSpecializationChange}
        required
        disabled={readOnly}
        className="w-full border rounded p-2"
      >
        <option value="">Select Specialization</option>
        {SPECIALIZATIONS.map(spec => (
          <option key={spec.id} value={spec.id}>{spec.name}</option>
        ))}
      </select>
      <Input
        name="registrationNumber"
        placeholder="Registration Number"
        value={form.registrationNumber}
        onChange={handleChange}
        required
        disabled={readOnly}
      />
      <Input
        name="hospitalOrClinic"
        placeholder="Hospital/Clinic"
        value={form.hospitalOrClinic}
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
      <Input
        name="address"
        placeholder="Address"
        value={form.address}
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
