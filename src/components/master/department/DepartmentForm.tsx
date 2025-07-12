
import React, { useEffect, useState } from 'react';
import DynamicForm from '../shared/DynamicForm';
import { getDepartmentFields } from './departmentFields';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import { fetchStaff } from '@/ai/fakeStaffAPI';

import type { DepartmentType, Staff } from '@/types';
export default function DepartmentForm(props: any) {
  const [departmentTypes, setDepartmentTypes] = useState<DepartmentType[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    fetchDepartmentTypes().then(setDepartmentTypes);
    fetchStaff().then(setStaffList);
  }, []);

  const fields = getDepartmentFields(departmentTypes, staffList);

  return <DynamicForm {...props} fields={fields} />;
}
