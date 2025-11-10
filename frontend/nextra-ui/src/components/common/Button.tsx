import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isActive?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isActive = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: `bg-primary text-white fill-white shadow-md hover:bg-primary-hover active:bg-primary-active focus:ring-primary/30 ${
      isActive ? 'ring-2 ring-primary shadow-lg scale-105' : ''
    }`,
    secondary: `bg-secondary text-white fill-white shadow-md hover:bg-secondary-hover active:bg-secondary-active focus:ring-secondary/30 ${
      isActive ? 'ring-2 ring-secondary shadow-lg scale-105' : ''
    }`,
    outline: `border-2 border-primary text-primary fill-primary hover:bg-primary/5 focus:ring-primary/30 ${
      isActive ? 'bg-primary/10 shadow-inner scale-105' : ''
    }`,
    ghost: `text-text fill-text hover:bg-primary/5 focus:ring-primary/30 ${
      isActive ? 'bg-primary/10 shadow-inner scale-105' : ''
    }`,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};