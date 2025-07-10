"use client";

import React from 'react';
import type { TabItem } from '@/types';
import PatientTabContent from '@/components/tabs/PatientTabContent';
import PlaceholderTabContent from '@/components/tabs/PlaceholderTabContent';
import DepartmentTabContent from '../tabs/DepartmentTabContent';
import DepartmentTypeTabContent from '../tabs/DepartmentTypeTabContent';
import RoleTabContent from '../tabs/RoleTabContent';
import StaffTabContent from '../tabs/StaffTabContent';
import ReferringDoctorTabContent from '../tabs/ReferringDoctorTabContent';
import InsuranceProviderTabContent from '../tabs/InsuranceProviderTabContent';
import TestCategoryTabContent from '../tabs/TestCategoryTabContent';
import ContainerTabContent from '../tabs/ContainerTabContent';
import UnitTabContent from '../tabs/UnitTabContent';
import SampleTypeTabContent from '../tabs/SampleTypeTabContent';


interface TabContentRendererProps {
  tab: TabItem;
}

const TabContentRenderer: React.FC<TabContentRendererProps> = ({ tab }) => {
  console.log('Rendering tab content for:', tab);
  switch (tab.contentKey) {
    case 'patients':
      return <PatientTabContent />;
    case 'department/department':
        return <DepartmentTabContent/>
    case 'department/department-type':
        return <DepartmentTypeTabContent/>
    case 'employee/role':
        return <RoleTabContent/>;
    case 'employee/staff':
      return <StaffTabContent/>;
    case 'invoices':
    case 'laboratory':    
        
    // Removed 'master-data' and 'system' as they are now parent menu items
    // Their children will open specific tabs
    case 'reports':
      return <PlaceholderTabContent title={tab.title} />;
    // Sub-menu items for Master Data
    case 'master-data/test-catalog':
    case 'test-catalog/category': 
      return <TestCategoryTabContent/>;
    case 'test-catalog/container':
      return <ContainerTabContent/>
    case 'test-catalog/unit':
      return <UnitTabContent/>;
    case 'test-catalog/sample-type':
      return <SampleTypeTabContent />;
    case 'master-data/referring-doctors':
      return <ReferringDoctorTabContent/>;
    case 'master-data/insurance-provider':
      return <InsuranceProviderTabContent/>;
    case 'system/user-management':
    case 'system/audit-log':
      return <PlaceholderTabContent title={tab.title} />;
    // Add more cases for other contentKeys as they are implemented
    // e.g. case 'patient-form': return <PatientForm patientId={tab.data?.patientId} />;
    default:
      // If a parent menu item like 'master-data' itself was somehow opened (it shouldn't be)
      if (tab.contentKey === 'master-data' || tab.contentKey === 'system') {
         return <PlaceholderTabContent title={`${tab.title} (Parent Menu)`} />;
      }
      return <PlaceholderTabContent title={`Unknown Tab: ${tab.title} (Content Key: ${tab.contentKey})`} />;
  }
};

export default TabContentRenderer;
