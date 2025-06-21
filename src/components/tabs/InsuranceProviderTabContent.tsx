"use client";

import React from 'react';
import InsuranceProviderTable from '../master/insurance-provider/InsuranceProviderTable';

const InsuranceProviderTabContent = () => {
  return (
      <div className="p-4 md:p-6 h-full overflow-y-auto">
        <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Insuarance Provider</h2>
        <InsuranceProviderTable />
      </div>
    );
};

export default InsuranceProviderTabContent;
