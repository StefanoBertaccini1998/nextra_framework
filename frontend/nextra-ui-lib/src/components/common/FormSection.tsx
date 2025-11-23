import React from 'react';

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div 
      className={`rounded-lg p-6 border ${className}`} 
      style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderColor: 'var(--color-border)' 
      }}
    >
      <h3 
        className="text-lg font-semibold mb-4" 
        style={{ color: 'var(--color-text)' }}
      >
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
