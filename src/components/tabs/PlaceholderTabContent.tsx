"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PlaceholderTabContentProps {
  title: string;
}

const PlaceholderTabContent: React.FC<PlaceholderTabContentProps> = ({ title }) => {
  return (
    <div className="p-4 md:p-6 h-full flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            This section is under development. Content for "{title}" will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderTabContent;
