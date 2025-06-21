// fakeRoleAPI.ts
import type { Role } from '@/types';

export async function fetchRoles(): Promise<Role[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [
    { id: 1, name: 'Consultant Pathologist' },
    { id: 2, name: 'Consultant Radiologist' },
    { id: 3, name: 'Senior Physiotherapist' },
  ];
}
