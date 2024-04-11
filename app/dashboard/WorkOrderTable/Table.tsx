'use client';
import { TWorkOrder } from '@/data/workOrderUtils';
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  OnChangeFn,
  RowSelectionState,
  PaginationState,
  ColumnFiltersState
} from '@tanstack/react-table';

import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

import { columns } from '@/app/dashboard/WorkOrderTable/TableColumns';

import {
  DEFAULT_PAGE_SIZE,
  getPaginatedWorkOrders,
} from '@/app/dashboard/DataFetch/fetchWorkOrders';

import Pagination from "@/app/dashboard/WorkOrderTable/Pagination/Pagination";
interface WorkOrderTableProp {
  initOrders: TWorkOrder[];
  initTotalCount: number;
  initPaginationState: PaginationState;
}

export function Table({
  initOrders,
  initTotalCount,
  initPaginationState,
}: WorkOrderTableProp) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [pagination, setPagination] =
    useState<PaginationState>(initPaginationState);
  const [rowCount, setRowCount] = useState<number>(initTotalCount);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [orderRows, setOrderRows] = useState<TWorkOrder[]>(initOrders);

  const table = useReactTable({
    data: orderRows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection as OnChangeFn<RowSelectionState>,
    state: {
      rowSelection,
      pagination,
    },
    rowCount: rowCount,
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange: setPagination
  });

  const handleNextPage = async () => {
    table.nextPage();
    //TODO: below code could get out of sync
    const { orders, totalCount } = await getPaginatedWorkOrders({ ...pagination, pageIndex: pagination.pageIndex + 1});
    setOrderRows(orders);
    setRowCount(totalCount);
  }

  const handlePreviousPage = async () => {
    table.previousPage();
    //TODO: below code could get out of sync
    const { orders, totalCount } = await getPaginatedWorkOrders({ ...pagination, pageIndex: pagination.pageIndex - 1});
    setOrderRows(orders);
    setRowCount(totalCount);
  }

  const handlePageChange = async (pageIndex: number) => {
    console.log("PageIndex: ", pageIndex);
    table.setPageIndex(pageIndex);

    const { orders, totalCount } = await getPaginatedWorkOrders({ ...pagination, pageIndex});
    setOrderRows(orders);
    setRowCount(totalCount);
  }

  return (
    // need to add UI for filter area here and extract out the filter area
    <div className="flex max-h-[80vh] w-full flex-col overflow-y-auto rounded-lg bg-white">
      <div className="flex justify-between border-b-2 border-b-slate-200 p-4 pb-5">
        <div className="flex justify-start gap-6">
          <label className="input input-bordered flex items-center gap-2">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <input
              type="text"
              style={{ outline: 'none', borderWidth: '0' }}
              className=" grow focus:border-gray-300 focus:ring-0"
            />
          </label>
          <button className="inline-flex w-36 items-center rounded-lg border border-gray-500 bg-white px-4 text-sm font-medium text-blue-900 focus:outline-none">
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
            <span className="w-9/12 text-base font-semibold tracking-normal">
              Filter
            </span>
          </button>
        </div>

        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="inline-flex h-full w-48 items-center rounded-lg border border-gray-500 bg-white px-4 text-sm font-medium text-gray-700 focus:outline-none"
          >
            <span className="w-9/12 text-base font-semibold tracking-normal">
              Bulk action
            </span>
            <span className="mx-2 h-full border-l border-gray-300" />
            <ChevronDownIcon className="ml-2 h-6 w-6 font-bold" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li className="text-base font-semibold text-red-500">
              <a>Delete</a>
            </li>
            <li className="text-base font-semibold">
              <a>Update</a>
            </li>
          </ul>
        </div>
      </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="border-b-2" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="p-2 text-base font-semibold uppercase"
                  key={header.id}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr className="p-2" key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className="p-2" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t-2 border-b-slate-200 p-4 pb-5">
        <p className="text-sm text-slate-700">
          Showing <b>{pagination.pageIndex * pageSize + 1}</b> to{' '}
          <b>{(pagination.pageIndex + 1) * pageSize}</b> of{' '}
          <b>{table.getRowCount()}</b> result.
        </p>
        <Pagination
          activeClass="z-10 bg-sky-100 border-sky-700 hover:bg-sky-200 hover:border-sky-700"
          currentPage={pagination.pageIndex}
          totalPages={table.getPageCount()}
          onPageChange={handlePageChange}
          canGoNext={table.getCanNextPage()}
          canGoPrevious={table.getCanPreviousPage()}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
    </div>
  );
}
