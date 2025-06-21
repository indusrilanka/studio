import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit } from 'lucide-react';
import { fetchDepartmentTypes } from '@/ai/fakeDepartmentTypeAPI';
import type { DepartmentType } from '@/types';

const DepartmentTypeTable: React.FC = () => {
  const [types, setTypes] = useState<DepartmentType[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<DepartmentType | null>(null);
  const [name, setName] = useState('');

  useEffect(() => {
    fetchDepartmentTypes().then(setTypes);
  }, []);

  const handleAdd = () => {
    setSelectedType(null);
    setName('');
    setIsFormOpen(true);
  };

  const handleEdit = (type: DepartmentType) => {
    setSelectedType(type);
    setName(type.name);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (selectedType) {
      setTypes(types.map(t => t.id === selectedType.id ? { ...t, name } : t));
    } else {
      setTypes([...types, { id: types.length ? Math.max(...types.map(t => t.id)) + 1 : 1, name }]);
    }
    setIsFormOpen(false);
    setSelectedType(null);
    setName('');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Department Types</h3>
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground"><PlusCircle className="mr-2 h-5 w-5" />Add Department Type</Button>
      </div>
      <div className="border rounded-md overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map(type => (
              <tr key={type.id} className="border-t">
                <td className="px-4 py-2">{type.id}</td>
                <td className="px-4 py-2">{type.name}</td>
                <td className="px-4 py-2 text-center">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(type)}><Edit className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedType ? 'Edit Department Type' : 'Add Department Type'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={e => { e.preventDefault(); handleSave(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
              <Button type="submit">{selectedType ? 'Save' : 'Add'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepartmentTypeTable;
