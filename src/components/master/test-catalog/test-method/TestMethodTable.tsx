import React from 'react';
import MasterDataTable from '../../shared/MasterDataTable';
import TestMethodForm from './TestMethodForm';
import * as api from '@/ai/fakeTestMethodAPI';
import { ColDef } from 'ag-grid-community';

const columns: ColDef[] = [
  { field: 'methodId', headerName: 'ID', flex: 1 },
  { field: 'methodName', headerName: 'Name', flex: 2 },
];

const testMethodApi = {
  getAll: api.fetchTestMethods,
  create: api.addTestMethod,
  update: api.updateTestMethod,
  delete: api.deleteTestMethod,
};

const TestMethodTable = () => (
  <MasterDataTable
    columns={columns}
    api={testMethodApi}
    FormComponent={TestMethodForm}
    entityName="Test Method"
    searchPlaceholder="Search Test Methods..."
  />
);

export default TestMethodTable;
