import React from 'react';
import { ColDef } from 'ag-grid-community';
import { fetchReferringDoctors } from '@/ai/fakeReferringDoctorAPI';
import ReferringDoctorForm from './ReferringDoctorForm';
import MasterDataTable from '../shared/MasterDataTable';

const columns: ColDef[] = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'fullName', headerName: 'Full Name', flex: 1 },
  { field: 'specializationName', headerName: 'Specialty', flex: 1 },
  { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
];

const api = {
  getAll: fetchReferringDoctors,
  create: async (doctor: any) => doctor, // Implement as needed
  update: async (id: number, doctor: any) => doctor, // Implement as needed
};

export default function ReferringDoctorTable() {
  return (
    <MasterDataTable
      columns={columns}
      api={api}
      FormComponent={ReferringDoctorForm}
      entityName="Referring Doctor"
      searchPlaceholder="Search referring doctors..."
    />
  );
}
