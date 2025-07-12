
import React from 'react';
import DynamicForm, { DynamicFormField } from '../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'code', label: 'Code', type: 'text', required: true },
  { name: 'contactNumber', label: 'Contact Number', type: 'text' },
  { name: 'address', label: 'Address', type: 'text' },
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

const InsuranceProviderForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default InsuranceProviderForm;
