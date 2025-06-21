"use client";

import React from 'react';
import RoleTable from '../master/employee/role/RoleTable';

const RoleTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Role Management</h2>
      <RoleTable />
    </div>
  );
};

export default RoleTabContent;
