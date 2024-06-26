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
  ColumnFiltersState,
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
  topFilterOptions,
} from '@/app/dashboard/DataFetch/fetchWorkOrders';

import PageSection from "@/app/ui/PageSection";
import Pagination from '@/app/dashboard/WorkOrderTable/Pagination/Pagination';
import StatusFilterCard from '@/app/dashboard/StatusFilterCard';
import IconButton from '@/app/ui/AppButtons/IconButton';
import AddWorkOrderModal from "@/app/dashboard/WorkOrderModal";
import WebtraxInput from '@/app/ui/Inputs/WbtraxInput';


import { PlusIcon } from "@heroicons/react/24/outline";
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
  const [filterOptions, setFilterOptions] = useState(topFilterOptions);
  const [showModal, setShowModal] = useState<boolean>(false);

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
    onPaginationChange: setPagination,
  });

  const handleNextPage = async () => {
    table.nextPage();
    const { orders, totalCount } = await getPaginatedWorkOrders({
      ...pagination,
      pageIndex: pagination.pageIndex + 1,
    });
    setOrderRows(orders);
    setRowCount(totalCount);
  };

  const handlePreviousPage = async () => {
    table.previousPage();
    const { orders, totalCount } = await getPaginatedWorkOrders({
      ...pagination,
      pageIndex: pagination.pageIndex - 1,
    });
    setOrderRows(orders);
    setRowCount(totalCount);
  };

  const handlePageChange = async (pageIndex: number) => {
    table.setPageIndex(pageIndex);

    const { orders, totalCount } = await getPaginatedWorkOrders({
      ...pagination,
      pageIndex,
    });
    setOrderRows(orders);
    setRowCount(totalCount);
  };

  const handleFilterSelect = (selectIndx: number) => {
    const copiedFilters = [...filterOptions];
    copiedFilters.forEach((fil, i) => {
      if(i === selectIndx) {
        fil.isActive = !fil.isActive
      } else {
        fil.isActive = false;
      }
    });
    setFilterOptions(copiedFilters);
  }

  const handleModalClose = () =>  {
    setShowModal(false);
  }

  const handleModalOpen = () =>  {
    setShowModal(true);
  }

  // const handleAddWorkOrderModal = () => {
  //   (document.getElementById('work-order-modal') as HTMLDialogElement).showModal();
  // }

  return (
    <PageSection>
      <div className="flex justify-between items-center">
      <h2 className="font-semibold text-4xl" >Work Orders</h2>
            <IconButton
                iconPosition="prefix"
                icon={<PlusIcon className="w-6 h-6" />}
                onClick={handleModalOpen}
                className='h-14 w-48 bg-sky-700 hover:bg-sky-700 text-white'
            >
                <span className="font-semibold ml-2 text-sm">Add Work Order</span>
            </IconButton>
      </div>
      <div className="flex gap-4 justify-between w-full py-6">
        {filterOptions.map((fil, i) => {
          return (
            <StatusFilterCard
              key={fil.title}
              isActive={fil.isActive}
              icon={<fil.Icon className={fil.iconClass} />}
              title={fil.title}
              filterValue={fil.filterValue}
              iconContainerClass={fil.iconContainerClass}
              onClick={() => handleFilterSelect(i)}
            />
          );
        })}
      </div>
      <div className="flex max-h-screen w-full flex-col overflow-y-auto rounded-lg bg-white">
        <div className="flex justify-between border-b-2 border-b-slate-200 p-4 pb-5">
          <div className="flex justify-start gap-6">
            <WebtraxInput className="grow h-full" icon={<MagnifyingGlassIcon className="h-6 w-6" />} iconPosition='prefix'  />
            <IconButton
                iconPosition="prefix"
                icon={<AdjustmentsHorizontalIcon className="h-6 w-6" />}
                className='w-36 h-12 border-gray-500 bg-white hover:bg-white px-2 text-sm font-medium text-blue-900'
            >
                 <span className="text-base font-semibold tracking-normal">
                  Filter
                </span>
            </IconButton>
          </div>

          <button className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="inline-flex h-full w-48 items-center rounded-lg border-2 border-gray-500 bg-white px-4 text-sm font-medium text-gray-700 focus:outline-none"
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
              <li tabIndex={1} className="text-base font-semibold">
                <a>Update</a>
              </li>
            </ul>
          </button>
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
      <AddWorkOrderModal onClose={handleModalClose} isOpen={showModal} mode='Add' customerName='Nathan Winnie' />
    </PageSection>
  );
}
