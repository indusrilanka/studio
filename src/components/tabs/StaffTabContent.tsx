"use client";

import React from 'react';
import StaffTable from '../master/employee/staff/StaffTable';

const StaffTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Staff Management</h2>
      <StaffTable />
    </div>
  );
};

export default StaffTabContent;
