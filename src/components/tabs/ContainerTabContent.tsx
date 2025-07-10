import React from 'react';
import ContainerTable from '../master/test-catalog/container/ContainerTable';

const ContainerTabContent = () => {
      return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Test Container</h2>
      <ContainerTable />
    </div>
  );
};

export default ContainerTabContent;
