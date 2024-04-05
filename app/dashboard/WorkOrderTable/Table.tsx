import { TWorkOrder } from '@/data/workOrderUtils';
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  OnChangeFn,
  RowSelectionState,
} from '@tanstack/react-table';

import { ChevronDownIcon, AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline"

//TODO 
interface TableProps {
  columns: ColumnDef<TWorkOrder>[];
  orders: TWorkOrder[];
  rowSelection: RowSelectionState,
  setRowSelection: OnChangeFn<RowSelectionState>,
}

export function Table({ columns, orders, rowSelection, setRowSelection }: TableProps) {
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row.id,
    onRowSelectionChange: setRowSelection as OnChangeFn<RowSelectionState>,
    state: {
      rowSelection
    }
  });
  return (
    <div className="flex max-h-[80vh] w-10/12 flex-col overflow-y-auto rounded-lg bg-white">
      <div className="flex justify-between p-4 pb-5 border-b-slate-200 border-b-2">
        <div className="flex gap-6 justify-start">
          <label className="input input-bordered flex items-center gap-2">
            <MagnifyingGlassIcon className='w-6 h-6' />
            <input type="text" style={{outline: 'none', borderWidth: "0"}} className=" grow focus:border-gray-300 focus:ring-0" />
          </label>
          <button className='inline-flex w-36 items-center text-blue-900 border border-gray-500 rounded-lg px-4 bg-white text-sm font-medium focus:outline-none'>
            <AdjustmentsHorizontalIcon className='h-6 w-6' />
            <span className='tracking-normal font-semibold text-base w-9/12'>
                Filter
            </span>
          </button>
        </div>

        <div className="dropdown">
        <div tabIndex={0} role="button" className='inline-flex h-full w-48 items-center border border-gray-500 rounded-lg px-4 bg-white text-sm font-medium text-gray-700 focus:outline-none'>
            <span className='tracking-normal font-semibold text-base w-9/12'>
                Bulk action
            </span>
            <span className="border-l mx-2 border-gray-300 h-full" />
            <ChevronDownIcon className="h-6 w-6 ml-2 font-bold" />
        </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li className='text-base font-semibold text-red-500'><a>Delete</a></li>
            <li className='text-base font-semibold'><a>Update</a></li>
          </ul>
        </div>
      </div>
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className='border-b-2' key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="p-2 text-base font-semibold uppercase" key={header.id}>
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
    </div>
  );
}
