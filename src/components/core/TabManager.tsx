'use client';

import React from 'react';
import { Tabs as ShadTabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTabs } from '@/contexts/TabContext';
import { Button } from '@/components/ui/button';
import { X as XIcon } from 'lucide-react';
import TabContentRenderer from './TabContentRenderer';

const TabManager = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab } = useTabs();

  if (tabs.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <p className="text-muted-foreground">No tabs open. Select an item from the navigation to begin.</p>
      </div>
    );
  }

  return (
    
    <ShadTabs value={activeTabId || ''} onValueChange={setActiveTabId} className="flex flex-col flex-grow h-full">
      <TabsList className="bg-muted print:hidden rounded-none border-b border-border justify-start px-2">
        {tabs.map((tab) => (
          <div key={tab.id} className="relative flex items-center group">
            <TabsTrigger
              value={tab.id}
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary rounded-t-md rounded-b-none border-t border-x border-transparent data-[state=active]:border-border data-[state=active]:border-b-background pr-8"
            >
              {tab.icon && <tab.icon className="h-4 w-4 mr-2" />}
              {tab.title}
            </TabsTrigger>

            {tab.closable !== false && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-5 w-5 opacity-50 group-hover:opacity-100 data-[state=active]:opacity-100 z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
              >
                <XIcon className="h-3 w-3" />
                <span className="sr-only">Close tab</span>
              </Button>
            )}
          </div>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="flex-grow mt-0 bg-background overflow-auto h-[calc(100%-2.5rem)]">
          {activeTabId === tab.id && <TabContentRenderer tab={tab} />}
        </TabsContent>
      ))}

      {activeTabId && !tabs.find((t) => t.id === activeTabId) && (
        <div className="flex-grow flex items-center justify-center p-4">
          <p className="text-muted-foreground">Selected tab content not found.</p>
        </div>
      )}
    </ShadTabs>
  );
};

export default TabManager;
