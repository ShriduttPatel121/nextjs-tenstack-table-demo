import { TWorkOrder } from "@/data/workOrderUtils";
import { PaginationState } from "@tanstack/react-table";

import { CalendarIcon } from "@heroicons/react/24/outline";

async function getPaginatedWorkOrders(pagination: PaginationState): Promise<{ orders: TWorkOrder[], totalCount: number }> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}workOrders`, {
        method: 'POST',
        body: JSON.stringify({ page: pagination.pageIndex + 1, perPage: pagination.pageSize }),
        headers: {
            'Content-Type': 'application/json'
        },
        next: {
            revalidate: 0
        }
    });

    const data = await response.json();

    if(!response.ok) {
        throw new Error(data);
    }

    return data;
};

const DEFAULT_PAGE_SIZE = 10;

const topFilterOptions = [
    {
        Icon: CalendarIcon,
        iconClass: "w-8 h-8 text-red-600",
        iconContainerClass: "p-1.5 rounded-md bg-red-100",
        title: "Past Due",
        filterValue: "1",
        isActive: false

    },
    {
        Icon: CalendarIcon,
        iconClass: "w-8 h-8 text-green-600",
        iconContainerClass: "p-1.5 rounded-md bg-green-100",
        title: "Ready To Schedule",
        filterValue: "1",
        isActive: false

    },
    {
        Icon: CalendarIcon,
        iconClass: "w-8 h-8 text-indigo-600",
        iconContainerClass: "p-1.5 rounded-md bg-indigo-100",
        title: "Pending Approval",
        filterValue: "7"

    },
    {
        Icon: CalendarIcon,
        iconClass: "w-8 h-8 text-amber-500",
        iconContainerClass: "p-1.5 rounded-md bg-amber-100",
        title: "Pending Approval",
        filterValue: "7",
        isActive: false
    },
    {
        Icon: CalendarIcon,
        iconClass: "w-8 h-8 text-slate-500",
        iconContainerClass: "p-1.5 rounded-md bg-slate-100",
        title: "Scheduled",
        filterValue: "9",
        isActive: false
    }
]

export { getPaginatedWorkOrders, DEFAULT_PAGE_SIZE, topFilterOptions }