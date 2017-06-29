import { DaysOfTheWeek } from './days-of-the-week.model';

export class MonthlySchedule {
    RecurBy: string;
    CalendarDays: number[];
    PayOnIndex: string[];
    PayOnWeekday: string;
    PayEveryMonth: boolean;
    PayEveryNMonths: number;
    StartDate: string;
    EndDate: string;
    HasEndDate: boolean;
    EndPaymentsAfterNMonths: number;
    DaysOfTheWeek: DaysOfTheWeek;
}