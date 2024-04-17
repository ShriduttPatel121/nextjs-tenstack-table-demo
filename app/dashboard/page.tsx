import { Table as WorkOrderTable } from "@/app/dashboard/WorkOrderTable/Table";

import { DEFAULT_PAGE_SIZE, getPaginatedWorkOrders } from '@/app/dashboard/DataFetch/fetchWorkOrders';

import Main from "@/app/ui/MainLayout/Main";

export default async function DashboardPage() {

    const { orders, totalCount } = await getPaginatedWorkOrders({ pageIndex: 0, pageSize: 10 });

    return <Main>
        <WorkOrderTable initOrders={orders} initTotalCount={totalCount} initPaginationState={{ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE }} />
    </Main>
};