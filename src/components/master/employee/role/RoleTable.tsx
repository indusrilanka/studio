import React, { useEffect, useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Eye } from 'lucide-react';
import { fetchRoles } from '@/ai/fakeRoleAPI';
import type { Role } from '@/types';
import RoleForm from './RoleForm';
import DataGrid from '@/components/core/data-grid';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const RoleTable: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRoles().then(setRoles);
  }, []);

  const handleAdd = () => {
    setSelectedRole(null);
    setIsFormOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsFormOpen(true);
  };

  const handleView = (role: Role) => {
    setSelectedRole(role);
    setIsViewOpen(true);
  };

  const handleSave = (data: Role) => {
    if (selectedRole) {
      setRoles(roles.map(r => r.id === data.id ? data : r));
    } else {
      setRoles([...roles, { ...data, id: Math.max(0, ...roles.map(r => r.id)) + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedRole(null);
  };

  const filteredRoles = useMemo(() =>
    searchTerm ? roles.filter((role) => role.name.toLowerCase().includes(searchTerm.toLowerCase())) : roles,
    [roles, searchTerm]
  );

  const roleColumnDefs = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'name', headerName: 'Role Name', sortable: true, filter: true },
  ];

  const getContextMenuItems = (row: Role) => [
    { label: 'Edit', action: () => handleEdit(row) },
    { label: 'View', action: () => handleView(row) },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Role
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid
          rowData={filteredRoles}
          columnDefs={roleColumnDefs}
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
              {isViewOpen ? 'Role Details' : selectedRole ? 'Edit Role' : 'Add Role'}
            </DialogTitle>
            
          </DialogHeader>
          <RoleForm
            role={selectedRole}
            onSave={handleSave}
            onCancel={() => {
              setIsFormOpen(false);
              setIsViewOpen(false);
              setSelectedRole(null);
            }}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RoleTable;
