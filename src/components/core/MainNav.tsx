"use client";

import React from 'react';
import { Users, FileText, FlaskConical, Database, BarChart3, Settings, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTabs } from '@/contexts/TabContext';
import type { NavLink } from '@/types';

const navLinks: NavLink[] = [
  { id: 'patients', label: 'Patient', icon: Users, contentKey: 'patients' },
  { id: 'invoices', label: 'Invoice', icon: FileText, contentKey: 'invoices' },
  { id: 'laboratory', label: 'Laboratory', icon: FlaskConical, contentKey: 'laboratory' },
  { id: 'master-data', label: 'Master Data', icon: Database, contentKey: 'master-data' },
  { id: 'reports', label: 'Report', icon: BarChart3, contentKey: 'reports' },
  { id: 'system', label: 'System', icon: Settings, contentKey: 'system' },
];

const MainNav = () => {
  const { openTab } = useTabs();

  const handleNavClick = (link: NavLink) => {
    openTab({ title: link.label, contentKey: link.contentKey, icon: link.icon });
  };

  return (
    <nav className="flex items-center space-x-1">
      {navLinks.map((link) => (
        <Button
          key={link.id}
          variant="ghost"
          className="text-foreground hover:bg-accent/10 hover:text-accent-foreground px-3 py-2 flex items-center space-x-2 rounded-md"
          onClick={() => handleNavClick(link)}
        >
          <link.icon className="h-5 w-5" />
          <span className="font-medium">{link.label}</span>
        </Button>
      ))}
    </nav>
  );
};

export default MainNav;
