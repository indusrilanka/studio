import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import type { Staff, Role } from '@/types';
import { fetchRoles } from '@/ai/fakeRoleAPI';

interface StaffFormProps {
  staff?: Staff | null;
  onSave: (data: Staff) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const StaffForm: React.FC<StaffFormProps> = ({ staff, onSave, onCancel, readOnly = false }) => {
  const [fullName, setFullName] = useState(staff?.fullName || '');
  const [roleId, setRoleId] = useState(staff?.roleId || 0);
  const [departmentCode, setDepartmentCode] = useState(staff?.departmentCode || '');
  const [contactNumber, setContactNumber] = useState(staff?.contactNumber || '');
  const [email, setEmail] = useState(staff?.email || '');
  const [status, setStatus] = useState<Staff['status']>(staff?.status || 'Active');
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    setFullName(staff?.fullName || '');
    setRoleId(staff?.roleId || 0);
    setDepartmentCode(staff?.departmentCode || '');
    setContactNumber(staff?.contactNumber || '');
    setEmail(staff?.email || '');
    setStatus(staff?.status || 'Active');
  }, [staff]);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: staff?.id || Math.floor(Math.random() * 100000),
      fullName,
      roleId,
      departmentCode,
      contactNumber,
      email,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <DialogDescription>
        {readOnly ? 'View all information for this staff member.' : staff ? 'Update the information for this staff member.' : 'Fill in the details for the new staff member.'}
      </DialogDescription>
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <Input value={fullName} onChange={e => setFullName(e.target.value)} required disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={roleId}
          onChange={e => setRoleId(Number(e.target.value))}
          required
          disabled={readOnly}
          className="w-full border rounded px-2 py-2"
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Department Code</label>
        <Input value={departmentCode} onChange={e => setDepartmentCode(e.target.value)} required disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Number</label>
        <Input value={contactNumber} onChange={e => setContactNumber(e.target.value)} required disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input value={email} onChange={e => setEmail(e.target.value)} required disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as Staff['status'])}
          required
          disabled={readOnly}
          className="w-full border rounded px-2 py-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      {!readOnly && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{staff ? 'Save' : 'Add'}</Button>
        </div>
      )}
    </form>
  );
};

export default StaffForm;
