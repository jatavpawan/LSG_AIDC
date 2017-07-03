import { MonthlySchedule } from "./monthly-schedule.model";
import { WeeklySchedule } from "./weekly-schedule.model";
import {QuarterlySchedule} from './quarterly-schedule.model';
import {AnnualSchedule} from './annual-schedule.model';

export class RecurringSchedule {
    Frequency: string;
    MonthlySchedule: MonthlySchedule;
    WeeklySchedule: WeeklySchedule;
    QuarterlySchedule: QuarterlySchedule;
    AnnualSchedule: AnnualSchedule;
}