import React, { useState, useEffect } from 'react';
import DataGrid from '../../core/data-grid';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { PlusCircle } from 'lucide-react';
import { ScrollArea, ScrollBar } from '../../ui/scroll-area';
import MasterDataDialog from './MasterDataDialog';

interface MasterDataTableProps<T> {
  columns: any[];
  api: any;
  FormComponent: React.ComponentType<any>;
  entityName: string;
  searchPlaceholder: string;
}

export default function MasterDataTable<T>({
  columns,
  api,
  FormComponent,
  entityName,
  searchPlaceholder,
}: MasterDataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [selected, setSelected] = useState<T | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    api.getAll().then(setData);
  }, [api]);

  const handleEdit = (row: T) => { setSelected(row); setIsFormOpen(true); };
  const handleView = (row: T) => { setSelected(row); setIsViewOpen(true); };
  const handleAdd = () => { setSelected(null); setIsFormOpen(true); };
  const handleClose = () => { setIsFormOpen(false); setIsViewOpen(false); setSelected(null); };
  const handleSave = async (item: T) => {
    if ((item as any).id) await api.update((item as any).id, item);
    else await api.create(item);
    setData(await api.getAll());
    handleClose();
  };

  const getContextMenuItems = (row: T) => [
    { label: 'Edit', action: () => handleEdit(row) },
    { label: 'View', action: () => handleView(row) },
  ];

  const filteredData = data.filter((item) =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd} className="bg-primary text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add {entityName}
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid
          rowData={filteredData}
          columnDefs={columns}
          onRowClicked={row => handleEdit(row.data)}
          enablePagination
          getContextMenuItems={getContextMenuItems}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <MasterDataDialog
        open={isFormOpen || isViewOpen}
        onClose={handleClose}
        FormComponent={FormComponent}
        initialData={selected}
        readOnly={isViewOpen}
        entityName={entityName}
        isView={isViewOpen}
        onSave={handleSave}
      />
    </div>
  );
}
