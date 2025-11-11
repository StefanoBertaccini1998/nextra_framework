import React from 'react';

export type Column<T> = {
  key: string;
  label?: string;
  render?: (item: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns?: readonly Column<T>[];
  renderRow?: (item: T, index: number) => React.ReactNode;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  selectedId?: string | number;
  idField?: keyof T;
};

export function Table<T>({ data, renderRow, columns, onRowClick, selectedId, idField = 'id' as keyof T }: Props<T>) {
  if (columns && columns.length > 0) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row) => (
              <tr key={(row as any)[idField as string]} onClick={() => onRowClick?.(row)} className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}>
                {columns.map((c) => (
                  <td key={c.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{c.render ? c.render(row) : (row as any)[c.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full">
        <tbody>
          {data.map((item, idx) => (
            <tr key={(item as any).id ?? idx}>
              <td className="px-4 py-2">{renderRow ? renderRow(item, idx) : JSON.stringify(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
