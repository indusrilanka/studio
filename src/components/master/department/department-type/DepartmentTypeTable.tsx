import React from 'react';
import { ColDef } from 'ag-grid-community';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import DepartmentTypeForm from './DepartmentTypeForm';
import MasterDataTable from '../../shared/MasterDataTable';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
];

const api = {
  getAll: fetchDepartmentTypes,
  create: async (type: any) => type, // Implement as needed
  update: async (id: number, type: any) => type, // Implement as needed
};

export default function DepartmentTypeTable() {
  return (
    <MasterDataTable
      columns={columns}
      api={api}
      FormComponent={DepartmentTypeForm}
      entityName="Department Type"
      searchPlaceholder="Search department types..."
    />
  );
}
