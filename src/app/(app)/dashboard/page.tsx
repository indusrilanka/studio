"use client";
import { useEffect } from 'react';
import { useTabs } from '@/contexts/TabContext';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  const { openTab, tabs } = useTabs();

  useEffect(() => {
    // Open a default "Dashboard" tab if no tabs are open or if it's not already open
    // This is a common pattern for the initial landing page in a tabbed system.
    // However, our TabManager handles the "no tabs open" message.
    // If we want a default tab:
    const dashboardTabExists = tabs.find(tab => tab.contentKey === 'dashboard');
    if (!dashboardTabExists) {
      // openTab({ title: 'Dashboard', contentKey: 'dashboard', icon: LayoutDashboard, closable: false });
      // For now, let TabManager handle the initial empty state.
    }
  }, [openTab, tabs]);


  return (
    <div className="p-6">
      {/* This content will likely be overridden by the TabManager unless explicitly handled.
          Could be a welcome message or stats if rendered as a base layer.
          For this setup, TabManager takes precedence.
      */}
      <h1 className="text-3xl font-headline text-primary">Welcome to LabTrak</h1>
      <p className="mt-2 text-lg text-foreground">
        Select an option from the navigation bar to get started.
      </p>
    </div>
  );
}
