import React from 'react';

export interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'danger';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      onClick,
      title,
      size = 'md',
      variant = 'default',
      disabled = false,
      className = '',
      type = 'button',
    },
    ref
  ) => {
    // Size variants
    const sizeClasses = {
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-3',
    };

    // Variant styles using CSS variables
    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        color: 'var(--color-text)',
      },
      primary: {
        color: 'var(--color-primary)',
      },
      danger: {
        color: 'var(--color-error)',
      },
    };

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        title={title}
        disabled={disabled}
        className={`
          rounded-lg transition-all duration-200
          hover:bg-black/10 dark:hover:bg-white/10
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent
          ${sizeClasses[size]}
          ${className}
        `.trim()}
        style={{
          ...variantStyles[variant],
          ...(variant === 'primary' && {
            '--tw-ring-color': 'var(--color-primary)',
          } as React.CSSProperties),
          ...(variant === 'danger' && {
            '--tw-ring-color': 'var(--color-error)',
          } as React.CSSProperties),
        }}
        aria-label={title}
      >
        {icon}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
