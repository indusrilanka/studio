import React from 'react';
import DynamicForm, { DynamicFormField } from '../../shared/DynamicForm';

const fields: DynamicFormField[] = [
  { name: 'categoryName', label: 'Category Name', type: 'text', required: true },
];

const TestCategoryForm = (props: any) => (
  <DynamicForm {...props} fields={fields} />
);

export default TestCategoryForm;
