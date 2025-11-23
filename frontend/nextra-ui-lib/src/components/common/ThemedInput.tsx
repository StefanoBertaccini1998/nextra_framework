import React from 'react';

export interface ThemedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text to display above the input
   */
  label?: string;
  
  /**
   * Error message to display below the input
   */
  error?: string;
  
  /**
   * Helper text to display below the input when there's no error
   */
  helperText?: string;
  
  /**
   * Whether the field is required (shows red asterisk)
   */
  required?: boolean;
  
  /**
   * ID for the input element (auto-generated if not provided)
   */
  id?: string;
}

/**
 * ThemedInput component - A theme-aware input field with label, error, and helper text support
 * 
 * @example
 * ```tsx
 * <ThemedInput
 *   label="Email"
 *   type="email"
 *   required
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={errors.email}
 *   placeholder="Enter your email"
 * />
 * ```
 */
export const ThemedInput = React.forwardRef<HTMLInputElement, ThemedInputProps>(
  ({ label, error, helperText, required, id, className, ...props }, ref) => {
    // Generate a unique ID only once using useMemo for better performance
    const inputId = React.useMemo(
      () => id || `input-${Math.random().toString(36).substring(2, 11)}`,
      [id]
    );
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    // Determine aria-describedby value for accessibility
    let describedBy: string | undefined;
    if (error) {
      describedBy = errorId;
    } else if (helperText) {
      describedBy = helperId;
    }

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium mb-1"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className="w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:ring-2 focus:ring-primary/30 focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            backgroundColor: 'var(--color-background)',
            color: 'var(--color-text)',
            borderColor: error ? 'var(--color-error)' : 'var(--color-border)'
          }}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...props}
        />
        
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p
            id={helperId}
            className="mt-1 text-sm"
            style={{ color: 'var(--color-textSecondary)' }}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

ThemedInput.displayName = 'ThemedInput';
