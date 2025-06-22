import React from 'react';
import { ColDef } from 'ag-grid-community';
import { fetchStaff } from '@/ai/fakeStaffAPI';
import StaffForm from './StaffForm';
import MasterDataTable from '../../shared/MasterDataTable';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'fullName', headerName: 'Full Name', flex: 1 },
  { field: 'roleId', headerName: 'Role', flex: 1 },
  { field: 'departmentCode', headerName: 'Department Code', flex: 1 },
  { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
];

const api = {
  getAll: fetchStaff,
  create: async (staff: any) => staff, // Implement as needed
  update: async (id: number, staff: any) => staff, // Implement as needed
};

export default function StaffTable() {
  return (
    <MasterDataTable
      columns={columns}
      api={api}
      FormComponent={StaffForm}
      entityName="Staff"
      searchPlaceholder="Search staff..."
    />
  );
}
