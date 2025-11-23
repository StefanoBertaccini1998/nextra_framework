import React from 'react';

type Column<T> = {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type Props<T> = {
  readonly columns: Column<T>[];
  readonly data: T[];
  readonly onRowClick?: (item: T) => void;
};

export default function DataTable<T>({ columns, data, onRowClick }: Readonly<Props<T>>) {
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
          {data.map((row, i) => (
            <tr key={JSON.stringify(row)} onClick={() => onRowClick?.(row)} className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}>
              {columns.map((c) => (
                <td key={c.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {c.render ? c.render(row) : (row as any)[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
