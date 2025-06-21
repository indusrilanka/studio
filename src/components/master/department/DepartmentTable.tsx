import React, { useState, useMemo, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import DataGrid from '@/components/core/data-grid';
import DepartmentForm, { DepartmentFormValues } from './DepartmentForm';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import { fetchStaff } from '@/ai/fakeStaffAPI';
import { fetchDepartments } from '@/ai/fakeDepartmentApi';
import type { DepartmentType, Staff,Department } from '@/types';



const DepartmentTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentTypes, setDepartmentTypes] = useState<DepartmentType[]>([]);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    fetchDepartmentTypes().then(setDepartmentTypes);
    fetchStaff().then(setStaffList);
    fetchDepartments().then(setDepartments);
  }, []);

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
      setDepartments(
        departments.map((d) =>
          d.id === selectedDepartment.id
            ? { ...d, ...data, id: d.id }
            : d
        )
      );
    } else {
// Adding a new department
      setDepartments([
        ...departments,
        {
            id: departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1,
            name: data.name,
            description: data.description ?? '',
            departmentCode: '', // Ensure departmentCode is present
            departmentTypeId: data.departmentTypeId ?? 0,
            headOfDepartmentId: data.headOfDepartmentId ?? 0,
            location: data.location ?? '',
            contactNumber: data.contactNumber ?? '',
            email: data.email ?? '',
            status: 'Active'
        }
      ]);
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

  const getDepartmentTypeName = (id?: number) => departmentTypes.find(dt => dt.id === id)?.name || '';
  const getStaffName = (id?: number) => staffList.find(s => s.id === id)?.fullName || '';

  const departmentColumnDefs = [
    { field: 'name', headerName: 'Department Name', sortable: true, filter: true },
    { field: 'departmentTypeId', headerName: 'Department Type', valueGetter: (params: any) => getDepartmentTypeName(params.data.departmentTypeId), sortable: true, filter: true },
    { field: 'headOfDepartmentId', headerName: 'Head of Department', valueGetter: (params: any) => getStaffName(params.data.headOfDepartmentId), sortable: true, filter: true },
    { field: 'contactNumber', headerName: 'Contact Number', sortable: true, filter: true },
    { field: 'email', headerName: 'Email', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true },
    { field: 'location', headerName: 'Location', sortable: true, filter: true },
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
