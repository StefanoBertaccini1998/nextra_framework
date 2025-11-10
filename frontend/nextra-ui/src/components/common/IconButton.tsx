import React from 'react';

type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: IconButtonSize;
  isActive?: boolean;
  color?: 'white' | 'primary' | 'text';
}

export const IconButton: React.FC<IconButtonProps> = ({
  size = 'md',
  isActive = false,
  color = 'text',
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'rounded-lg transition-all duration-200 focus:outline-none inline-flex items-center justify-center';
  
  const colorClasses = {
    white: 'text-white hover:text-white/80 focus:ring-white/30 bg-transparent hover:bg-white/10',
    primary: 'text-primary hover:text-primary-hover focus:ring-primary/30 bg-transparent hover:bg-primary/10',
    text: 'text-text hover:text-text-hover focus:ring-primary/30 bg-transparent hover:bg-text/10',
  };

  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const activeClasses = isActive ? 'bg-white/10' : '';

  const combinedClasses = `${baseClasses} ${colorClasses[color]} ${sizeClasses[size]} ${activeClasses} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};