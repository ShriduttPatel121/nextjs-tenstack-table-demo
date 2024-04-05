import { NextResponse } from "next/server";

import { type TWorkOrder, generateWorkOrders } from "@/data/workOrderUtils";

let orders: TWorkOrder[] = [];
    
if(orders.length === 0) {
    orders = generateWorkOrders(100);
}

export async function POST(req: Request) {
    const { page, perPage } = await req.json();
    // return NextResponse.json(data);
    // let { page, perPage } = req.query;
    // logic for extracting records for particular page
    const pageNum = parseInt(page as string);
    const perPageNum = parseInt(perPage as string);
    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;
    return NextResponse.json(orders.slice(startIndex, endIndex));
}