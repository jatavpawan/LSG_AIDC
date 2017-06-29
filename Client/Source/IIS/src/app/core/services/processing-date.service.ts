import * as moment from 'moment';

import { Holiday } from '../../shared/models/holiday.model';
import { WeekdayModel } from "../../shared/models/week-day.model";
import { SchedulerContainer } from "../../shared/models/scheduler-container.model";

export class ProcessingDateService {

    _dateSelectionError: string;
    private weekdaySelectionList: WeekdayModel[];

    constructor(private holidays?: Holiday[]) {
    }

    getProcessingDateErrors(date: string, minDate: Date): string {
        this._dateSelectionError = undefined;

        if (this.isDateWeekend(date)) {
            this._dateSelectionError = 'Weekend Non-Processing Date Selected';
        }

        let selectedDateHolidayRecord = this.holidays.find(d => d.holidayDate === date && d.isNonprocessingDayFederal);

        if (selectedDateHolidayRecord) {
            this._dateSelectionError = 'Holiday Non-Processing Date Selected: ' +
                selectedDateHolidayRecord.holidayDescription;
        }

        if (moment(date).isBefore(minDate) || moment(date).isSame(minDate)) {
            this._dateSelectionError = 'Processing dates cannot be on or before ' + moment(minDate).format("MM/DD/YYYY");
        }

        return this._dateSelectionError;
    }

    getNextProcessingDate(date: string, minDate: Date): string {
        let returnDate = moment(date);

        while (this.getProcessingDateErrors(returnDate.format("MM/DD/YYYY"), minDate)) {
            returnDate = returnDate.add(1, "day");
        }

        return returnDate.format("MM/DD/YYYY");
    }

    getProcessingDateDisableList(): any[] {
        let disabledDates: any = [];

        this.holidays.forEach(h => {
            let momentDate: any = moment(h.holidayDate);
            disabledDates.push({ year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() });
        });

        return disabledDates;
    }

    formatProcessingDates(processingDates: string[], scheduler: SchedulerContainer): SchedulerContainer {
        if (scheduler.OneTimePaymentDate) {
            scheduler.FirstPaymentDate = scheduler.OneTimePaymentDate;
            scheduler.EndPaymentDate = undefined;
            scheduler.NextPaymentDates = undefined;
        } else if (scheduler.RecurringSchedule.MonthlySchedule && scheduler.RecurringSchedule.MonthlySchedule.StartDate) {
            scheduler.FirstPaymentDate = scheduler.RecurringSchedule.MonthlySchedule.StartDate;
        } else if (scheduler.RecurringSchedule.WeeklySchedule && scheduler.RecurringSchedule.WeeklySchedule.StartDate) {
            scheduler.FirstPaymentDate = scheduler.RecurringSchedule.WeeklySchedule.StartDate;
        }
        else if (scheduler.RecurringSchedule.QuarterlySchedule && scheduler.RecurringSchedule.QuarterlySchedule.StartDate) {
            scheduler.FirstPaymentDate = scheduler.RecurringSchedule.QuarterlySchedule.StartDate;
        }
        else if (scheduler.RecurringSchedule.QuarterlySchedule && scheduler.RecurringSchedule.AnnualSchedule.StartDate) {
            scheduler.FirstPaymentDate = scheduler.RecurringSchedule.AnnualSchedule.StartDate;
        }

        if (scheduler.Frequency === 'recurring') {
            if ((scheduler.RecurringSchedule.MonthlySchedule && scheduler.RecurringSchedule.MonthlySchedule.HasEndDate) ||
                (scheduler.RecurringSchedule.WeeklySchedule && scheduler.RecurringSchedule.WeeklySchedule.HasEndDate) ||
                (scheduler.RecurringSchedule.QuarterlySchedule && scheduler.RecurringSchedule.QuarterlySchedule.EndDate) ||
                (scheduler.RecurringSchedule.AnnualSchedule && scheduler.RecurringSchedule.AnnualSchedule.EndDate)) {
                scheduler.EndPaymentDate = processingDates[processingDates.length - 1];
            } else {
                scheduler.EndPaymentDate = 'No End Date';
            }
            scheduler.NextPaymentDates = processingDates;
        }

        return scheduler;
    }

    private isDateWeekend(date: string): boolean {
        let momentDate: any = moment(date);
        let dayOfTheWek: number = momentDate.weekday();
        if (dayOfTheWek === 6 || dayOfTheWek === 0) {
            return true;
        }
        return false;
    }

    getNextProcessingDateByWeekdayArray(weekdays: WeekdayModel[], minDate: Date): string {
        if (!this.weekdaySelectionList || this.weekdaySelectionList.length === 0) {
            this.buildWeekdaySelectList();
        }

        const minDateMoment = moment(minDate);
        const minDateDayOfTheWeek: number = minDateMoment.weekday() + 1;
        let nextProcessingDate = minDateMoment;

        let recurranceAfterMinDate: WeekdayModel = weekdays.sort((a1, a2) => a1.DayOfTheWeekNumber - a2.DayOfTheWeekNumber).find(r => r.DayOfTheWeekNumber > minDateDayOfTheWeek);

        if (recurranceAfterMinDate) {
            let daysToAdd: number = recurranceAfterMinDate.DayOfTheWeekNumber - minDateDayOfTheWeek;
            nextProcessingDate.add(daysToAdd, 'days');
        } else {
            let firstWeekday: WeekdayModel = weekdays.sort((a1, a2) => a1.DayOfTheWeekNumber - a2.DayOfTheWeekNumber)[0];
            let daysToAdd: number = 7 - minDateDayOfTheWeek + firstWeekday.DayOfTheWeekNumber;

            nextProcessingDate.add(daysToAdd, 'days');
        }

        return this.getNextProcessingDate(nextProcessingDate.format("MM/DD/YYYY"), minDate);
    }

