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
    relationId: number; // references RELATIONS
    relationName: string; // for display
    phone: string;
    // relation?: string; // deprecated, use relationId/relationName
  };
  allergies?: string[];
}


export interface Department {
  id: number;
  departmentCode: string;
  name: string; // was departmentName
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

export interface Specialization {
  id: number;
  name: string;
}


export const SPECIALIZATIONS = [
  { id: 1, name: 'General Practitioner' },
  { id: 2, name: 'Pediatrician' },
  { id: 3, name: 'Cardiologist' },
  { id: 4, name: 'Dermatologist' },
  { id: 5, name: 'Neurologist' },
  { id: 6, name: 'Psychiatrist' },
  { id: 7, name: 'Endocrinologist' },
  { id: 8, name: 'Nephrologist' },
  { id: 9, name: 'Gastroenterologist' },
  { id: 10, name: 'Pulmonologist' },
  { id: 11, name: 'Oncologist' },
  { id: 12, name: 'Rheumatologist' },
  { id: 13, name: 'Orthopedic Surgeon' },
  { id: 14, name: 'General Surgeon' },
  { id: 15, name: 'ENT Specialist (Otolaryngologist)' },
  { id: 16, name: 'Ophthalmologist' },
  { id: 17, name: 'Gynecologist / Obstetrician' },
  { id: 18, name: 'Urologist' },
  { id: 19, name: 'Radiologist' },
  { id: 20, name: 'Pathologist' },
  { id: 21, name: 'Diabetologist' },
  { id: 22, name: 'Hematologist' },
  { id: 23, name: 'Infectious Disease Specialist' },
  { id: 24, name: 'Geriatrician' },
  { id: 25, name: 'Family Medicine' },
  { id: 26, name: 'Allergy and Immunology' },
  { id: 27, name: 'Anesthesiologist' },
  { id: 28, name: 'Public Health Specialist' },
  { id: 29, name: 'Rehabilitation Specialist' },
  { id: 30, name: 'Sports Medicine Specialist' },
] as const;


// types.ts
export interface ReferringDoctor {
  id: number;
  fullName: string;
  specializationId: number;
  specializationName: string;
  registrationNumber: string;
  hospitalOrClinic: string;
  contactNumber: string;
  email: string;
  address: string;
  status: 'Active' | 'Inactive';
}


export const RELATIONS = [
  { id: 1, name: 'Father' },
  { id: 2, name: 'Mother' },
  { id: 3, name: 'Spouse' },
  { id: 4, name: 'Brother' },
  { id: 5, name: 'Sister' },
  { id: 6, name: 'Son' },
  { id: 7, name: 'Daughter' },
  { id: 8, name: 'Guardian' },
  { id: 9, name: 'Uncle' },
  { id: 10, name: 'Aunt' },
  { id: 11, name: 'Nephew' },
  { id: 12, name: 'Niece' },
  { id: 13, name: 'Friend' },
  { id: 14, name: 'Grandfather' },
  { id: 15, name: 'Grandmother' },
  { id: 16, name: 'Cousin' },
  { id: 17, name: 'Neighbour' },
  { id: 18, name: 'Employer' },
  { id: 19, name: 'Employee' },
  { id: 20, name: 'Other' },
] as const;

export interface InsuranceProvider {
  id: number;
  name: string;
  code: string;
  contactNumber?: string;
  address?: string;
  status: 'Active' | 'Inactive';
}

