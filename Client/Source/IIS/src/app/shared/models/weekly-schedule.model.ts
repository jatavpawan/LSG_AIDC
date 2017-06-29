import { WeekdayModel } from './week-day.model';

export class WeeklySchedule {
    RecurBy: WeekdayModel[];
    PayEveryWeek: boolean;
    PayEveryNWeeks: number;
    StartDate: any;
    EndDate: any;
    HasEndDate: boolean;
    EndPaymentsAfterNWeeks: number;
}