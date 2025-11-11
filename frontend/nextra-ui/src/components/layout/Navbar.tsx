import React from 'react';
import { IconButton, ThemeSwitcher } from '@nextra/ui-lib';
import { SparklesIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
  onAiHelperClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onAiHelperClick }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/settings', { state: { section: 'account' } });
  };

  return (
    <nav 
      className="sticky top-0 h-16 shadow-md z-50" 
      style={{ 
        backgroundColor: 'var(--color-navbar)'
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <IconButton
            onClick={onMenuClick}
            className="lg:hidden text-white"
            icon={<span className="text-2xl">☰</span>}
          />
        </div>
        
        <div className="flex items-center gap-4">
          {/* Theme switcher wrapper with custom styling */}
          <div>
            <ThemeSwitcher />
          </div>
          <IconButton
            onClick={onAiHelperClick}
            className="text-white"
            icon={<SparklesIcon className="w-5 h-5 stroke-2" />}
          />
          <span className="h-6 w-px bg-white/20 mx-2" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-white">John Doe</span>
            <IconButton
              onClick={handleProfileClick}
              className="text-white"
              title="Profile Settings"
              icon={<UserCircleIcon className="w-5 h-5 stroke-2" />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};