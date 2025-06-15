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

const initialPatients: Patient[] = [
  {
    id: '1',
    mrn: 'MRN001',
    firstName: 'Alice',
    lastName: 'Smith',
    dob: new Date('1990-05-15'),
    gender: 'Female',
    phone: '555-0101',
    email: 'alice.smith@example.com',
    address: '123 Oak St, Anytown',
  },
  {
    id: '2',
    mrn: 'MRN002',
    firstName: 'Bob',
    lastName: 'Johnson',
    dob: new Date('1985-08-22'),
    gender: 'Male',
    phone: '555-0102',
    email: 'bob.johnson@example.com',
    address: '456 Pine St, Anytown',
  },
  {
    id: '3',
    mrn: 'MRN003',
    firstName: 'Carol',
    lastName: 'Williams',
    dob: new Date('2000-01-30'),
    gender: 'Female',
    phone: '555-0103',
    email: 'carol.williams@example.com',
    address: '789 Maple St, Anytown',
  },
  {
    id: '4',
    mrn: 'MRN004',
    firstName: 'David',
    lastName: 'Brown',
    dob: new Date('1978-11-03'),
    gender: 'Male',
    phone: '555-0104',
    email: 'david.brown@example.com',
    address: '101 Elm St, Anytown',
  },
  {
    id: '5',
    mrn: 'MRN005',
    firstName: 'Eve',
    lastName: 'Davis',
    dob: new Date('1995-07-19'),
    gender: 'Female',
    phone: '555-0105',
    email: 'eve.davis@example.com',
    address: '202 Birch St, Anytown',
  },
];

const PatientTable = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    setSelectedPatient(null);
    setIsFormOpen(true);
  };

  const handleEdit = (patient: Patient) => {
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

  const rowData = [
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ];

  const columnDefs = [
    { field: 'make', headerName: 'Make', sortable: true, filter: true },
    { field: 'model', headerName: 'Model', sortable: true, filter: true },
    { field: 'price', headerName: 'Price', sortable: true, filter: true },
    { field: 'electric', headerName: 'Electric', sortable: true, filter: true },
  ];

  const getContextMenuItems = (params: any) => {
    const result = [
      {
        label: 'Add',
        action: () => console.log('Add Row', params),
      },
      {
        label: 'Edit',
        action: () => console.log('Edit Row', params),
      },
      {
        label: 'View',
        action: () => console.log('View Row', params),
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
        {/* <Table>
          <TableHeader className="sticky top-0 bg-card z-10">
            <TableRow>
              <TableHead>MRN</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>D.O.B</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.mrn}</TableCell>
                <TableCell>{patient.firstName} {patient.lastName}</TableCell>
                <TableCell>{format(patient.dob, 'MM/dd/yyyy')}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>
                  <div>{patient.phone}</div>
                  <div className="text-xs text-muted-foreground">{patient.email}</div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleView(patient)}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(patient)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Patient
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleAddNew}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add New Patient
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}
        <DataGrid rowData={rowData} columnDefs={columnDefs} enablePagination={true} getContextMenuItems={getContextMenuItems} />

        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">{selectedPatient ? 'Edit Patient Details' : 'Add New Patient'}</DialogTitle>
            <DialogDescription>
              {selectedPatient ? 'Update the information for this patient.' : 'Fill in the details for the new patient.'}
            </DialogDescription>
          </DialogHeader>
          <PatientForm patient={selectedPatient} onSave={handleSavePatient} onCancel={() => setIsFormOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-3 py-4">
              <p>
                <strong>MRN:</strong> {selectedPatient.mrn}
              </p>
              <p>
                <strong>Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {format(selectedPatient.dob, 'MMMM dd, yyyy')}
              </p>
              <p>
                <strong>Gender:</strong> {selectedPatient.gender}
              </p>
              <p>
                <strong>Phone:</strong> {selectedPatient.phone}
              </p>
              <p>
                <strong>Email:</strong> {selectedPatient.email}
              </p>
              <p>
                <strong>Address:</strong> {selectedPatient.address}
              </p>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsViewOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientTable;
