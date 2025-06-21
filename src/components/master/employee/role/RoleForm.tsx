import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogDescription } from '@/components/ui/dialog';
import type { Role } from '@/types';

interface RoleFormProps {
  role?: Role | null;
  onSave: (data: Role) => void;
  onCancel: () => void;
  readOnly?: boolean;
}

const RoleForm: React.FC<RoleFormProps> = ({ role, onSave, onCancel, readOnly = false }) => {
  const [name, setName] = useState(role?.name || '');

  useEffect(() => {
    setName(role?.name || '');
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: role?.id || Math.floor(Math.random() * 100000), name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-1">
      <DialogDescription>
        {readOnly ? 'View all information for this role.' : role ? 'Update the information for this role.' : 'Fill in the details for the new role.'}
      </DialogDescription>
      <div>
        <label className="block text-sm font-medium mb-1">Role Name</label>
        <Input value={name} onChange={e => setName(e.target.value)} required disabled={readOnly} />
      </div>
      {!readOnly && (
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">{role ? 'Save' : 'Add'}</Button>
        </div>
      )}
    </form>
  );
};

export default RoleForm;
