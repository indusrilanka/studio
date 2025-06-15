import Logo from '@/components/core/Logo';
import MainNav from '@/components/core/MainNav';
import TabManager from '@/components/core/TabManager';
import { TabProvider } from '@/contexts/TabContext';
import React from 'react';

export default function AppLayout({
  children, // children will be the page.tsx for the current route in this group
}: {
  children: React.ReactNode;
}) {
  return (
    <TabProvider>
      <div className="flex flex-col h-screen">
        <header className="bg-card border-b border-border shadow-sm print:hidden">
          <div className="px-4 h-16 flex items-center justify-between">
            <div className="mr-6">
              <Logo />
            </div>
            <MainNav />
          </div>
        </header>
        <main className="flex-grow overflow-hidden flex flex-col">
          <TabManager />
          {/* {children} Content is rendered based on active tab by TabManager */}
          {children}
        </main>
      </div>
    </TabProvider>
  );
}
