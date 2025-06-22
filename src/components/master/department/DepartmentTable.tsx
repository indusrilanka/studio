import React, { useEffect, useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { fetchDepartments } from '@/ai/fakeDepartmentApi';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import { fetchStaff } from '@/ai/fakeStaffAPI';
import DepartmentForm, { DepartmentFormValues } from './DepartmentForm';
import MasterDataTable from '../shared/MasterDataTable';

const columns: ColDef[] = [
  { field: 'name', headerName: 'Department Name', flex: 1 },
  { field: 'departmentTypeId', headerName: 'Department Type', flex: 1 },
  { field: 'headOfDepartmentId', headerName: 'Head of Department', flex: 1 },
  { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'location', headerName: 'Location', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
];

const api = {
  getAll: fetchDepartments,
  create: async (department: any) => department, // Implement as needed
  update: async (id: number, department: any) => department, // Implement as needed
};

const DepartmentTable: React.FC = () => {
  const [departmentTypes, setDepartmentTypes] = useState([]);
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    fetchDepartmentTypes().then(setDepartmentTypes);
    fetchStaff().then(setStaffList);
  }, []);

  const handleSaveDepartment = (data: DepartmentFormValues) => {
    // Custom save logic if needed
  };

  return (
    <MasterDataTable
      columns={columns}
      api={api}
      FormComponent={DepartmentForm}
      entityName="Department"
      searchPlaceholder="Search departments..."
      onSave={handleSaveDepartment}
    />
  );
};

export default DepartmentTable;
