import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'methodName', label: 'Test Method Name', type: 'text', required: true },
];

const TestMethodForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default TestMethodForm;
