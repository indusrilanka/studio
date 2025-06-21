import React, { useEffect, useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { fetchReferringDoctors } from '@/ai/fakeReferringDoctorAPI';
import type { ReferringDoctor } from '@/types';
import ReferringDoctorForm from './ReferringDoctorForm';
import DataGrid from '@/components/core/data-grid';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ReferringDoctorTable: React.FC = () => {
  const [doctors, setDoctors] = useState<ReferringDoctor[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<ReferringDoctor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReferringDoctors().then(setDoctors);
  }, []);

  const handleAdd = () => {
    setSelectedDoctor(null);
    setIsFormOpen(true);
  };

  const handleEdit = (doctor: ReferringDoctor) => {
    setSelectedDoctor(doctor);
    setIsFormOpen(true);
  };

  const handleView = (doctor: ReferringDoctor) => {
    setSelectedDoctor(doctor);
    setIsViewOpen(true);
  };

  const handleSave = (data: ReferringDoctor) => {
    if (selectedDoctor) {
      setDoctors(doctors.map(d => d.id === data.id ? data : d));
    } else {
      setDoctors([...doctors, { ...data, id: Math.max(0, ...doctors.map(d => d.id)) + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedDoctor(null);
  };

  const filteredDoctors = useMemo(() =>
    searchTerm ? doctors.filter((d) => d.fullName.toLowerCase().includes(searchTerm.toLowerCase())) : doctors,
    [doctors, searchTerm]
  );

  const doctorColumnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'fullName', headerName: 'Full Name', sortable: true, filter: true },
    { field: 'specialty', headerName: 'Specialty', sortable: true, filter: true },
    { field: 'contactNumber', headerName: 'Contact Number', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true },
  ];

  const getContextMenuItems = (row: ReferringDoctor) => [
    { label: 'Edit', action: () => handleEdit(row) },
    { label: 'View', action: () => handleView(row) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search referring doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Referring Doctor
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid
          rowData={filteredDoctors}
          columnDefs={doctorColumnDefs}
          enablePagination={true}
          getContextMenuItems={getContextMenuItems}
          onRowClicked={(event: any) => handleEdit(event.data)}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Dialog open={isFormOpen || isViewOpen} onOpenChange={open => { setIsFormOpen(open); setIsViewOpen(false); }}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">
              {isViewOpen ? 'Referring Doctor Details' : selectedDoctor ? 'Edit Referring Doctor' : 'Add Referring Doctor'}
            </DialogTitle>
            <DialogDescription>
              {isViewOpen
                ? 'View all information for this referring doctor.'
                : selectedDoctor
                ? 'Update the information for this referring doctor.'
                : 'Fill in the details for the new referring doctor.'}
            </DialogDescription>
          </DialogHeader>
          <ReferringDoctorForm
            doctor={selectedDoctor}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setIsViewOpen(false);
              setSelectedDoctor(null);
            }}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReferringDoctorTable;
