
import React, { useEffect, useState } from 'react';
import DynamicForm from '../../shared/DynamicForm';
import { getStaffFields } from './staffFields';
import { fetchRoles } from '@/ai/fakeRoleAPI';
import type { Role } from '@/types';

export default function StaffForm(props: any) {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const fields = getStaffFields(roles);

  return <DynamicForm {...props} fields={fields} />;
}
