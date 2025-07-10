import React from 'react';
import MasterDataTable from '../../shared/MasterDataTable';

import type { TestCategory } from '@/types';
import * as api from '@/ai/fakeTestCategoryAPI';
import TestCategoryForm from './TestCategoryForm';
import { ColDef } from 'ag-grid-community';

// const columns = [
//   { header: 'ID', accessorKey: 'categoryId' },
//   { header: 'Name', accessorKey: 'categoryName' },
// ];

const columns: ColDef[] = [
  { field: 'categoryId', headerName: 'ID', flex: 1 },
  { field: 'categoryName', headerName: 'Name', flex: 1 }
];

const testCategoryApi = {
  getAll: api.getTestCategories,
  create: api.addTestCategory,
  update: api.updateTestCategory,
  delete: api.deleteTestCategory,
};

const TestCategoryTable = () => (
  <MasterDataTable
    columns={columns}
    api={testCategoryApi}
    FormComponent={TestCategoryForm}
    entityName="Test Category"
    searchPlaceholder="Search Test Categories..."
  />
);

export default TestCategoryTable;
