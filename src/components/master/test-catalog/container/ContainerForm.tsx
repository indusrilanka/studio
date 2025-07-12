import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'containerName', label: 'Container Name', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
];

const ContainerForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default ContainerForm;
