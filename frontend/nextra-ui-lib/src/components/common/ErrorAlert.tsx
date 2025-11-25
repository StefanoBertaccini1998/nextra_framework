import React from 'react';

export interface ErrorAlertProps {
  /**
   * Error title or message
   */
  title?: string;
  
  /**
   * Detailed error message
   */
  message?: string;
  
  /**
   * Error object from catch block
   */
  error?: Error | any;
  
  /**
   * Callback when alert is dismissed
   */
  onDismiss?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * ErrorAlert - Display user-friendly error messages
 * 
 * @example
 * ```tsx
 * <ErrorAlert 
 *   title="Failed to save"
 *   message="Please check your input and try again"
 *   error={error}
 *   onDismiss={() => setError(null)}
 * />
 * ```
 */
export function ErrorAlert({ 
  title = 'An error occurred', 
  message, 
  error,
  onDismiss,
  className = '' 
}: ErrorAlertProps) {
  // Extract user-friendly message from error object
  const getErrorMessage = (): string => {
    if (message) return message;
    
    if (error) {
      // API error response
      if (error.response?.data?.message) {
        return error.response.data.message;
      }
      // Error with message property
      if (error.message) {
        return error.message;
      }
      // String error
      if (typeof error === 'string') {
        return error;
      }
    }
    
    return 'Something went wrong. Please try again.';
  };

  return (
    <div 
      className={`rounded-lg p-4 ${className}`}
      style={{
        backgroundColor: 'var(--color-error-light, #fee2e2)',
        border: '1px solid var(--color-error, #dc2626)',
      }}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Error Icon */}
        <svg 
          className="w-5 h-5 shrink-0 mt-0.5" 
          style={{ color: 'var(--color-error, #dc2626)' }}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
            clipRule="evenodd" 
          />
        </svg>

        {/* Content */}
        <div className="flex-1">
          <h3 
            className="font-semibold text-sm mb-1" 
            style={{ color: 'var(--color-error, #dc2626)' }}
          >
            {title}
          </h3>
          <p 
            className="text-sm" 
            style={{ color: 'var(--color-error-dark, #991b1b)' }}
          >
            {getErrorMessage()}
          </p>
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
            aria-label="Dismiss error"
          >
            <svg 
              className="w-4 h-4" 
              style={{ color: 'var(--color-error, #dc2626)' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorAlert;
