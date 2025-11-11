import React from 'react';
import cn from 'classnames';

interface SidebarProps {
  children: React.ReactNode;
  className?: string;
  width?: 'sm' | 'md' | 'lg';
  position?: 'left' | 'right';
}

export const Sidebar: React.FC<SidebarProps> = ({
  children,
  className,
  width = 'md',
  position = 'left'
}) => {
  const widthClasses = {
    sm: 'w-64',
    md: 'w-72',
    lg: 'w-80'
  };

  return (
    <aside
      className={cn(
        'h-full bg-white border-gray-200',
        position === 'left' ? 'border-r' : 'border-l',
        widthClasses[width],
        className
      )}
    >
      {children}
    </aside>
  );
};

export default Sidebar;
