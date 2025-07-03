import React from 'react';
import MasterDataTable from '../shared/MasterDataTable';
import ContainerForm from './ContainerForm';
import * as api from '@/ai/fakeContainerAPI';
import { ColDef } from 'ag-grid-community';



const columns: ColDef[] = [
  { field: 'containerId', headerName: 'ID', flex: 1 },
  { field: 'containerName', headerName: 'Name', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },

];

const containerApi = {
  getAll: api.getContainers,
  create: api.addContainer,
  update: api.updateContainer,
  delete: api.deleteContainer,
};

const ContainerTable = () => (
  <MasterDataTable
    columns={columns}
    api={containerApi}
    FormComponent={ContainerForm}
    entityName="Container"
    searchPlaceholder="Search Containers..."
  />
);

export default ContainerTable;
