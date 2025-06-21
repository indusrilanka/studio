import React, { useEffect, useState } from 'react';
import { InsuranceProvider } from '../../../types';
import { fakeInsuranceProviderAPI } from '../../../ai/fakeInsuranceProviderAPI';
import DataGrid from '../../core/data-grid';
import { Button } from '../../ui/button';
import InsuranceProviderForm from './InsuranceProviderForm';
import { ColDef } from 'ag-grid-community';
import { PlusCircle } from 'lucide-react';
import { Input } from '../../ui/input';
import { ScrollArea, ScrollBar } from '../../ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';

export default function InsuranceProviderTable() {
  const [data, setData] = useState<InsuranceProvider[]>([]);
  const [selected, setSelected] = useState<InsuranceProvider | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fakeInsuranceProviderAPI.getAll().then(setData);
  }, []);

  const handleEdit = (row: InsuranceProvider) => {
    setSelected(row);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setIsFormOpen(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setIsViewOpen(false);
    setSelected(null);
  };



  const handleSave = async (provider: InsuranceProvider) => {
    if (provider.id) {
      await fakeInsuranceProviderAPI.update(provider.id, provider);
    } else {
      await fakeInsuranceProviderAPI.create(provider);
    }
    setData(await fakeInsuranceProviderAPI.getAll());
    handleClose();
  };

  const getContextMenuItems = (row: InsuranceProvider) => [
    { label: 'Edit', action: () => handleEdit(row) },
     { label: 'View', action: () => handleView(row) }
  ];

    const handleView = (row: InsuranceProvider) => {
        setSelected(row);
        setIsViewOpen(true);
    };

  const filteredData = data.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    provider.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columnDefs: ColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'code', headerName: 'Code', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact Number', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search insurance providers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd} className="bg-primary  text-primary-foreground">
          <PlusCircle className="mr-2 h-5 w-5" /> Add Insurance Provider
        </Button>
      </div>
      <ScrollArea className="rounded-md border h-[calc(100vh-18rem)]">
        <DataGrid
          rowData={filteredData}
          columnDefs={columnDefs}
          onRowClicked={(row) => handleEdit(row.data)}
          enablePagination
          getContextMenuItems={getContextMenuItems}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Dialog  open={isFormOpen || isViewOpen} onOpenChange={open => { setIsFormOpen(open); setIsViewOpen(false); }}>>
        {/* <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">
              {selected ? 'Edit Insurance Provider' : 'Add Insurance Provider'}
            </DialogTitle>
          </DialogHeader>
          <InsuranceProviderForm           
                      initialData={selected}
                      onSave={handleSave}
                      onClose={handleClose}
                      readOnly={isViewOpen}  />
          
        </DialogContent> */}

        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-headline text-primary">
              {isViewOpen ? 'Insurance Provider Details' : selected ? 'Edit Insurance Provider' : 'Add Insurance Provider'}
            </DialogTitle>
            <DialogDescription>
              {isViewOpen
                ? 'View all information for this Insurance Provider.'
                : selected
                ? 'Update the information for this Insurance Provider.'
                : 'Fill in the details for the new Insurance Provider.'}
            </DialogDescription>
          </DialogHeader>
          <InsuranceProviderForm
            initialData={selected}
            onSave={handleSave}
            onClose={handleClose}
            readOnly={isViewOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
