
import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'name', label: 'Department Type Name', type: 'text', required: true },
];

const DepartmentTypeForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default DepartmentTypeForm;
