import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

export interface Department {
  id: string;
  name: string;
  description?: string;
}

const initialDepartments: Department[] = [
  { id: '1', name: 'Cardiology', description: 'Heart and vascular care' },
  { id: '2', name: 'Neurology', description: 'Brain and nervous system' },
  { id: '3', name: 'Pediatrics', description: 'Child health' },
];

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const handleAdd = () => {
    setSelectedDepartment(null);
    setIsFormOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setSelectedDepartment(dept);
    setIsFormOpen(true);
  };

  const handleSave = (dept: Department) => {
    if (selectedDepartment) {
      setDepartments(departments.map(d => d.id === dept.id ? dept : d));
    } else {
      setDepartments([...departments, { ...dept, id: crypto.randomUUID() }]);
    }
    setIsFormOpen(false);
    setSelectedDepartment(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Departments</h2>
        <Button onClick={handleAdd}>Add Department</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {departments.map((dept) => (
            <TableRow key={dept.id}>
              <TableCell>{dept.name}</TableCell>
              <TableCell>{dept.description}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => handleEdit(dept)}>Edit</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedDepartment ? 'Edit Department' : 'Add Department'}</DialogTitle>
          </DialogHeader>
          <DepartmentForm
            department={selectedDepartment}
            onSave={handleSave}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface DepartmentFormProps {
  department?: Department | null;
  onSave: (dept: Department) => void;
  onCancel: () => void;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, onSave, onCancel }) => {
  const [name, setName] = useState(department?.name || '');
  const [description, setDescription] = useState(department?.description || '');

  React.useEffect(() => {
    setName(department?.name || '');
    setDescription(department?.description || '');
  }, [department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: department?.id || crypto.randomUUID(), name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Department Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">{department ? 'Save' : 'Add'}</Button>
      </div>
    </form>
  );
};

export default DepartmentList;
