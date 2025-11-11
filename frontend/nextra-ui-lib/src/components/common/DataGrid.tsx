import React, { useState } from 'react';
import { Table, type Column } from './Table';
import { Input } from './Form';
import { Button } from './Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </Button>
    </div>
  );
};

//Read only data grid with pagination and search
interface DataGridProps<T> {
  readonly data: readonly T[];
  readonly columns: readonly Column<T>[];
  readonly pageSize?: number;
  readonly searchField?: keyof T;
  readonly onRowClick?: (item: T) => void;
  readonly isLoading?: boolean;
  readonly selectedId?: string | number;
  readonly idField?: keyof T;
  readonly className?: string;
}

export function DataGrid<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  searchField,
  onRowClick,
  isLoading,
  selectedId,
  idField = 'id' as keyof T,
  className = '',
}: DataGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filter data based on search term
  const filteredData = searchField
    ? data.filter((item) => {
        const fieldValue = item[searchField];
        return String(fieldValue)
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
    : data;

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {searchField && (
        <div className="flex justify-between items-center">
          <Input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
            className="max-w-xs"
          />
          <span className="text-sm text-text/60">
            {filteredData.length} items
          </span>
        </div>
      )}

      <Table
        data={paginatedData}
        columns={columns}
        onRowClick={onRowClick}
        isLoading={isLoading}
        selectedId={selectedId}
        idField={idField}
      />

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
