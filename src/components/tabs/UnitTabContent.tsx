import React from 'react';
import UnitTable from '../master/test-catalog/unit/UnitTable';


const TestUnitTabContent = () =>{
    return (
     <div className="p-4 md:p-6 h-full overflow-y-auto">
          <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Test Units</h2>
          <UnitTable/>;
        </div>
    )
};

export default TestUnitTabContent;
