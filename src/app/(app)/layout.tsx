
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
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Logo />
            <MainNav />
          </div>
        </header>
        <main className="flex-grow overflow-hidden flex flex-col">
          <TabManager />
          {/* The 'children' prop is used by Next.js for the current page matched by the route.
              In a tabbed interface, this might be less relevant if all content is in tabs.
              It could be a default dashboard view if no tabs are open, or if '/(app)' is hit directly.
              For now, TabManager will handle the main content area.
              If children is intended for default content when no tabs are active or a specific route like /dashboard is hit,
              it needs to be conditionally rendered based on tabs state.
              Currently, TabManager shows a message if no tabs are open.
           */}
           {children}
        </main>
      </div>
    </TabProvider>
  );
}
