import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import DataGrid from '@/components/core/data-grid';
import DepartmentForm, { DepartmentFormValues } from './DepartmentForm';

export interface Department extends DepartmentFormValues {
  id: string;
}

const initialDepartments: Department[] = [
  { id: '1', name: 'Cardiology', description: 'Heart and vascular care' },
  { id: '2', name: 'Neurology', description: 'Brain and nervous system' },
  { id: '3', name: 'Pediatrics', description: 'Child health' },
];

const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNew = () => {
    setSelectedDepartment(null);
    setIsFormOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDepartment(dept);
    setIsFormOpen(true);
  };

  const handleView = (dept: Department) => {
    setSelectedDepartment(dept);
    setIsViewOpen(true);
  };

  const handleSaveDepartment = (data: DepartmentFormValues) => {
    if (selectedDepartment) {
      setDepartments(departments.map((d) => (d.id === selectedDepartment.id ? { ...d, ...data } : d)));
    } else {
      setDepartments([...departments, { ...data, id: crypto.randomUUID() }]);
    }
    setIsFormOpen(false);
    setSelectedDepartment(null);
  };

  const filteredDepartments = useMemo(() => {
    if (!searchTerm) return departments;
    return departments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dept.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    );
  }, [departments, searchTerm]);

  const departmentColumnDefs = [
    { field: 'name', headerName: 'Department Name', sortable: true, filter: true },
    { field: 'description', headerName: 'Description', sortable: true, filter: true },
  ];

  const getContextMenuItems = (params: any) => [
    { label: 'Edit', action: () => handleEdit(params) },
    { label: 'View', action: () => handleView(params) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddNew} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Department
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid rowData={filteredDepartments} columnDefs={departmentColumnDefs} enablePagination={true} getContextMenuItems={getContextMenuItems} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Dialog open={isFormOpen || isViewOpen} onOpenChange={open => { setIsFormOpen(open); setIsViewOpen(false); }}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">
              {isViewOpen ? 'Department Details' : selectedDepartment ? 'Edit Department' : 'Add New Department'}
            </DialogTitle>
          </DialogHeader>
          <DepartmentForm
            department={selectedDepartment}
            onSave={handleSaveDepartment}
            onCancel={() => {
              setIsFormOpen(false);
              setIsViewOpen(false);
              setSelectedDepartment(null);
            }}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentTable;
