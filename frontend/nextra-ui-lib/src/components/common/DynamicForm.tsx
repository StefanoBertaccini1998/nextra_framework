import { useState } from 'react';

export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'select' | 'date';

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validation?: (value: any) => string | null;
  options?: { value: string | number; label: string }[]; // For select fields
  min?: number;
  max?: number;
  step?: number;
  rows?: number; // For textarea
}

export interface FormProps<T = Record<string, any>> {
  fields: FormField[];
  initialValues?: Partial<T>;
  onSubmit: (values: T) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  columns?: 1 | 2;
}

export function Form<T extends Record<string, any>>({
  fields,
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  loading = false,
  columns = 1,
}: FormProps<T>) {
  const [values, setValues] = useState<Partial<T>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  };

  const validateField = (name: string, value: any): string | null => {
    const field = fields.find((f) => f.name === name);
    if (!field) return null;

    // Required validation
    if (field.required && (!value || value === '')) {
      const error = `${field.label} is required`;
      setErrors((prev) => ({ ...prev, [name]: error }));
      return error;
    }

    // Custom validation
    if (field.validation) {
      const error = field.validation(value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
        return error;
      }
    }

    return null;
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field.name, values[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    fields.forEach((field) => {
      allTouched[field.name] = true;
    });
    setTouched(allTouched);

    if (validateAll()) {
      await onSubmit(values as T);
    }
  };

  const renderField = (field: FormField) => {
    const value = values[field.name] || '';
    const error = touched[field.name] && errors[field.name];
    const commonClasses = `w-full px-4 py-2.5 border rounded-lg transition-all duration-200 ${
      error
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50'
        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 bg-white'
    } disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none`;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder}
            required={field.required}
            rows={field.rows || 4}
            className={commonClasses}
            disabled={loading}
          />
        );

      case 'select':
        return (
          <select
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            required={field.required}
            className={commonClasses}
            disabled={loading}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, parseFloat(e.target.value) || '')}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            max={field.max}
            step={field.step || 'any'}
            className={commonClasses}
            disabled={loading}
          />
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder}
            required={field.required}
            className={commonClasses}
            disabled={loading}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div
        className={`grid gap-6 ${
          columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {fields.map((field) => (
          <div
            key={field.name}
            className={field.type === 'textarea' ? 'md:col-span-2' : ''}
          >
            <label
              htmlFor={field.name}
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {touched[field.name] && errors[field.name] && (
              <p className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors shadow-sm hover:shadow-md"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
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
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
