/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Table,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useState } from 'react';

import Valor from 'renderer/classes/db/Valor';
import Filter from './Filter';
import proper from '../helpers/properCase';

import '../styles/GenericTable.css';

interface TableProps<T extends Valor> {
  data: T[];
}

function GenericTable<T extends Valor>({ data }: TableProps<T>) {
  const [columns, setColumns] = useState<ColumnDef<T, any>[]>([]);
  const table: Table<T> = useReactTable<T>({
    data,
    columns,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  useEffect(() => {
    const generateColumns = (): ColumnDef<T, any>[] => {
      const helper = createColumnHelper<T>();
      const keys = data[0]?.getTable() ?? [];
      return keys
        .sort((a, b) => a.order - b.order)
        .map((property) => {
          return helper.accessor(
            property.acessorFn ?? property.property ?? property.id,
            {
              id: property.property ?? property.id,
              header: proper(property.id),
              cell: (item) =>
                property?.format
                  ? property?.format(item.getValue())
                  : item.getValue(),
              enableColumnFilter: property.filter ?? false,
              enableHiding: property.hidden ?? false,
              enableResizing: true,
              enableSorting: true,
              filterFn: property.filterFn ?? 'auto',
              sortingFn: property.sortingFn ?? 'auto',
            }
          );
        });
    };

    setColumns(generateColumns());
  }, [data]);

  return (
    <div className="p-2">
      <table className="styled-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={`headergroup-${headerGroup.id}`}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={`header-${header.column.id}`}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? (
                          <div>
                            <Filter<T> column={header.column} table={table} />
                          </div>
                        ) : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={`row-${row.id}`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={`cell-${row.id}-${cell.column.id}`}
                      className={`format-${cell.column.id} ${
                        row.original?.getProperty(cell.column.id)?.type ===
                          'money' && Number(cell.getValue()) < 0
                          ? 'negativo'
                          : ''
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          type="button"
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          {' '}
          Página{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center  ">
          {' '}
          | Vá para a página:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            max={table.getPageCount()}
            min={1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Ver {pageSize} itens
            </option>
          ))}
        </select>
      </div>
      <div>Total de {table.getPrePaginationRowModel().rows.length} linhas</div>
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </div>
  );
}

export default GenericTable;
