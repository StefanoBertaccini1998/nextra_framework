import React from 'react';

/**
 * Semantic button variants for different actions
 * - primary: Main actions (Save, Submit, Confirm)
 * - secondary: Alternative actions
 * - success: Positive actions (Create, Add, Approve)
 * - danger: Destructive actions (Delete, Remove, Cancel subscription)
 * - warning: Caution actions (Archive, Reset)
 * - outline: Low emphasis actions
 * - ghost: Minimal emphasis actions
 */
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Shows loading spinner and disables interaction */
  isLoading?: boolean;
  /** Shows active/selected state with ring and scale */
  isActive?: boolean;
  /** Stretches button to full container width */
  fullWidth?: boolean;
  /** Icon element to display before text */
  startIcon?: React.ReactNode;
  /** Icon element to display after text */
  endIcon?: React.ReactNode;
}

/**
 * Enhanced Button component with theme support, loading states, and semantic variants.
 * Follows WAI-ARIA best practices for accessibility.
 * 
 * @example
 * ```tsx
 * // Primary action
 * <Button variant="primary" onClick={handleSave}>Save</Button>
 * 
 * // Success action with icon
 * <Button variant="success" startIcon={<PlusIcon />}>Add Client</Button>
 * 
 * // Loading state
 * <Button variant="primary" isLoading>Saving...</Button>
 * 
 * // Danger action (requires confirmation)
 * <Button variant="danger" onClick={handleDelete}>Delete</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isActive = false,
  fullWidth = false,
  startIcon,
  endIcon,
  className = '',
  children,
  disabled,
  type = 'button',
  ...props
}, ref) => {
  // Disable interaction when loading
  const isDisabled = disabled || isLoading;

  // Base classes - always applied
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  // Variant-specific styling with semantic colors
  const variantClasses: Record<ButtonVariant, string> = {
    primary: `bg-primary text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 focus:ring-primary/40 ${
      isActive ? 'ring-2 ring-primary ring-offset-2 shadow-md' : ''
    }`,
    secondary: `bg-secondary text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 focus:ring-secondary/40 ${
      isActive ? 'ring-2 ring-secondary ring-offset-2 shadow-md' : ''
    }`,
    success: `text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 focus:ring-green-500/40 ${
      isActive ? 'ring-2 ring-green-500 ring-offset-2 shadow-md' : ''
    }`,
    danger: `text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 focus:ring-red-500/40 ${
      isActive ? 'ring-2 ring-red-500 ring-offset-2 shadow-md' : ''
    }`,
    warning: `text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-90 focus:ring-yellow-500/40 ${
      isActive ? 'ring-2 ring-yellow-500 ring-offset-2 shadow-md' : ''
    }`,
    outline: `border-2 border-primary text-primary bg-transparent hover:bg-primary/5 active:bg-primary/10 focus:ring-primary/40 ${
      isActive ? 'bg-primary/10 ring-2 ring-primary ring-offset-2' : ''
    }`,
    ghost: `text-text bg-transparent hover:bg-surface-hover active:bg-surface-hover/80 focus:ring-primary/30 ${
      isActive ? 'bg-surface-hover ring-2 ring-primary ring-offset-2' : ''
    }`,
  };

  // Size-specific padding and text
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
  };

  // Width handling
  const widthClass = fullWidth ? 'w-full' : '';

  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  // Inline styles for semantic colors using CSS variables
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'success':
        return { backgroundColor: 'var(--color-success, #10B981)' };
      case 'danger':
        return { backgroundColor: 'var(--color-error, #EF4444)' };
      case 'warning':
        return { backgroundColor: 'var(--color-warning, #F59E0B)' };
      default:
        return {};
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClasses}
      style={getVariantStyles()}
      disabled={isDisabled}
      aria-busy={isLoading}
      aria-pressed={isActive}
      {...props}
    >
      {/* Loading spinner */}
      {isLoading && (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {/* Start icon */}
      {!isLoading && startIcon && (
        <span className="shrink-0" aria-hidden="true">
          {startIcon}
        </span>
      )}

      {/* Button text */}
      <span className="flex-1">
        {children}
      </span>

      {/* End icon */}
      {!isLoading && endIcon && (
        <span className="shrink-0" aria-hidden="true">
          {endIcon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
