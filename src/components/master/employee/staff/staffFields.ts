import { DynamicFormField } from '../../shared/DynamicForm';
import { Role } from '@/types';

export function getStaffFields(roles: Role[]): DynamicFormField[] {
  return [
    { name: 'fullName', label: 'Full Name', type: 'text', required: true },
    {
      name: 'roleId',
      label: 'Role',
      type: 'select',
      required: true,
      options: roles.map(role => ({ label: role.name, value: role.id }))
    },
    { name: 'departmentCode', label: 'Department Code', type: 'text', required: true },
    { name: 'contactNumber', label: 'Contact Number', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'text', required: true },
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
}
