import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  onRowClick?: (item: T) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  className?: string;
  emptyMessage?: string;
  loadingSkeletonRows?: number;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  isLoading = false,
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
  className = '',
  emptyMessage = 'No data available',
  loadingSkeletonRows = 5
}: DataTableProps<T>) {
  const LoadingSkeleton = () => (
    <>
      {Array.from({ length: loadingSkeletonRows }).map((_, index) => (
        <tr key={`skeleton-${index}`} className="animate-pulse">
          {columns.map((column, colIndex) => (
            <td key={`skeleton-${index}-${colIndex}`} className="px-4 py-3">
              <div className="h-4 bg-surface-hover rounded" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const renderCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }

    const key = column.key as keyof T;
    return item[key];
  };

  return (
    <div className={`overflow-x-auto rounded-lg border border-border ${className}`}>
      <table className="w-full">
        <thead className="bg-surface text-text-secondary">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key.toString()}
                className={`px-4 py-3 text-left font-medium text-sm ${
                  column.sortable ? 'cursor-pointer hover:text-text' : ''
                }`}
                style={{ width: column.width }}
                onClick={() => column.sortable && onSort?.(column.key.toString())}
              >
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && sortColumn === column.key && (
                    <span className="text-primary">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          <AnimatePresence>
            {isLoading ? (
              <LoadingSkeleton />
            ) : data.length > 0 ? (
              data.map((item, index) => (
                <motion.tr
                  key={item.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => onRowClick?.(item)}
                  className={`bg-surface hover:bg-surface-hover transition-colors ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((column) => (
                    <td key={column.key.toString()} className="px-4 py-3">
                      {renderCell(item, column)}
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-text-secondary"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}