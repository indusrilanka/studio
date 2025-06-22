import React, { useEffect, useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import type { DepartmentType } from '@/types';
import DepartmentTypeForm from './DepartmentTypeForm';
import DataGrid from '@/components/core/data-grid';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const DepartmentTypeTable: React.FC = () => {
  const [types, setTypes] = useState<DepartmentType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<DepartmentType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDepartmentTypes().then(setTypes);
  }, []);

  const handleAdd = () => {
    setSelectedType(null);
    setIsFormOpen(true);
  };

  const handleEdit = (type: DepartmentType) => {
    setSelectedType(type);
    setIsFormOpen(true);
  };

  const handleView = (type: DepartmentType) => {
    setSelectedType(type);
    setIsViewOpen(true);
  };

  const handleSave = (data: DepartmentType) => {
    if (selectedType) {
      setTypes(types.map(t => t.id === data.id ? data : t));
    } else {
      setTypes([...types, { ...data, id: Math.max(0, ...types.map(t => t.id)) + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedType(null);
  };

  const filteredTypes = useMemo(() =>
    searchTerm ? types.filter((type) => type.name.toLowerCase().includes(searchTerm.toLowerCase())) : types,
    [types, searchTerm]
  );

  const departmentTypeColumnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Name', sortable: true, filter: true },
  ];

  const getContextMenuItems = (row: DepartmentType) => [
    { label: 'Edit', action: () => handleEdit(row) },
    { label: 'View', action: () => handleView(row) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search department types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Department Type
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid
          rowData={filteredTypes}
          columnDefs={departmentTypeColumnDefs}
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
              {isViewOpen ? 'Department Type Details' : selectedType ? 'Edit Department Type' : 'Add Department Type'}
            </DialogTitle>
        
          </DialogHeader>
          <DepartmentTypeForm
            departmentType={selectedType}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setIsViewOpen(false);
              setSelectedType(null);
            }}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentTypeTable;
