'use client';

import React from 'react';
import {
  Users,
  FileText,
  FlaskConical,
  Database,
  BarChart3,
  Settings,
  LogOut,
  ListChecks,
  UsersRound,
  UserCog,
  History,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';

import { useTabs } from '@/contexts/TabContext';
import type { NavLink } from '@/types';
import { useToast } from '@/hooks/use-toast';

const navLinks: NavLink[] = [
  { id: 'patients', label: 'Patient', icon: Users, contentKey: 'patients' },
  { id: 'invoices', label: 'Invoice', icon: FileText, contentKey: 'invoices' },
  { id: 'laboratory', label: 'Laboratory', icon: FlaskConical, contentKey: 'laboratory' },
  {
    id: 'master-data',
    label: 'Master Data',
    icon: Database,
    children: [
      { id: 'test-catalog', label: 'Test Catalog', icon: ListChecks, contentKey: 'master-data/test-catalog' },
      { id: 'referring-doctors', label: 'Referring Doctors', icon: UsersRound, contentKey: 'master-data/referring-doctors' },
      { id: 'relation', label: 'Relation', icon: UserCircle, contentKey: 'master-data/relation' },
      { id: 'insurance-provider', label: 'Insurance Provider', icon: UserCog, contentKey: 'master-data/insurance-provider' },
      {
        id: 'department-group',
        label: 'Department',
        icon: Database,
        children: [
          { id: 'department', label: 'Department', icon: Settings, contentKey: 'department/department' },
          { id: 'department-type', label: 'Department Type', icon: ListChecks, contentKey: 'department/department-type' },
        ],
      },
    ],
  },
  { id: 'reports', label: 'Report', icon: BarChart3, contentKey: 'reports' },
  {
    id: 'system',
    label: 'System',
    icon: Settings,
    children: [
      { id: 'user-management', label: 'User Management', icon: UserCog, contentKey: 'system/user-management' },
      { id: 'audit-log', label: 'Audit Log', icon: History, contentKey: 'system/audit-log' },
    ],
  },
];

const MainNav = () => {
  const { openTab } = useTabs();
  const { toast } = useToast();

  const handleLogout = () => {
    document.cookie = 'isAuthenticated=; path=/; max-age=0';
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    window.location.href = '/';
  };

  const RenderNavItem = ({ link }: { link: NavLink }) => {
    const handleClick = () => {
      if (link.contentKey) {
        openTab({
          title: link.label,
          contentKey: link.contentKey,
          icon: link.icon,
        });
      }
    };

    if (link.children && link.children.length > 0) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 flex items-center space-x-2 rounded-md"
            >
              <link.icon className="h-5 w-5" />
              <span className="font-medium">{link.label}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-card border-border shadow-lg z-50">
            {link.children.map((child) =>
              child.children && child.children.length > 0 ? (
                <DropdownMenu key={child.id}>
                  <DropdownMenuTrigger asChild>
                    <DropdownMenuItem className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer">
                      <child.icon className="h-4 w-4 mr-2" />
                      {child.label}
                    </DropdownMenuItem>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="ml-2 bg-card border-border shadow-lg z-50">
                    {child.children.map((grandchild) => (
                      <DropdownMenuItem
                        key={grandchild.id}
                        onClick={() =>
                          openTab({
                            title: grandchild.label,
                            contentKey: grandchild.contentKey!,
                            icon: grandchild.icon,
                          })
                        }
                        className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      >
                        <grandchild.icon className="h-4 w-4 mr-2" />
                        {grandchild.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenuItem
                  key={child.id}
                  onClick={() =>
                    openTab({
                      title: child.label,
                      contentKey: child.contentKey!,
                      icon: child.icon,
                    })
                  }
                  className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <child.icon className="h-4 w-4 mr-2" />
                  {child.label}
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button
        key={link.id}
        variant="ghost"
        className="text-foreground hover:bg-accent hover:text-accent-foreground px-3 py-2 flex items-center space-x-2 rounded-md"
        onClick={handleClick}
      >
        <link.icon className="h-5 w-5" />
        <span className="font-medium">{link.label}</span>
      </Button>
    );
  };

  return (
    <nav className="flex items-center justify-between flex-grow">
      {/* Navigation Links */}
      <div className="flex items-center space-x-1">
        {navLinks.map((link) => (
          <RenderNavItem key={link.id} link={link} />
        ))}
      </div>

      {/* User Profile Menu */}
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
          <DropdownMenuContent align="end" className="bg-card border-border shadow-lg w-48 z-50">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-destructive hover:!bg-destructive/10 hover:!text-destructive focus:!bg-destructive/10 focus:!text-destructive dark:text-destructive-foreground dark:hover:!text-destructive-foreground dark:focus:!text-destructive-foreground"
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
