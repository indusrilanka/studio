"use client";

import React from 'react';
import ReferringDoctorTable from '../master/referring-doctor/ReferringDoctorTable';

const ReferringDoctorTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Referring Doctor Management</h2>
      <ReferringDoctorTable />
    </div>
  );
};

export default ReferringDoctorTabContent;
