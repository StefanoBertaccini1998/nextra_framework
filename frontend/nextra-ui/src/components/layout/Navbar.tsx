import React from 'react';
import { Button } from '../common/Button';
import ThemeSwitcher from '../ThemeSwitcher';
import { SparklesIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface NavbarProps {
  onMenuClick: () => void;
  onAiHelperClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onAiHelperClick }) => {
  return (
    <nav className="h-16 bg-surface shadow-md z-40">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onMenuClick} className="lg:hidden">
            ☰
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
           <Button 
            variant="ghost" 
            onClick={onAiHelperClick}
            className="hover:bg-surface-hover"
          >
            <SparklesIcon className="w-5 h-5 stroke-2 text-text" />
          </Button>
          <span className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">John Doe</span>
            <Button variant="ghost" size="sm">
              <UserCircleIcon className="w-5 h-5 stroke-2 text-text" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};