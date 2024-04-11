import { TWorkOrder } from "@/data/workOrderUtils";
import { PaginationState } from "@tanstack/react-table";

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

export { getPaginatedWorkOrders, DEFAULT_PAGE_SIZE }