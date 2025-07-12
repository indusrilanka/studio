import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'sampleTypeName', label: 'Sample Type Name', type: 'text', required: true },
];

const SampleTypeForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default SampleTypeForm;
