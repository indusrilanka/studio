// fakeDepartmentTypeAPI.ts
import type { DepartmentType } from '@/types';

export async function fetchDepartmentTypes(): Promise<DepartmentType[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [
    { id: 1, name: 'Diagnostic' },
    { id: 2, name: 'Clinical' },
    { id: 3, name: 'Supportive' },
    { id: 4, name: 'Administrative' },
  ];
}
export async function fetchDepartmentTypeById(id: number): Promise<DepartmentType | null> {
  const types = await fetchDepartmentTypes();
  return types.find(type => type.id === id) || null;
}