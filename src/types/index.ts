
import type { LucideIcon } from 'lucide-react';

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

export const GENDERS: Patient['gender'][] = ['Male', 'Female', 'Other'];
