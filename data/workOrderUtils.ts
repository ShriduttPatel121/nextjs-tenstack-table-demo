import fsPromise from "fs/promises";
import { faker } from '@faker-js/faker';

enum WeekDayEnum {
    SUNDAY = "SUNDAY",
    MONDAY = "MONDAY",
    TUESDAY = "TUESDAY",
    WEDNESDAY = "WEDNESDAY",
    THURSDAY = "THURSDAY",
    FRIDAY = "FRIDAY",
    SATURDAY = "SATURDAY",
}

enum ScheduleENUM {
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    NO_REPEAT = "NO REPEAT",
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
    onTime: boolean,
    scheduleDays: WeekDayEnum[]
}

type TWorkOrder = {
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
        onTime: faker.helpers.arrayElement([true, false, true]),
        scheduleDays: faker.helpers.arrayElements(Object.values(WeekDayEnum), { max: 5, min: 1 }) as WeekDayEnum[]
    };
}

// Function to generate dummy data for TWorkOrder
function generateWorkOrder(): TWorkOrder {
    return {
        id: faker.string.uuid(),
        workOrder: `# ${faker.number.int({ min: 1000, max: 9999 })}: ${faker.helpers.arrayElement(Object.values(OrderTypeEnum))}`,
        customerName: faker.person.fullName(),
        serviceAddress: faker.location.streetAddress(),
        assignee: faker.person.fullName(),
        schedule: generateSchedule(),
    };
}

function generateWorkOrders(totalOrders: number) {
    const workOrders: TWorkOrder[] = [];
    for (let i = 0; i < totalOrders; i++) {
        workOrders.push(generateWorkOrder());
    }
    return workOrders;
}

export { generateWorkOrders, type TWorkOrder, ScheduleENUM, type TSchedule, WeekDayEnum };