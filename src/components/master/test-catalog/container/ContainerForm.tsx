import React, { useState, useEffect } from 'react';
import type { Container } from '@/types';
import { addContainer, updateContainer } from '@/ai/fakeContainerAPI';
import { Button } from '@/components/ui/button';

interface Props {
  initialData?: Container | null;
  onSave: (data: Container) => void;
  onClose: () => void;
  readOnly?: boolean;
}

const ContainerForm: React.FC<Props> = ({ initialData, onSave, onClose, readOnly }) => {
  const [form, setForm] = useState<Omit<Container, 'containerId'>>({ containerName: '', description: '' });

  useEffect(() => {
    if (initialData) {
      setForm({ containerName: initialData.containerName, description: initialData.description });
    } else {
      setForm({ containerName: '', description: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let saved: Container;
    if (initialData && initialData.containerId) {
      saved = await updateContainer({ ...initialData, ...form });
    } else {
      saved = await addContainer(form);
    }
    onSave(saved);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Container'
          : initialData && initialData.containerId
          ? 'Edit Container'
          : 'Add Container'}
      </h3>
      <input
        name="containerName"
        placeholder="Container Name"
        value={form.containerName}
        onChange={handleChange}
        required
        disabled={readOnly}
        className="w-full border rounded px-2 py-1"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        disabled={readOnly}
        className="w-full border rounded px-2 py-1 min-h-[60px]"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        {!readOnly && <Button type="submit">Save</Button>}
      </div>
    </form>
  );
};

export default ContainerForm;
