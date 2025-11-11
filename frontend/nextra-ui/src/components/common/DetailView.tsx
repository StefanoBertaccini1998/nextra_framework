import React from 'react';
import { motion } from 'framer-motion';

interface DetailField<T> {
  label: string;
  key: keyof T | string;
  render?: (value: any) => React.ReactNode;
}

interface DetailViewProps<T> {
  data: T;
  fields: DetailField<T>[];
  title?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function DetailView<T>({
  data,
  fields,
  title,
  actions,
  className = ''
}: DetailViewProps<T>) {
  const renderValue = (field: DetailField<T>) => {
    if (field.render) {
      return field.render(data[field.key as keyof T]) as React.ReactNode;
    }
    return data[field.key as keyof T] as unknown as React.ReactNode;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`bg-surface rounded-lg border border-border ${className}`}
    >
      {/* Header */}
      {(title || actions) && (
        <div className="flex items-center justify-between p-4 border-b border-border">
          {title && <h2 className="text-lg font-semibold text-text">{title}</h2>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Content */}
      <div className="p-4 grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key.toString()} className="space-y-1">
            <dt className="text-sm text-text-secondary">{field.label}</dt>
            <dd className="text-text font-medium">
              {renderValue(field)}
            </dd>
          </div>
        ))}
      </div>
    </motion.div>
  );
}