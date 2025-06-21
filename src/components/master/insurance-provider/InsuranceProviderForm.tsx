import React, { useEffect, useState } from 'react';
import { InsuranceProvider } from '../../../types';
import { Dialog } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface Props {
  
  onClose: () => void;
  onSave: (provider: InsuranceProvider) => void;
  initialData?: InsuranceProvider | null;
  readOnly?: boolean;
}

export default function InsuranceProviderForm({  initialData,onClose, onSave, readOnly }: Props) {
  const [form, setForm] = useState<InsuranceProvider>(
    initialData || {
      id: 0,
      name: '',
      code: '',
      contactNumber: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <Dialog  onOpenChange={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 p-4">
        <h3 className="text-lg font-semibold mb-2">
          {readOnly
            ? 'View Insurance Provider'
            : form.id
            ? 'Edit Insurance Provider'
            : 'Add Insurance Provider'}
        </h3>
        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          disabled={readOnly}
        />
        <Input
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
          required
          disabled={readOnly}
        />
        <Input
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber || ''}
          onChange={handleChange}
          disabled={readOnly}
        />
        <Input
          name="address"
          placeholder="Address"
          value={form.address || ''}
          onChange={handleChange}
          disabled={readOnly}
        />
        <select
          className="w-full border rounded p-2"
          name="status"
          value={form.status}
          onChange={handleChange}
          disabled={readOnly}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            {readOnly ? 'Close' : 'Cancel'}
          </Button>
          {!readOnly && <Button type="submit">Save</Button>}
        </div>
      </form>
    </Dialog>
  );
}
