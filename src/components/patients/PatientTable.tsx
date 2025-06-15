'use client';

import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, PlusCircle, Edit, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import PatientForm from './PatientForm';
import type { Patient } from '@/types';
import { format } from 'date-fns';
import { Input } from '../ui/input';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import DataGrid from '../core/data-grid';
import { fetchPatients } from '@/ai/fakePatientApi';

const PatientTable = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  React.useEffect(() => {
    fetchPatients().then(setPatients);
  }, []);

  const handleAddNew = () => {
    setSelectedPatient(null);
    setIsFormOpen(true);
  };

  const handleEdit = (patient: Patient) => {
    console.log('Editing patient:', patient);
    setSelectedPatient(patient);
    setIsFormOpen(true);
  };

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsViewOpen(true);
  };

  const handleSavePatient = (data: Patient) => {
    if (selectedPatient) {
      // Editing
      setPatients(patients.map((p) => (p.id === data.id ? data : p)));
    } else {
      // Adding new
      setPatients([...patients, data]);
    }
    setIsFormOpen(false);
    setSelectedPatient(null);
  };

  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients;
    return patients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  const patientColumnDefs = [
    { field: 'mrn', headerName: 'MRN', sortable: true, filter: true },
    { field: 'firstName', headerName: 'First Name', sortable: true, filter: true },
    { field: 'lastName', headerName: 'Last Name', sortable: true, filter: true },
    { field: 'dob', headerName: 'DOB', sortable: true, filter: true, valueFormatter: (params: any) => format(new Date(params.value), 'MM/dd/yyyy') },
    { field: 'gender', headerName: 'Gender', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true },
    { field: 'insuranceProvider', headerName: 'Insurance', sortable: true, filter: true },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'address', headerName: 'Address', sortable: false, filter: false },
  ];

  const getContextMenuItems = (params: any) => {
    const result = [
      {
        label: 'Add',
        action: () => console.log('ADD Row', params),
      },
      {
        label: 'Edit',
        action: () =>handleEdit(params),
      },
      {
        label: 'View',
        action: () => handleView(params),
      },
      {
        label: 'Export Row',
        action: () => console.log('Export Row', params),
      },
    ];
    return result;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search patients (Name, MRN, Email)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Patient
        </Button>
      </div>

      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid rowData={filteredPatients} columnDefs={patientColumnDefs} enablePagination={true} getContextMenuItems={getContextMenuItems} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog open={isFormOpen || isViewOpen} onOpenChange={open => { setIsFormOpen(open); setIsViewOpen(false); }}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">
              {isViewOpen ? 'Patient Details' : selectedPatient ? 'Edit Patient Details' : 'Add New Patient'}
            </DialogTitle>
            <DialogDescription>
              {isViewOpen
                ? 'View all information for this patient.'
                : selectedPatient
                ? 'Update the information for this patient.'
                : 'Fill in the details for the new patient.'}
            </DialogDescription>
          </DialogHeader>
          <PatientForm
            patient={selectedPatient}
            onSave={handleSavePatient}
            onCancel={() => {
              setIsFormOpen(false);
              setIsViewOpen(false);
              setSelectedPatient(null);
            }}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientTable;
