import React from 'react';
import TestCategoryTable from '../master/test-category/TestCategoryTable';


const TestCategoryTabContent = () =>{
    return (
     <div className="p-4 md:p-6 h-full overflow-y-auto">
          <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Test Category</h2>
          <TestCategoryTable />;
        </div>
    )
};



export default TestCategoryTabContent;