    getNextProcessingDayByDayOfTheMonth(days: number[], minDate: Date): string {
        let daysToAdd: number = 0;

        days = days.sort((a1, a2) => +a1 - +a2);

        days.forEach(d => {
            if (d > moment(minDate).date() && daysToAdd === 0) {
                daysToAdd = d - moment(minDate).date();
            }
        });

        if (daysToAdd === 0) {
            let smallestDateSupplied: number = days[0];

            let lastDayOfMonth: number = moment().endOf('month').date();
            let minDayOfMonth: number = moment(minDate).date();

            let daysLeftInMonth: number = lastDayOfMonth - minDayOfMonth;

            daysToAdd = daysLeftInMonth + smallestDateSupplied;
        }

        let nextProcessingDate = moment(minDate).add(daysToAdd, "days");

        return this.getNextProcessingDate(nextProcessingDate.format("MM/DD/YYYY"), minDate);
    }

    getNextProcessingDateByIndexAndWeekday(index: number[], weekday: number, minDate: Date): string {
        const minDateMoment = moment(minDate)

        let momentWeekday: number = weekday - 1;
        let minDateWeek: number = Math.ceil(minDateMoment.date() / 7);
        let minDateWeekday: number = minDateMoment.weekday();
        let searchWeek: number;
        let closestWeek: number;
        let searchMonth: number = 0;
        let dateSource: WeeksAndDaysOfMonth[];

        closestWeek = +index.sort((a1, a2) => +a1 - +a2).find(x => x >= minDateWeek);

        if (closestWeek === minDateWeek) {
            if (momentWeekday > minDateWeekday) {
                searchWeek = closestWeek;
            } else {
                closestWeek = +index.sort((a1, a2) => +a1 - +a2).find(x => x > minDateWeek);
                if (closestWeek) {
                    searchWeek = closestWeek;
                } else {
                    searchWeek = +index.sort((a1, a2) => +a1 - +a2)[0];
                    searchMonth++;
                }
            }
        }

        if (!searchWeek || searchWeek === 0) {
            closestWeek = +index.sort((a1, a2) => +a1 - +a2).find(x => x > minDateWeek);
            if (closestWeek) {
                searchWeek = closestWeek;
            } else {
                searchWeek = +index.sort((a1, a2) => +a1 - +a2)[0];
                searchMonth++;
            }
        }

        let result = this.findMatchingDay(momentWeekday, searchWeek, minDateMoment.month() + searchMonth);
        let resultMoment = result ? moment().year(result.year).month(result.month).date(result.day) : undefined;

        if (resultMoment.isBefore(minDate)) {
            searchMonth++;
            result = this.findMatchingDay(momentWeekday, searchWeek, minDateMoment.month() + searchMonth);
            resultMoment = result ? moment().year(result.year).month(result.month).date(result.day) : undefined;
        }

        return resultMoment ? this.getNextProcessingDate(resultMoment.format("MM/DD/YYYY"), minDate) : undefined;
    }

    getWeekDayByIndex(weekDayIndex: number): WeekdayModel {
        if (!this.weekdaySelectionList || this.weekdaySelectionList.length === 0) {
            this.buildWeekdaySelectList();
        }

        return this.weekdaySelectionList.find(d => d.DayOfTheWeekNumber === +weekDayIndex);
    }

    private findMatchingDay(weekday: number, week: number, month: number): WeeksAndDaysOfMonth {
        let monthlyDataList = this.buildWeeksAndDaysOfMonthList(month);

        while (!monthlyDataList.find(x => x.week === week && x.weekday === weekday)) {
            week--;
            break;
        }

        const result = monthlyDataList.find(x => x.week === week && x.weekday === weekday);
        
        return result;    
    }

    private buildWeeksAndDaysOfMonthList(month: number) {
        const monthlyDataList: WeeksAndDaysOfMonth[] = [];
        for (var d = 1; d <= moment().month(month).endOf("month").date(); d++) {
            let variable = new WeeksAndDaysOfMonth();

            variable.week = Math.ceil(moment().month(month).date(d).date() / 7);
            variable.weekday = moment().month(month).date(d).weekday();
            variable.month = moment().month(month).month();
            variable.day = d;
            variable.year = moment().month(month).year();

            monthlyDataList.push(variable);
        }

        return monthlyDataList;
    }

    private buildWeekdaySelectList() {
        this.weekdaySelectionList = [];
        this.weekdaySelectionList.push(new WeekdayModel(2, 'Monday'));
        this.weekdaySelectionList.push(new WeekdayModel(3, 'Tuesday'));
        this.weekdaySelectionList.push(new WeekdayModel(4, 'Wednesday'));
        this.weekdaySelectionList.push(new WeekdayModel(5, 'Thursday'));
        this.weekdaySelectionList.push(new WeekdayModel(6, 'Friday'));

        return this.weekdaySelectionList;
    }
}

export class WeeksAndDaysOfMonth {
    week: number;
    weekday: number;
    month: number;
    day: number;
    year: number;
}