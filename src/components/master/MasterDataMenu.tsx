import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import DepartmentTypeTable from './department-type/DepartmentTypeTable';

const MasterDataMenu: React.FC = () => {
  const [showDepartmentType, setShowDepartmentType] = useState(false);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Master Data Management</h2>
      <div className="space-x-2 mb-4">
        <Button onClick={() => setShowDepartmentType(true)}>
          Manage Department Types
        </Button>
        {/* Add more master data buttons here as needed */}
      </div>
      {showDepartmentType && (
        <div className="mb-6">
          <DepartmentTypeTable />
          <div className="mt-2 flex justify-end">
            <Button variant="outline" onClick={() => setShowDepartmentType(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterDataMenu;
