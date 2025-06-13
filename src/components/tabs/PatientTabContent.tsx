"use client";

import React from 'react';
import PatientTable from '@/components/patients/PatientTable';

const PatientTabContent = () => {
  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Patient Management</h2>
      <PatientTable />
    </div>
  );
};

export default PatientTabContent;
