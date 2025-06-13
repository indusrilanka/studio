
"use client";

import React from 'react';
import {
  Users, FileText, FlaskConical, Database, BarChart3, Settings, LogOut,
  ListChecks, UsersRound, UserCog, History, type LucideIcon, UserCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTabs } from '@/contexts/TabContext';
import type { NavLink } from '@/types';
import { useToast } from '@/hooks/use-toast';

const navLinks: NavLink[] = [
  { id: 'patients', label: 'Patient', icon: Users, contentKey: 'patients' },
  { id: 'invoices', label: 'Invoice', icon: FileText, contentKey: 'invoices' },
  { id: 'laboratory', label: 'Laboratory', icon: FlaskConical, contentKey: 'laboratory' },
  {
    id: 'master-data', label: 'Master Data', icon: Database, children: [
      { id: 'test-catalog', label: 'Test Catalog', icon: ListChecks, contentKey: 'master-data/test-catalog' },
      { id: 'referring-doctors', label: 'Referring Doctors', icon: UsersRound, contentKey: 'master-data/referring-doctors' },
    ]
  },
  { id: 'reports', label: 'Report', icon: BarChart3, contentKey: 'reports' },
  {
    id: 'system', label: 'System', icon: Settings, children: [
      { id: 'user-management', label: 'User Management', icon: UserCog, contentKey: 'system/user-management' },
      { id: 'audit-log', label: 'Audit Log', icon: History, contentKey: 'system/audit-log' },
    ]
  },
];

const MainNav = () => {
  const { openTab } = useTabs();
  const { toast } = useToast();

  const handleNavClick = (link: NavLink) => {
    if (link.contentKey) { // Ensure contentKey exists to open a tab
      openTab({ title: link.label, contentKey: link.contentKey, icon: link.icon });
    }
  };

  const handleLogout = () => {
    document.cookie = "isAuthenticated=; path=/; max-age=0"; // Clear the cookie
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    window.location.href = '/'; // Redirect to login
  };

  return (
    <nav className="flex items-center justify-between flex-grow">
      <div className="flex items-center space-x-1">
        {navLinks.map((link) => {
          if (link.children && link.children.length > 0) {
            return (
              <DropdownMenu key={link.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 flex items-center space-x-2 rounded-md"
                  >
                    <link.icon className="h-5 w-5" />
                    <span className="font-medium">{link.label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-card border-border shadow-lg">
                  {link.children.map((subLink) => (
                    <DropdownMenuItem
                      key={subLink.id}
                      onClick={() => handleNavClick(subLink)}
                      className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      <subLink.icon className="h-4 w-4 mr-2" />
                      {subLink.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          return (
            <Button
              key={link.id}
              variant="ghost"
              className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 flex items-center space-x-2 rounded-md"
              onClick={() => handleNavClick(link)}
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Button>
          );
        })}
      </div>

      {/* User profile menu */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="px-3 py-2 flex items-center space-x-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <UserCircle className="h-5 w-5" />
              <span className="text-sm font-medium hidden md:inline">Admin User</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-card border-border shadow-lg w-48">
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive hover:!bg-destructive/10 hover:!text-destructive focus:!bg-destructive/10 focus:!text-destructive cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default MainNav;
