import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import type { DepartmentType } from '@/types';

interface DepartmentTypeFormProps {
  departmentType?: DepartmentType | null;
  onSave: (data: DepartmentType) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const DepartmentTypeForm: React.FC<DepartmentTypeFormProps> = ({ departmentType, onSave, onCancel, readOnly = false }) => {
  const [name, setName] = useState(departmentType?.name || '');

  useEffect(() => {
    setName(departmentType?.name || '');
  }, [departmentType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: departmentType?.id || Math.floor(Math.random() * 100000), name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <DialogDescription>
        {readOnly ? 'View all information for this department type.' : departmentType ? 'Update the information for this department type.' : 'Fill in the details for the new department type.'}
      </DialogDescription>
      <div>
        <label className="block text-sm font-medium mb-1">Department Type Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required disabled={readOnly} />
      </div>
      {!readOnly && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{departmentType ? 'Save' : 'Add'}</Button>
        </div>
      )}
    </form>
  );
};

export default DepartmentTypeForm;
