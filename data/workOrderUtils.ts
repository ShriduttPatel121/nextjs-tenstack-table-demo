import fsPromise from "fs/promises";
import { faker } from '@faker-js/faker'

export enum ScheduleENUM {
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    NO_REPEAT = "NO_REPEAT",
    CUSTOM = "CUSTOM"
}

enum OrderTypeEnum {
    CLEANING = "CLEANING",
    WASHING = "WASHING",
    DISPOSAL = "DISPOSAL",
    OTHER = "OTHER"
};

type TSchedule = {
    type: ScheduleENUM,
    date: Date,
}

export type TWorkOrder = {
    id: string;
    workOrder: string;
    customerName: string;
    serviceAddress: string;
    assignee: string;
    schedule: TSchedule;
}

function generateSchedule(): TSchedule {
    return {
        type: faker.helpers.arrayElement(Object.values(ScheduleENUM)),
        date: faker.date.future(),
    };
}

// Function to generate dummy data for TWorkOrder
function generateWorkOrder(): TWorkOrder {
    return {
        id: faker.string.uuid(),
        workOrder: `#${faker.number.int({ min: 1000, max: 9999 })}: ${faker.helpers.arrayElement(Object.values(OrderTypeEnum))}`,
        customerName: faker.person.fullName(),
        serviceAddress: faker.location.streetAddress(),
        assignee: faker.person.fullName(),
        schedule: generateSchedule(),
    };
}

export function generateWorkOrders(totalOrders: number) {
    const workOrders: TWorkOrder[] = [];
    for (let i = 0; i < totalOrders; i++) {
        workOrders.push(generateWorkOrder());
    }
    return workOrders;
}


