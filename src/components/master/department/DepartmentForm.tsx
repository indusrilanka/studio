import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';

export interface DepartmentFormValues {
  id?: string;
  name: string;
  description?: string;
}

interface DepartmentFormProps {
  department?: DepartmentFormValues | null;
  onSave: (data: DepartmentFormValues) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, onSave, onCancel, readOnly = false }) => {
  const [name, setName] = useState(department?.name || '');
  const [description, setDescription] = useState(department?.description || '');

  useEffect(() => {
    setName(department?.name || '');
    setDescription(department?.description || '');
  }, [department]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: department?.id, name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <DialogDescription>
        {readOnly ? 'View all information for this department.' : department ? 'Update the information for this department.' : 'Fill in the details for the new department.'}
      </DialogDescription>
      <div>
        <label className="block text-sm font-medium mb-1">Department Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required disabled={readOnly} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Input value={description} onChange={e => setDescription(e.target.value)} disabled={readOnly} />
      </div>
      {!readOnly && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{department ? 'Save' : 'Add'}</Button>
        </div>
      )}
    </form>
  );
};

export default DepartmentForm;
