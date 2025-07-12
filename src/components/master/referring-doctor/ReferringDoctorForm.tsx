import React from 'react';
import DynamicForm, { DynamicFormField } from '../shared/DynamicForm';
import { SPECIALIZATIONS } from '@/types';

const fields: DynamicFormField[] = [
  { name: 'fullName', label: 'Full Name', type: 'text', required: true },
  {
    name: 'specializationId',
    label: 'Specialization',
    type: 'select',
    required: true,
    options: SPECIALIZATIONS.map(s => ({ label: s.name, value: s.id }))
  },
  { name: 'registrationNumber', label: 'Registration Number', type: 'text', required: true },
  { name: 'hospitalOrClinic', label: 'Hospital/Clinic', type: 'text', required: true },
  { name: 'contactNumber', label: 'Contact Number', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'text', required: true },
  { name: 'address', label: 'Address', type: 'text', required: true },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' }
    ]
  }
];

const ReferringDoctorForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default ReferringDoctorForm;
