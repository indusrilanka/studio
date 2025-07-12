
import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'unitName', label: 'Unit Name', type: 'text', required: true },
  { name: 'symbol', label: 'Symbol', type: 'text', required: true },
];

const TestUnitForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default TestUnitForm;


