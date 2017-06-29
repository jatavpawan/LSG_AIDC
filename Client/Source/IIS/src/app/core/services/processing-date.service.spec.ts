import * as moment from 'moment';

import { ProcessingDateService } from './processing-date.service';
import { Holiday } from '../../shared/models/holiday.model';
import { WeekdayModel } from "../../shared/models/week-day.model";
import { SchedulerContainer } from "../../shared/models/scheduler-container.model";
import { RecurringSchedule } from "../../shared/models/recurring-schedule.model";
import { MonthlySchedule } from "../../shared/models/monthly-schedule.model";
import { WeeklySchedule } from "../../shared/models/weekly-schedule.model";


describe('Processing Date Service', () => {
    let mockHolidayDates: Holiday[] = [];
    let mockHolidayDate1: Holiday = new Holiday();

    mockHolidayDate1.holidayDate = '07/04/2017';
    mockHolidayDate1.holidayDescription = 'Fourth of July';
    mockHolidayDate1.isNonprocessingDayFederal = true;

    mockHolidayDates.push(mockHolidayDate1);

    let mockHolidayDate2: Holiday = new Holiday();

    mockHolidayDate2.holidayDate = '12/25/2017';
    mockHolidayDate2.holidayDescription = 'Christmas';
    mockHolidayDate2.isNonprocessingDayFederal = true;

    let mockHolidayDate3: Holiday = new Holiday();

    mockHolidayDate3.holidayDate = '6/14/2017';
    mockHolidayDate3.holidayDescription = 'Some Fake Holiday';
    mockHolidayDate3.isNonprocessingDayFederal = false;

    mockHolidayDates.push(mockHolidayDate2);

    let service = new ProcessingDateService(mockHolidayDates);
    beforeEach(() => {

    });

    describe('getProcessingDateErrors', () => {
        it('should return error when date is weekend', () => {
            let today: Date = new Date();
            let results: string = service.getProcessingDateErrors('04/15/2017', moment('04/14/2017').toDate());

            expect(results).toEqual('Weekend Non-Processing Date Selected');
        });
        it('should return error when date is fourth of july', () => {
            let results: string = service.getProcessingDateErrors('07/04/2017', moment('07/03/2017').toDate());

            expect(results).toEqual('Holiday Non-Processing Date Selected: Fourth of July');
        });
    });

    describe('getNextProcessingDate',
        () => {
            it('should return monday after a date set on saturday',
                () => {
                    let momentTestDate: any = moment().weekday(6);
                    let momentExpectedDate: any = moment().week(moment().week() + 1).weekday(1);
                    let prependDate = momentExpectedDate.date() < 9 ? '0' : '';
                    let testDateString: string = (momentTestDate.month() + 1) + '/' + momentTestDate.date() + '/' + momentTestDate.year();
                    let testExpectedDateString = (momentExpectedDate.month() + 1) + '/' + prependDate + momentExpectedDate.date() + '/' + momentExpectedDate.year();
                    let prependZero = moment().month() < 9 ? '0' : '';
                    testExpectedDateString = prependZero + testExpectedDateString;
                    const minDate = moment(testExpectedDateString).subtract(1, 'days');
                    let nextProcessingDate: string = service.getNextProcessingDate(testDateString, minDate.toDate());

                    expect(nextProcessingDate).toEqual(testExpectedDateString);
                });
            it('should return the day after a holiday', () => {
                let nextProcessingDate: string = service.getNextProcessingDate('07/04/2017', moment('07/03/2017').toDate());

                expect(nextProcessingDate).toEqual('07/05/2017');
            });
        });

    describe('getProcessingDateDisabledList', () => {
        it('should return the list of holiday dates', () => {
            let processingDateExclusionList: any[] = service.getProcessingDateDisableList();

            expect(processingDateExclusionList.length).toEqual(2);
        });
    });

    describe('getNextProcessingDateByWeekdayArray', () => {
        function momentWeekDayToBackendWeekday(momentWeekDay: number) {
            return momentWeekDay + 1;
        }

        it('should return the next processing day given an array of WeekdayModels and minDate of today', () => {
            const minDate = moment();

            let weekdays: WeekdayModel[] = [];

            weekdays.push(new WeekdayModel(2, "Monday"));
            weekdays.push(new WeekdayModel(4, "Wednesday"));

            let nextProcDate: string = service.getNextProcessingDateByWeekdayArray(weekdays, minDate.toDate());

            if (minDate.weekday() >= 3) {
                expect(moment(nextProcDate).weekday()).toEqual(1);
            } else {
                expect(moment(nextProcDate).weekday()).toEqual(3);
            }
        });

        it('should return the current day given an array of WeekdayModels and minDate of yesterday', () => {
            const today = moment();
            const minDate = moment().subtract(1, 'days');

            const weekdays: WeekdayModel[] = [];
            weekdays.push(new WeekdayModel(momentWeekDayToBackendWeekday(today.weekday()), today.format('dddd')));

            const nextProcDate: string = service.getNextProcessingDateByWeekdayArray(weekdays, minDate.toDate());

            expect(moment(nextProcDate).weekday()).toEqual(today.weekday());
        });
    });

    describe('getNextProcessingDayByDayOfTheMonth', () => {
        it('should return the next processing day for an array of days of the month and minDate of today', () => {
            const minDate = moment();

            const days: number[] = [];
            days.push(1);
            days.push(15);

            let nextProcDate: string = service.getNextProcessingDayByDayOfTheMonth(days, minDate.toDate());

            if (minDate.date() >= 15) {
                expect(moment(nextProcDate).month()).toEqual(minDate.month() + 1);
            } else {
                expect(moment(nextProcDate).month()).toEqual(minDate.month());
            }
        });

        it('should return the current day given an array of days of the month and minDate of yesterday', () => {
            const today = moment('2017-05-26');
            const minDate = moment('2017-05-26').subtract(1, 'days');

            const days: number[] = [];
            days.push(1);
            days.push(26);

            let nextProcDate: string = service.getNextProcessingDayByDayOfTheMonth(days, minDate.toDate());

            expect(nextProcDate).toEqual(today.format('MM/DD/YYYY'));
        });
    });

    describe('getNextProcessingDateByIndexAndWeekday', () => {
        it('should return the next processing day for an array of day indexes and the weekday number for the next month and minDate is today', () => {
            let minDate = moment()

            let dayArray: number[] = [];

            dayArray.push(1);

            let weekday: number = 1;

            let minDateWeek: number = Math.ceil(minDate.date() / 7);
            let minDateWeekDay: number = minDate.weekday();


            let nextProcDate: string = service.getNextProcessingDateByIndexAndWeekday(dayArray, weekday, minDate.toDate());

            if (minDateWeek === 1 && minDateWeekDay >= weekday) {
                expect(moment(nextProcDate).month()).toEqual(moment(minDate).month() + 1);
            } 
        });

        it('should return the current day as next processing day for an array of day indexes and the weekday number for the next month and minDate is yesterday', () => {
            const today = moment();
            const minDate = moment().subtract(1, 'days');

            const weekday = today.weekday() + 1; //to match what we get back from UI
            const currentWeek: number = Math.ceil(today.date() / 7);
            const dayArray: number[] = [currentWeek];

            const nextProcDate: string = service.getNextProcessingDateByIndexAndWeekday(dayArray, weekday, minDate.toDate());

            expect(nextProcDate).toBe(today.format('MM/DD/YYYY'));
        });

        it("should return arbitraryDate when minDate and today's date are in different months", () => {
            const arbitraryDate = '06/01/2017';
            const today = moment(arbitraryDate);
            const minDate = moment(arbitraryDate).subtract(1, 'days');

            const weekday = today.weekday() + 1; //to match what we get back from UI
            const currentWeek: number = Math.ceil(today.date() / 7);
            const dayArray: number[] = [currentWeek];

            const nextProcDate: string = service.getNextProcessingDateByIndexAndWeekday(dayArray, weekday, minDate.toDate());

            expect(nextProcDate).toBe(arbitraryDate);
        });

        it('should return correct date when the resulting date is before the mindate', () => {
            const minDate = moment('05/29/2017');
            const weekday = 6;
            const dayArray: number[] = [5];

            const nextProcDate: string = service.getNextProcessingDateByIndexAndWeekday(dayArray, weekday, minDate.toDate());

            expect(nextProcDate).toBe('06/30/2017')
        });

        it('should not return a start date of a holiday', () => {
            const minDate = moment('07/03/2017');
            const weekday = 3;
            const dayArray: number[] = [1];

            const nextProcDate: string = service.getNextProcessingDateByIndexAndWeekday(dayArray, weekday, minDate.toDate());

            expect(nextProcDate).toBe('07/05/2017');
        });
    });

    describe('formatProcessingDates', () => {
        it('should return scheduler container with firstpayment date of OneTimePaymentDate when the schedule is OneTimePaymentDate', () => {
            const expected = '1/1/2017'
            const schedule = new SchedulerContainer();
            schedule.Frequency = 'once';
            schedule.OneTimePaymentDate = expected;

            const result = service.formatProcessingDates([expected], schedule);

            expect(result.FirstPaymentDate).toEqual(expected);
        });

        it('should return scheduler container with firstpayment date of monthly schedule start date when the schedule is recurring monthly schedule', () => {
            const expected = '2/1/2017';
            const schedule = new SchedulerContainer();
            schedule.Frequency = 'recurring';
            schedule.RecurringSchedule = new RecurringSchedule();
            schedule.RecurringSchedule.WeeklySchedule = new WeeklySchedule();
            schedule.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            schedule.RecurringSchedule.MonthlySchedule.StartDate = expected;

            const result = service.formatProcessingDates(['1/1/2017'], schedule);

            expect(result.FirstPaymentDate).toEqual(expected);
        });

        it('should return scheduler container with firstpayment date of weekly schedule start date when the schedule is recurring weekly schedule', () => {
            const expected = '2/7/2017';
            const schedule = new SchedulerContainer();
            schedule.Frequency = 'recurring';
            schedule.RecurringSchedule = new RecurringSchedule();
            schedule.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            schedule.RecurringSchedule.WeeklySchedule = new WeeklySchedule();
            schedule.RecurringSchedule.WeeklySchedule.StartDate = expected;

            const result = service.formatProcessingDates(['1/1/2017'], schedule);

            expect(result.FirstPaymentDate).toEqual(expected);
        });

        it('should return scheduler container with endpaymentdate of last processing date when the schedule is recurring and we have a monthly end date or weekly end date', () => {
            let expected = '2/1/2017';
            const schedule = new SchedulerContainer();
            schedule.Frequency = 'recurring';
            schedule.RecurringSchedule = new RecurringSchedule();
            schedule.RecurringSchedule.WeeklySchedule = new WeeklySchedule();
            schedule.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            schedule.RecurringSchedule.MonthlySchedule.HasEndDate = true;

            let result = service.formatProcessingDates(['1/1/2017', expected], schedule);
            expect(result.EndPaymentDate).toEqual(expected);

            schedule.RecurringSchedule.WeeklySchedule = new WeeklySchedule();
            schedule.RecurringSchedule.WeeklySchedule.HasEndDate = true;

            expected = '1/7/2017';
            result = service.formatProcessingDates(['1/1/2017', expected], schedule);
            expect(result.EndPaymentDate).toEqual(expected);
        });
    });
});