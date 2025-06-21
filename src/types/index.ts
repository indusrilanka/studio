import type { LucideIcon } from 'lucide-react';

import { ColDef } from 'ag-grid-community';



export interface Patient {
  id: string;
  mrn: string; // Medical Record Number
  firstName: string;
  lastName: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
  status?: 'Active' | 'Inactive' | 'Deceased';
  notes?: string;
  emergencyContact?: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies?: string[];
}


export interface Department {
  id: number;
  departmentCode: string;
  departmentName: string;
  departmentTypeId: number;
  location: string;
  headOfDepartmentId: number;
  contactNumber: string;
  email: string;
  status: 'Active' | 'Inactive';
  description: string;
}

export interface Staff {
  id: number;
  fullName: string;
  roleId: number;
  departmentCode: string;
  contactNumber: string;
  email: string;
  status: 'Active' | 'Inactive';
}

export interface Role {
  id: number;
  name: string;
}

export interface DepartmentType {
  id: number;
  name: string;
}

export interface TabItem {
  id: string; // Unique identifier for the tab instance, can be contentKey if only one instance allowed
  title: string;
  contentKey: string; // Key to map to a component, e.g., 'patients', 'patient-form'
  icon?: LucideIcon;
  closable?: boolean;
  data?: any; // Optional data for the tab content, e.g. patient ID for edit form
}

export interface NavLink {
  id: string;
  label: string;
  icon: LucideIcon;
  contentKey?: string; // Optional: if it's a parent menu, it might not open a tab itself
  children?: NavLink[]; // For sub-menu items
}

export interface ContextMenuState<T = any> {
  visible: boolean;
  x: number;
  y: number;
  rowData: T | null;
  colDef: ColDef | null;
}


export interface DataGridColumn {
  field: string;
  headerName?: string;
  sortable?: boolean;
  filter?: boolean;
  checkboxSelection?: boolean;
  cellRenderer?: string | ((params: any) => any);
  [key: string]: any;
}

// export interface DataGridProps<T = any> {
//   rowData: T[];
//   columnDefs: DataGridColumn[];
//   height?: number;
//   onRowClicked?: (row: any) => void;
//   enablePagination?: boolean;
//   onCellContextMenu?: (event: any) => void;
//   getContextMenuItems?: (params: any) => any[];
//   defaultColDef?: {
//     flex?: number;
//     minWidth?: number;
//     resizable?: boolean;
//     [key: string]: any;
//   };
// }

export interface DataGridProps<T = any> {
  rowData: T[];
  columnDefs: ColDef[];
  height?: number;
  onRowClicked?: (event: any) => void;
  enablePagination?: boolean;
  getContextMenuItems?: (params: any, colDef: ColDef) => any[];
}

export const GENDERS: Patient['gender'][] = ['Male', 'Female', 'Other'];



