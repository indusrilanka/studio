import React from 'react';
import TestMethodTable from '../master/test-catalog/test-method/TestMethodTable';

const TestMethodTabContent = () => (
  <div className="p-4 md:p-6 h-full overflow-y-auto">
    <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Test Method</h2>
    <TestMethodTable />
  </div>
);

export default TestMethodTabContent;
