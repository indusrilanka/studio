
import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'name', label: 'Role Name', type: 'text', required: true },
];

const RoleForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default RoleForm;
