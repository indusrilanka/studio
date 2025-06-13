"use client";

import type { TabItem } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface TabContextType {
  tabs: TabItem[];
  activeTabId: string | null;
  openTab: (tab: Omit<TabItem, 'id' | 'closable'> & { id?: string, closable?: boolean }) => void;
  closeTab: (tabId: string) => void;
  setActiveTabId: (tabId: string | null) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const [activeTabId, setActiveTabIdState] = useState<string | null>(null);

  const openTab = useCallback((tabData: Omit<TabItem, 'id' | 'closable'> & { id?: string, closable?: boolean }) => {
    const tabId = tabData.id || tabData.contentKey; // Use contentKey as ID if specific ID not provided
    
    setTabs(prevTabs => {
      const existingTab = prevTabs.find(t => t.id === tabId);
      if (existingTab) {
        setActiveTabIdState(tabId);
        return prevTabs;
      }
      const newTab: TabItem = {
        ...tabData,
        id: tabId,
        closable: tabData.closable !== undefined ? tabData.closable : true,
      };
      return [...prevTabs, newTab];
    });
    setActiveTabIdState(tabId);
  }, []);

  const closeTab = useCallback((tabId: string) => {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(t => t.id !== tabId);
      if (activeTabId === tabId) {
        setActiveTabIdState(newTabs.length > 0 ? newTabs[newTabs.length - 1].id : null);
      }
      return newTabs;
    });
  }, [activeTabId]);

  const setActiveTabId = useCallback((tabId: string | null) => {
    setActiveTabIdState(tabId);
  }, []);

  return (
    <TabContext.Provider value={{ tabs, activeTabId, openTab, closeTab, setActiveTabId }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
};
