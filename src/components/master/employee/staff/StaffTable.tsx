import React, { useEffect, useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { fetchStaff } from '@/ai/fakeStaffAPI';
import type { Staff } from '@/types';
import StaffForm from './StaffForm';
import DataGrid from '@/components/core/data-grid';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const StaffTable: React.FC = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStaff().then(setStaff);
  }, []);

  const handleAdd = () => {
    setSelectedStaff(null);
    setIsFormOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsFormOpen(true);
  };

  const handleView = (staff: Staff) => {
    setSelectedStaff(staff);
    setIsViewOpen(true);
  };

  const handleSave = (data: Staff) => {
    if (selectedStaff) {
      setStaff(staff.map(s => s.id === data.id ? data : s));
    } else {
      setStaff([...staff, { ...data, id: Math.max(0, ...staff.map(s => s.id)) + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedStaff(null);
  };

  const filteredStaff = useMemo(() =>
    searchTerm ? staff.filter((s) => s.fullName.toLowerCase().includes(searchTerm.toLowerCase())) : staff,
    [staff, searchTerm]
  );

  const staffColumnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'fullName', headerName: 'Full Name', sortable: true, filter: true },
    { field: 'roleId', headerName: 'Role', sortable: true, filter: true },
    { field: 'departmentCode', headerName: 'Department Code', sortable: true, filter: true },
    { field: 'contactNumber', headerName: 'Contact Number', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true },
  ];

  const getContextMenuItems = (row: Staff) => [
    { label: 'Edit', action: () => handleEdit(row) },
    { label: 'View', action: () => handleView(row) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search staff..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Staff
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid
          rowData={filteredStaff}
          columnDefs={staffColumnDefs}
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
              {isViewOpen ? 'Staff Details' : selectedStaff ? 'Edit Staff' : 'Add Staff'}
            </DialogTitle>
            <DialogDescription>
              {isViewOpen
                ? 'View all information for this staff member.'
                : selectedStaff
                ? 'Update the information for this staff member.'
                : 'Fill in the details for the new staff member.'}
            </DialogDescription>
          </DialogHeader>
          <StaffForm
            staff={selectedStaff}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setIsViewOpen(false);
              setSelectedStaff(null);
            }}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffTable;
