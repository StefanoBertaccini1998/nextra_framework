import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  required,
  className = '',
  children,
}) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-sm font-medium text-text">
      {label}
      {required && <span className="text-error ml-1">*</span>}
    </label>
    {children}
    {error && <p className="text-sm text-error">{error}</p>}
  </div>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  error,
  label,
  required,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const inputClasses = `
    px-3 py-2 
    rounded-lg 
    border border-border
    bg-surface 
    text-text 
    placeholder:text-text/40
    focus:outline-none focus:ring-2 focus:ring-primary/30 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-error focus:ring-error/30' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  if (!label) {
    return <input className={inputClasses} {...props} />;
  }

  return (
    <FormField label={label} error={error} required={required}>
      <input className={inputClasses} {...props} />
    </FormField>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  error?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  error,
  label,
  required,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const selectClasses = `
    px-3 py-2 
    rounded-lg 
    border border-border
    bg-surface 
    text-text 
    focus:outline-none focus:ring-2 focus:ring-primary/30 
    disabled:opacity-50 disabled:cursor-not-allowed
    ${error ? 'border-error focus:ring-error/30' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const select = (
    <select className={selectClasses} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );

  if (!label) {
    return select;
  }

  return (
    <FormField label={label} error={error} required={required}>
      {select}
    </FormField>
  );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
}

export const TextArea: React.FC<TextAreaProps> = ({
  error,
  label,
  required,
  fullWidth = true,
  className = '',
  ...props
}) => {
  const textareaClasses = `
    px-3 py-2 
    rounded-lg 
    border border-border
    bg-surface 
    text-text 
    placeholder:text-text/40
    focus:outline-none focus:ring-2 focus:ring-primary/30 
    disabled:opacity-50 disabled:cursor-not-allowed
    resize-vertical min-h-[100px]
    ${error ? 'border-error focus:ring-error/30' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  if (!label) {
    return <textarea className={textareaClasses} {...props} />;
  }

  return (
    <FormField label={label} error={error} required={required}>
      <textarea className={textareaClasses} {...props} />
    </FormField>
  );
};