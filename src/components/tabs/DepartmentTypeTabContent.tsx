"use client";

import React from 'react';
import DepartmentTypeTable from '@/components/master/department/department-type/DepartmentTypeTable';

const DepartmentTypeTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Department Type Management</h2>
      <DepartmentTypeTable />
    </div>
  );
};

export default DepartmentTypeTabContent;
