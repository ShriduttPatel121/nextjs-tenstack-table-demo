
import { generateWorkOrders, type TWorkOrder } from "@/data/workOrderUtils";
import { Table as WorkOrderTable } from "@/app/dashboard/WorkOrderTable/Table";
import { PaginationState } from "@tanstack/react-table";

import { DEFAULT_PAGE_SIZE, getPaginatedWorkOrders } from '@/app/dashboard/DataFetch/fetchWorkOrders';

// const staticOrders: TWorkOrder[] = generateWorkOrders(10);

export default async function DashboardPage() {

    const { orders, totalCount } = await getPaginatedWorkOrders({ pageIndex: 0, pageSize: 10 });

    return <main className="flex items-center justify-center min-h-screen flex-col max-h-screen overflow-y-auto bg-slate-100 p-2 ">
        <WorkOrderTable initOrders={orders} initTotalCount={totalCount} initPaginationState={{ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE }} />
    </main>
};