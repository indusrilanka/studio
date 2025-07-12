import { DynamicFormField } from '../shared/DynamicForm';
import { DepartmentType, Staff } from '@/types';

export function getDepartmentFields(departmentTypes: DepartmentType[], staffList: Staff[]): DynamicFormField[] {
  return [
    { name: 'name', label: 'Department Name', type: 'text', required: true },
    {
      name: 'departmentTypeId',
      label: 'Department Type',
      type: 'select',
      required: true,
      options: departmentTypes.map(type => ({ label: type.name, value: type.id }))
    },
    {
      name: 'headOfDepartmentId',
      label: 'Head of Department',
      type: 'select',
      required: true,
      options: staffList.map(staff => ({ label: staff.fullName, value: staff.id }))
    },
    { name: 'contactNumber', label: 'Contact Number', type: 'text' },
    { name: 'email', label: 'Email', type: 'text' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' }
      ]
    },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
  ];
}
