"use client";

import React from 'react';
import DepartmentTable from '../master/department/DepartmentTable';

const DepartmentTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Department Management</h2>
      <DepartmentTable />
    </div>
  );
};

export default DepartmentTabContent;
// This component is designed to manage departments within a healthcare system.
// It provides a user interface for viewing, adding, and editing department information.