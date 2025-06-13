import { BeakerIcon } from 'lucide-react';
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <BeakerIcon className="h-8 w-8 text-primary" />
      <span className="text-2xl font-headline font-semibold text-primary">
        LabTrak
      </span>
    </div>
  );
};

export default Logo;
