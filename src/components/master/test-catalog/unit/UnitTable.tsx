import React from 'react';
import MasterDataTable from '../../shared/MasterDataTable';

import * as api from '@/ai/fakeTestUnitAPI';
import { ColDef } from 'ag-grid-community';
import TestUnitForm from './UnitForm';



const columns: ColDef[] = [
  { field: 'unitId', headerName: 'ID', flex: 1 },
  { field: 'unitName', headerName: 'Name', flex: 1 },
  { field: 'symbol', headerName: 'Symbol', flex: 1 },

];


const testUnitApi = {
  getAll: api.getTestUnits,
  create: api.addTestUnit,
  update: api.updateTestUnit,
  delete: api.deleteTestUnit,
};

const UnitTable = () => (
  <MasterDataTable
    columns={columns}
    api={testUnitApi}
    FormComponent={TestUnitForm}
    entityName="Units"
    searchPlaceholder="Search Units..."
  />
);

export default UnitTable;
