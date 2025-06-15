import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ModuleRegistry,
  AllCommunityModule,
  ColDef,
  themeMaterial,
  themeBalham,
  themeQuartz,
  colorSchemeDark,
  colorSchemeLight,
} from 'ag-grid-community';
import { ContextMenuState, DataGridProps } from '@/types';
import ContextMenu from './ContextMenu';
import { useTheme } from 'next-themes';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function DataGrid<T>({
  rowData,
  columnDefs,
  getContextMenuItems,
  height,
  onRowClicked,
  enablePagination = false,
}: DataGridProps<T>) {
  const { theme } = useTheme();
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState<T>>({
    visible: false,
    x: 0,
    y: 0,
    rowData: null,
    colDef: null,
  });

  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((params: any) => {
    params.event.preventDefault();
    params.event.stopPropagation(); // 👈 this is crucial
    setContextMenuState({
      visible: true,
      x: params.event.clientX,
      y: params.event.clientY,
      rowData: params.data,
      colDef: params.colDef,
    });
  }, []);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setContextMenuState((prev) => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // const handleMenuClick = (action: string) => {
  //   const field = contextMenuState.colDef?.field;
  //   const value = field ? contextMenuState.rowData?.[field as keyof T] : undefined;
  //   alert(`${action} on ${field}: ${value}`);
  //   setContextMenuState({ ...contextMenuState, visible: false });
  // };

  const handleCloseMenu = () => {
    setContextMenuState((prev) => ({ ...prev, visible: false }));
  };

  const myDarkTheme = themeQuartz.withPart(colorSchemeDark).withParams({
    accentColor: '#10b981', // Emerald green (Tailwind's green-500)
    backgroundColor: '#121212', // Deep black for true dark mode
    foregroundColor: '#f0fdf4', // Light greenish text (soft on dark)
    headerBackgroundColor: '#1e293b', // Slate-800: dark navy header
    headerFontSize: 14,
    inputBackgroundColor: '#334155', // Darker slate input (slate-700)
    rowHoverColor: '#1f3d32', // Subtle emerald hover
    borderColor: '#334155', // Gridline visibility (same as inputs)
    fontSize: 14,
  });

  const myLightTheme = themeQuartz.withPart(colorSchemeLight).withParams({
    accentColor: '#16a34a', // Tailwind green-600 (for buttons, checkboxes, etc.)
    backgroundColor: '#f9fefc', // Very light mint (entire grid bg)
    foregroundColor: '#1b4332', // Dark green (text)
    headerBackgroundColor: '#e0f2e9', // Pale mint (header row)
    headerFontSize: 14,
    inputBackgroundColor: '#C2DEBE', // Pale green input bg
    rowHoverColor: '#d1fae5', // Hover row (subtle mint highlight)
    fontSize: 14,
    borderColor: '#d1d5db', // Gray-300 border (subtle separation)
  });

  const getGridTheme = useMemo(() => {
    console.log(theme);
    return theme === 'dark' ? myDarkTheme : myLightTheme;
  }, [theme]);

  return (
    <div className="flex-grow" style={{ height: '70vh' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        onRowClicked={onRowClicked}
        onCellContextMenu={handleContextMenu}
        pagination={enablePagination}
        paginationPageSize={20}
        theme={getGridTheme}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
        }}
      />
      {/* {contextMenu.visible && (
        <div
          ref={menuRef}
          className="fixed bg-white border rounded shadow-lg z-50 text-sm text-gray-800"
          style={{
            top: contextMenu.y,
            left: contextMenu.x,
            minWidth: '150px',
          }}
        >
          <ul className="divide-y divide-gray-200">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick('Edit')}>
              ✏️ Edit
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleMenuClick('Delete')}>
              🗑️ Delete
            </li>
          </ul>
        </div>
      )} */}
      {contextMenuState.visible && contextMenuState.rowData && contextMenuState.colDef && (
        <ContextMenu
          x={contextMenuState.x}
          y={contextMenuState.y}
          onClose={handleCloseMenu}
          items={getContextMenuItems ? getContextMenuItems(contextMenuState.rowData, contextMenuState.colDef) : []}
        />
      )}
    </div>
  );
}
