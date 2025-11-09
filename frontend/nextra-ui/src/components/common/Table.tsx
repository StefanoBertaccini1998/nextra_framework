import React from 'react';

export type Column<T> = {
  header: string;
  accessor: keyof T | ((data: T) => React.ReactNode);
  sortable?: boolean;
  className?: string;
};

interface TableProps<T> {
  data: T[];
  columns: readonly Column<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  selectedId?: string | number;
  idField?: keyof T;
  className?: string;
}

export function Table<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  isLoading,
  selectedId,
  idField = 'id',
  className = '',
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-surface rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-48 flex items-center justify-center bg-surface rounded-lg">
        <p className="text-text/60">No data available</p>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-x-auto bg-surface rounded-lg shadow ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-3 text-left text-sm font-semibold text-text/80 ${
                  column.className || ''
                }`}
              >
                {column.header}
                {column.sortable && (
                  <button className="ml-1 text-text/40 hover:text-text/60">
                    ↕
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={item[idField] || rowIndex}
              onClick={() => onRowClick?.(item)}
              className={`border-b border-border hover:bg-background/50 transition-colors ${
                onRowClick ? 'cursor-pointer' : ''
              } ${
                selectedId && item[idField] === selectedId
                  ? 'bg-primary/5'
                  : ''
              }`}
            >
              {columns.map((column, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-3 text-sm text-text ${
                    column.className || ''
                  }`}
                >
                  {typeof column.accessor === 'function'
                    ? column.accessor(item)
                    : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}