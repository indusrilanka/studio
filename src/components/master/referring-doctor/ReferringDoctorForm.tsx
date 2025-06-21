import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import type { ReferringDoctor } from '@/types';
import { SPECIALIZATIONS } from '@/types';

interface ReferringDoctorFormProps {
  doctor?: ReferringDoctor | null;
  onSave: (data: ReferringDoctor) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const ReferringDoctorForm: React.FC<ReferringDoctorFormProps> = ({ doctor, onSave, onCancel, readOnly = false }) => {
  const [fullName, setFullName] = useState(doctor?.fullName || '');
  const [specializationId, setSpecializationId] = useState<number | ''>(doctor?.specializationId || '');
  const [registrationNumber, setRegistrationNumber] = useState(doctor?.registrationNumber || '');
  const [hospitalOrClinic, setHospitalOrClinic] = useState(doctor?.hospitalOrClinic || '');
  const [contactNumber, setContactNumber] = useState(doctor?.contactNumber || '');
  const [email, setEmail] = useState(doctor?.email || '');
  const [address, setAddress] = useState(doctor?.address || '');
  const [status, setStatus] = useState<ReferringDoctor['status']>(doctor?.status || 'Active');

  useEffect(() => {
    setFullName(doctor?.fullName || '');
    setSpecializationId(doctor?.specializationId || '');
    setRegistrationNumber(doctor?.registrationNumber || '');
    setHospitalOrClinic(doctor?.hospitalOrClinic || '');
    setContactNumber(doctor?.contactNumber || '');
    setEmail(doctor?.email || '');
    setAddress(doctor?.address || '');
    setStatus(doctor?.status || 'Active');
  }, [doctor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specializationName = SPECIALIZATIONS.find(s => s.id === specializationId)?.name || '';
    onSave({
      id: doctor?.id || Math.floor(Math.random() * 100000),
      fullName,
      specializationId: specializationId ? Number(specializationId) : 0,
      specializationName,
      registrationNumber,
      hospitalOrClinic,
      contactNumber,
      email,
      address,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <DialogDescription>
        {readOnly ? 'View all information for this referring doctor.' : doctor ? 'Update the information for this referring doctor.' : 'Fill in the details for the new referring doctor.'}
      </DialogDescription>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <Input value={fullName} onChange={e => setFullName(e.target.value)} required disabled={readOnly} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Specialization</label>
          <select
            value={specializationId}
            onChange={e => setSpecializationId(Number(e.target.value))}
            required
            disabled={readOnly}
            className="w-full border rounded px-2 py-2"
          >
            <option value="">Select Specialization</option>
            {SPECIALIZATIONS.map(spec => (
              <option key={spec.id} value={spec.id}>{spec.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Registration Number</label>
          <Input value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} required disabled={readOnly} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hospital/Clinic</label>
          <Input value={hospitalOrClinic} onChange={e => setHospitalOrClinic(e.target.value)} required disabled={readOnly} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Contact Number</label>
          <Input value={contactNumber} onChange={e => setContactNumber(e.target.value)} required disabled={readOnly} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input value={email} onChange={e => setEmail(e.target.value)} required disabled={readOnly} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Address</label>
          <Input value={address} onChange={e => setAddress(e.target.value)} required disabled={readOnly} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value as ReferringDoctor['status'])}
            required
            disabled={readOnly}
            className="w-full border rounded px-2 py-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      {!readOnly && (
        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{doctor ? 'Save' : 'Add'}</Button>
        </div>
      )}
    </form>
  );
};

export default ReferringDoctorForm;
