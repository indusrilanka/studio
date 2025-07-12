import React, { useState, useEffect } from "react";

export interface DynamicFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select';
  required?: boolean;
  options?: { label: string; value: any }[]; // for select
  defaultValue?: any;
  readOnly?: boolean;
}

interface DynamicFormProps {
  initialData?: { [key: string]: any } | null;
  onSave: (data: any) => void;
  onClose: () => void;
  fields: DynamicFormField[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ initialData, onSave, onClose, fields }) => {
  const [form, setForm] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const initial: { [key: string]: any } = {};
    fields.forEach(f => {
      initial[f.name] = initialData?.[f.name] ?? f.defaultValue ?? '';
    });
    setForm(initial);
  }, [initialData, fields]);

  const handleChange = (name: string, value: any) => {
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      {fields.map(field => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">{field.label}</label>
          {field.type === 'text' || field.type === 'number' ? (
            <input
              type={field.type}
              name={field.name}
              className="w-full border rounded px-2 py-1"
              value={form[field.name]}
              onChange={e => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
              required={field.required}
              readOnly={field.readOnly}
            />
          ) : field.type === 'textarea' ? (
            <textarea
              name={field.name}
              className="w-full border rounded px-2 py-1 min-h-[60px]"
              value={form[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              required={field.required}
              readOnly={field.readOnly}
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              className="w-full border rounded px-2 py-1"
              value={form[field.name]}
              onChange={e => handleChange(field.name, e.target.value)}
              required={field.required}
              disabled={field.readOnly}
            >
              <option value="">Select...</option>
              {field.options?.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : null}
        </div>
      ))}
      <div className="flex justify-end gap-2">
        <button type="button" className="px-3 py-1 bg-gray-200 rounded" onClick={onClose}>Close</button>
        <button type="submit" className="px-3 py-1 bg-primary text-white rounded">Save</button>
      </div>

    </form>
  );
};

export default DynamicForm;
