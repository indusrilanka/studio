import React from 'react';
import { ColDef } from 'ag-grid-community';
import { fetchRoles } from '@/ai/fakeRoleAPI';
import RoleForm from './RoleForm';
import MasterDataTable from '../../shared/MasterDataTable';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Role Name', flex: 1 },
];

const api = {
  getAll: fetchRoles,
  create: async (role: any) => role, // Implement as needed
  update: async (id: number, role: any) => role, // Implement as needed
};

export default function RoleTable() {
  return (
    <MasterDataTable
      columns={columns}
      api={api}
      FormComponent={RoleForm}
      entityName="Role"
      searchPlaceholder="Search roles..."
    />
  );
}
