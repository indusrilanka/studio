// fakeDepartmentAPI.ts
import type { Department } from '@/types';

export async function fetchDepartments(): Promise<Department[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      departmentCode: 'LAB001',
      departmentName: 'Laboratory',
      departmentTypeId: 1,
      location: 'Bldg A, Floor 1',
      headOfDepartmentId: 1,
      contactNumber: '011-2345678',
      email: 'lab@hospital.lk',
      status: 'Active',
      description: 'Performs clinical lab testing',
    },
    {
      id: 2,
      departmentCode: 'RAD001',
      departmentName: 'Radiology',
      departmentTypeId: 1,
      location: 'Bldg B, Floor 2',
      headOfDepartmentId: 2,
      contactNumber: '011-8765432',
      email: 'radiology@hospital.lk',
      status: 'Active',
      description: 'Imaging services including X-ray, CT, MRI',
    },
    {
      id: 3,
      departmentCode: 'PHY001',
      departmentName: 'Physiotherapy',
      departmentTypeId: 3,
      location: 'Bldg C, Floor 1',
      headOfDepartmentId: 3,
      contactNumber: '011-1122334',
      email: 'physio@hospital.lk',
      status: 'Active',
      description: 'Rehabilitation and therapy services',
    },
  ];
}
