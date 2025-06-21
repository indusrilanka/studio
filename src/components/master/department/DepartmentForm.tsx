import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import type { DepartmentType, Staff } from '@/types';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import { fetchStaff } from '@/ai/fakeStaffAPI';

export interface DepartmentFormValues {
  id?: number;
  name: string;
  description?: string;
  departmentTypeId?: number;
  headOfDepartmentId?: number;
  contactNumber?: string;
  email?: string;
  status?: 'Active' | 'Inactive';
  location?: string;
}

interface DepartmentFormProps {
  department?: DepartmentFormValues | null;
  onSave: (data: DepartmentFormValues) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, onSave, onCancel, readOnly = false }) => {
  const [name, setName] = useState(department?.name || '');
  const [description, setDescription] = useState(department?.description || '');
  const [departmentTypeId, setDepartmentTypeId] = useState<number | ''>(department?.departmentTypeId || '');
  const [headOfDepartmentId, setHeadOfDepartmentId] = useState<number | ''>(department?.headOfDepartmentId || '');
  const [contactNumber, setContactNumber] = useState(department?.contactNumber || '');
  const [email, setEmail] = useState(department?.email || '');
  const [status, setStatus] = useState<'Active' | 'Inactive'>(department?.status || 'Active');
  const [location, setLocation] = useState(department?.location || '');
  const [departmentTypes, setDepartmentTypes] = useState<DepartmentType[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    setName(department?.name || '');
    setDescription(department?.description || '');
    setDepartmentTypeId(department?.departmentTypeId || '');
    setHeadOfDepartmentId(department?.headOfDepartmentId || '');
    setContactNumber(department?.contactNumber || '');
    setEmail(department?.email || '');
    setStatus(department?.status || 'Active');
    setLocation(department?.location || '');
  }, [department]);

  useEffect(() => {
    fetchDepartmentTypes().then(setDepartmentTypes);
    fetchStaff().then(setStaffList);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: department?.id,
      name,
      description,
      departmentTypeId: departmentTypeId ? Number(departmentTypeId) : undefined,
      headOfDepartmentId: headOfDepartmentId ? Number(headOfDepartmentId) : undefined,
      contactNumber,
      email,
      status,
      location,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <DialogDescription>
        {readOnly ? 'View all information for this department.' : department ? 'Update the information for this department.' : 'Fill in the details for the new department.'}
      </DialogDescription>
      <div>
        <label className="block text-sm font-medium mb-1">Department Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Department Type</label>
        <select
          value={departmentTypeId}
          onChange={e => setDepartmentTypeId(Number(e.target.value))}
          required
          disabled={readOnly}
          className="w-full border rounded px-2 py-2"
        >
          <option value="">Select Department Type</option>
          {departmentTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Head of Department</label>
        <select
          value={headOfDepartmentId}
          onChange={e => setHeadOfDepartmentId(Number(e.target.value))}
          required
          disabled={readOnly}
          className="w-full border rounded px-2 py-2"
        >
          <option value="">Select Staff</option>
          {staffList.map(staff => (
            <option key={staff.id} value={staff.id}>{staff.fullName}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Contact Number</label>
        <Input value={contactNumber} onChange={e => setContactNumber(e.target.value)} disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input value={email} onChange={e => setEmail(e.target.value)} disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value as 'Active' | 'Inactive')}
          required
          disabled={readOnly}
          className="w-full border rounded px-2 py-2"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <Input value={location} onChange={e => setLocation(e.target.value)} disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} disabled={readOnly} />
      </div>
      {!readOnly && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{department ? 'Save' : 'Add'}</Button>
        </div>
      )}
    </form>
  );
};

export default DepartmentForm;
