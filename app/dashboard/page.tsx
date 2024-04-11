
import { Table as WorkOrderTable } from "@/app/dashboard/WorkOrderTable/Table";

import { DEFAULT_PAGE_SIZE, getPaginatedWorkOrders } from '@/app/dashboard/DataFetch/fetchWorkOrders';

import Main from "@/app/ui/MainLayout/Main";
import PageSection from "@/app/ui/PageSection";

import { PlusIcon } from "@heroicons/react/24/outline";

export default async function DashboardPage() {

    const { orders, totalCount } = await getPaginatedWorkOrders({ pageIndex: 0, pageSize: 10 });

    return <Main>
        <PageSection className="flex justify-between items-center">
            <h2 className="font-semibold text-4xl" >Work Orders</h2>
            <button
                className="btn w-48 h-14 p-4 flex items-center text-white bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
                <PlusIcon className="w-6 h-6" />
                <span className="font-semibold ml-2 text-sm">Add Work Order</span>
            </button>
        </PageSection>
        <PageSection>
            <WorkOrderTable initOrders={orders} initTotalCount={totalCount} initPaginationState={{ pageIndex: 0, pageSize: DEFAULT_PAGE_SIZE }} />
        </PageSection>
    </Main>
};