import React from 'react';
import { ColDef } from 'ag-grid-community';
import { fakeInsuranceProviderAPI } from '../../../ai/fakeInsuranceProviderAPI';
import InsuranceProviderForm from './InsuranceProviderForm';
import MasterDataTable from '../shared/MasterDataTable';

const columns: ColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'code', headerName: 'Code', flex: 1 },
  { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
  { field: 'address', headerName: 'Address', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
];

export default function InsuranceProviderTable() {
  return (
    <MasterDataTable
      columns={columns}
      api={fakeInsuranceProviderAPI}
      FormComponent={InsuranceProviderForm}
      entityName="Insurance Provider"
      searchPlaceholder="Search insurance providers..."
    />
  );
}
