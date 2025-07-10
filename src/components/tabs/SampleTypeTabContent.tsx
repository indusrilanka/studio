import React from 'react';
import SampleTypeTable from '../master/test-catalog/sample-type/SampleTypeTable';

const SampleTypeTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Sample Type</h2>
      <SampleTypeTable />
    </div>
  );
};

export default SampleTypeTabContent;
