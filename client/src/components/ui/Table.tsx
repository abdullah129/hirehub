import React from 'react';
import { cn } from '../../utils/cn';
import { TableSkeleton } from './Skeleton';

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

export function Table<T extends { id: string }>({
  data,
  columns,
  isLoading,
  emptyMessage = 'No data available',
  onRowClick,
  sortColumn,
  sortDirection,
  onSort,
}: TableProps<T>) {
  if (isLoading) {
    return (
      <div className="w-full p-4">
        <TableSkeleton rows={5} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full p-8 text-center">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-sm font-medium text-gray-700',
                  column.sortable && 'cursor-pointer hover:bg-gray-100',
                )}
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && sortColumn === column.key && (
                    <span className="text-xs">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={cn(
                'border-b border-gray-100 hover:bg-gray-50 transition-colors',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(item)}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
                  {column.render
                    ? column.render(item)
                    : String((item as any)[column.key] || '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
