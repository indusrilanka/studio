"use client";

import React from 'react';
import type { TabItem } from '@/types';
import PatientTabContent from '@/components/tabs/PatientTabContent';
import PlaceholderTabContent from '@/components/tabs/PlaceholderTabContent';

interface TabContentRendererProps {
  tab: TabItem;
}

const TabContentRenderer: React.FC<TabContentRendererProps> = ({ tab }) => {
  switch (tab.contentKey) {
    case 'patients':
      return <PatientTabContent />;
    case 'invoices':
    case 'laboratory':
    case 'master-data':
    case 'reports':
    case 'system':
      return <PlaceholderTabContent title={tab.title} />;
    // Add more cases for other contentKeys as they are implemented
    // e.g. case 'patient-form': return <PatientForm patientId={tab.data?.patientId} />;
    default:
      return <PlaceholderTabContent title={`Unknown Tab: ${tab.title}`} />;
  }
};

export default TabContentRenderer;
