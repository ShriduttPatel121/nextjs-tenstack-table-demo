import { type TWorkOrder } from "@/data/workOrderUtils";

import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { format } from 'date-fns-tz';

import { CalendarDaysIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { ScheduleCell } from "./ScheduleCell";

const columnHelper = createColumnHelper<TWorkOrder>();

export const columns = [
  columnHelper.display({
    id: 'select-rows',
    header: ({ table }) => (
      <input
        type="checkbox"
        className="checkbox"
        onChange={table.getToggleAllRowsSelectedHandler()}
        checked={table.getIsAllRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="checkbox checkbox-sm"
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  }),
  columnHelper.accessor('workOrder', {
    cell: (info) => (
      <span className="font-semibold">
        {info.getValue().toLocaleLowerCase()}
      </span>
    ),
    header: () => <span>Work orders</span>,
  }),
  columnHelper.accessor('customerName', {
    cell: (info) => info.getValue(),
    header: () => <span>Customer</span>,
  }),
  columnHelper.accessor('serviceAddress', {
    cell: (info) => info.getValue(),
    header: () => (
      <span className="">Service Address</span>
    ),
  }),
  //TODO: need to add weekly UI + on time & late text too ( SEE UI )
  columnHelper.accessor('schedule', {
    cell: (info) => {
      // console.log(info.row.original);
      return <ScheduleCell {...info.getValue()}/>;
    },
    header: () => <span className="">Schedule</span>,
  }),
  columnHelper.accessor('assignee', {
    cell: (info) => info.getValue(),
    size: 14,
    header: () => <span className="">Assignee</span>,
  }),
  columnHelper.display({
    id: 'calender-btn',
    size: 14,
    cell: () => <button className="btn btn-circle btn-sm btn-ghost bg-transparent hover:bg-transparent">
      <CalendarDaysIcon className="h-7 w-7 text-green-500" />
    </button>,
  }),
  columnHelper.display({
    id: 'more-btn',
    size: 14,
    cell: () => <button className="btn btn-circle btn-sm btn-ghost bg-transparent hover:bg-transparent" >
      <EllipsisVerticalIcon className="h-7 w-7 text-slate-500" />
    </button>,
  }),
] as ColumnDef<TWorkOrder>[];