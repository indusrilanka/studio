import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../../ui/dialog';
import React from 'react';

export default function MasterDataDialog({
  open, onClose, FormComponent, initialData, readOnly, entityName, isView, onSave
}: any) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-primary">
            {isView ? `${entityName} Details` : initialData ? `Edit ${entityName}` : `Add ${entityName}`}
          </DialogTitle>
          <DialogDescription>
            {isView
              ? `View all information for this ${entityName}.`
              : initialData
              ? `Update the information for this ${entityName}.`
              : `Fill in the details for the new ${entityName}.`}
          </DialogDescription>
        </DialogHeader>
        <FormComponent
          initialData={initialData}
          onSave={onSave}
          onClose={onClose}
          readOnly={readOnly}
        />
      </DialogContent>
    </Dialog>
  );
}
