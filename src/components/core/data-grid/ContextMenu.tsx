// components/ContextMenu.tsx
import React, { useEffect, useRef } from 'react';

export type ContextMenuItem = {
  label: string;
  action: () => void;
  disabled?: boolean;
};

type ContextMenuProps = {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
};

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, items, onClose }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Optional: close on escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div ref={menuRef} className="fixed bg-white border border-gray-300 rounded shadow-lg z-50 min-w-[160px]" style={{ top: y, left: x }}>
      <ul className="divide-y divide-gray-200 text-sm text-gray-800">
        {items.map((item, index) => (
          <li
            key={index}
            className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
              item.disabled ? 'text-gray-400 cursor-not-allowed hover:bg-white' : ''
            }`}
            onClick={() => {
              if (!item.disabled) {
                item.action();
                onClose();
              }
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextMenu;
