import { generateWorkOrders, type TWorkOrder, ScheduleENUM } from "@/data/workOrderUtils"

const orders: TWorkOrder[] = generateWorkOrders(50);

export default function DashboardPage() {
    return <main className="flex min-h-screen flex-col max-h-screen overflow-y-auto items-center justify-center">
            <div className="h-[30px]">
                this is Dashboard page
            </div>
    </main>
}