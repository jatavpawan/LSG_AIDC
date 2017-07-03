import { RecurringSchedule } from './recurring-schedule.model';

export class SchedulerContainer {
    Frequency: string;
    OneTimePaymentDate: string;
    RecurringSchedule: RecurringSchedule;
    FirstPaymentDate: string;
    EndPaymentDate: string;
    NextPaymentDates: string[];
}