"use client"
import { generateWorkOrders, type TWorkOrder } from "@/data/workOrderUtils";
import { Table as WorkOrderTable } from "@/app/dashboard/WorkOrderTable/Table";
import { columns } from "@/app/dashboard/WorkOrderTable/TableColumns" ;
import { useState } from "react";
import { RowSelectionState } from "@tanstack/react-table";

const orders: TWorkOrder[] = generateWorkOrders(10);

export default function DashboardPage() {
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    return <main className="flex items-center justify-center min-h-screen flex-col max-h-screen overflow-y-auto bg-slate-100 p-2 ">
        <WorkOrderTable orders={orders} columns={columns} rowSelection={rowSelection} setRowSelection={setRowSelection} />
    </main>
}