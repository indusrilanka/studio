// fakeStaffAPI.ts
import type { Staff } from '@/types';

export async function fetchStaff(): Promise<Staff[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    {
      id: 1,
      fullName: 'Dr. A. Perera',
      roleId: 1,
      departmentCode: 'LAB001',
      contactNumber: '011-2345678',
      email: 'perera@hospital.lk',
      status: 'Active',
    },
    {
      id: 2,
      fullName: 'Dr. S. Fernando',
      roleId: 2,
      departmentCode: 'RAD001',
      contactNumber: '011-8765432',
      email: 'fernando@hospital.lk',
      status: 'Active',
    },
    {
      id: 3,
      fullName: 'Ms. K. Silva',
      roleId: 3,
      departmentCode: 'PHY001',
      contactNumber: '011-1122334',
      email: 'ksilva@hospital.lk',
      status: 'Active',
    },
  ];
}
export async function fetchStaffByDepartment(departmentCode: string): Promise<Staff[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const allStaff = await fetchStaff();
  return allStaff.filter(staff => staff.departmentCode === departmentCode);
}
