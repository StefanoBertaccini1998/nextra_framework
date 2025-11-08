import React from 'react';
import { Button } from '../common/Button';

interface AiHelperProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiHelper: React.FC<AiHelperProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`
      fixed top-0 right-0 h-screen w-80 bg-surface shadow-lg transition-transform duration-300 z-50
      ${isOpen ? 'translate-x-0' : 'translate-x-80'}
    `}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text">AI Helper</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          <p className="text-text-secondary">
            Coming soon! This AI helper will provide contextual assistance and suggestions.
          </p>
        </div>
      </div>
    </div>
  );
};