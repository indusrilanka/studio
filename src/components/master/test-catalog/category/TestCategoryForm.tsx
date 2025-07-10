import React, { useState, useEffect } from 'react';
import type { TestCategory } from '@/types';
import { addTestCategory, updateTestCategory } from '@/ai/fakeTestCategoryAPI';
import { Button } from '@/components/ui/button';

interface Props {
  initialData?: TestCategory | null;
  onSave: (data: TestCategory) => void;
  onClose: () => void;
  readOnly?: boolean;
}

const TestCategoryForm: React.FC<Props> = ({ initialData, onSave, onClose, readOnly }) => {
  const [form, setForm] = useState<Omit<TestCategory, 'categoryId'>>({ categoryName: '' });

  useEffect(() => {
    if (initialData) {
      setForm({ categoryName: initialData.categoryName });
    } else {
      setForm({ categoryName: '' });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let saved: TestCategory;
    if (initialData && initialData.categoryId) {
      saved = await updateTestCategory({ ...initialData, ...form });
    } else {
      saved = await addTestCategory(form);
    }
    onSave(saved);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="text-lg font-semibold mb-2">
        {readOnly
          ? 'View Test Category'
          : initialData && initialData.categoryId
          ? 'Edit Test Category'
          : 'Add Test Category'}
      </h3>
      <input
        name="categoryName"
        placeholder="Category Name"
        value={form.categoryName}
        onChange={handleChange}
        required
        disabled={readOnly}
        className="w-full border rounded px-2 py-1"
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
        {!readOnly && <Button type="submit">Save</Button>}
      </div>
    </form>
  );
};

export default TestCategoryForm;
