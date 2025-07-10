import React from 'react';
import MasterDataTable from '../../shared/MasterDataTable';
import SampleTypeForm from './SampleTypeForm';
import * as api from '@/ai/fakeSampleTypeAPI';
import { ColDef } from 'ag-grid-community';

const columns: ColDef[] = [
  { field: 'sampleTypeId', headerName: 'ID', flex: 1 },
  { field: 'sampleTypeName', headerName: 'Name', flex: 2 },
];

const sampleTypeApi = {
  getAll: api.fetchSampleTypes,
  create: api.addSampleType,
  update: api.updateSampleType,
  delete: api.deleteSampleType,
};

const SampleTypeTable = () => (
  <MasterDataTable
    columns={columns}
    api={sampleTypeApi}
    FormComponent={SampleTypeForm}
    entityName="Sample Type"
    searchPlaceholder="Search Sample Types..."
  />
);

export default SampleTypeTable;
