import React from 'react';
import cn from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className,
  fullWidth = false,
  ...props
}) => {
  const inputClasses = cn(
    'rounded border px-3 py-2 focus:outline-none focus:ring-2 transition-all duration-200',
    error 
      ? 'border-red-500 focus:ring-red-200' 
      : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500',
    fullWidth && 'w-full',
    className
  );

  return (
    <div className={cn('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input className={inputClasses} {...props} />
      {error && (
        <span className="text-sm text-red-500">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
