import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { IMyOptions } from 'mydatepicker';

import { DaysOfTheWeekComponent } from '../daysoftheweek/days-of-the-week.component';
import { MonthlySchedule } from '../../../shared/models/monthly-schedule.model';
import { DaysOfTheWeek } from '../../../shared/models/days-of-the-week.model';
import { WeekdayModel } from '../../../shared/models/week-day.model';
import { ProcessingDateService } from '../../../core/services/processing-date.service';
import { Holiday } from '../../../shared/models/holiday.model';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';

@Component({
    selector: 'monthly-component',
    templateUrl: 'monthly.component.html',
    styleUrls: ['monthly.component.scss']
})

export class MonthlyComponent implements OnInit {

    @Output() isValid = new EventEmitter<boolean>();

    @Input() monthlySchedule: MonthlySchedule;
    @Input() isReadOnly: boolean = false;
    @Input() prepaymentRestriction: string;
    @Input() minDate: Date;

    endDateOption: string;
    numberPickerRequired: boolean;
    recurRequired: boolean;
    paymentInitiationRequired: boolean;
    paymentInitiationMonthFieldRequired: boolean;
    startDateRequired: boolean;
    endFrequencyRequired: boolean;
    endAfterNPaymentsRequired: boolean;
    endOnDateRequired: boolean;
    startDateSelectionError: string;
    endDateSelectionError: string;
    processingDateService: ProcessingDateService;
    datePickerOptions: IMyOptions;

    private payOnIndex: number[];
    private payOnWeekday: number;

    constructor(private centralCodesHolidayDataService: CentralCodesDataService) {
    }

    @ViewChild(DaysOfTheWeekComponent) daysOfTheWeekComponent: DaysOfTheWeekComponent;

    ngOnInit(): void {
        this.initializeObjects();
    }

    public initializeObjects() {
        this.datePickerOptions = {
            // other options...
            dateFormat: 'mm/dd/yyyy',
            disableDays: [],
            disableUntil: {
                year: this.minDate.getFullYear(),
                month: this.minDate.getMonth() + 1,
                day: this.minDate.getDate()
            },
            todayBtnTxt: 'Today',
            firstDayOfWeek: 'su',
            sunHighlight: true,
            height: '2.125rem',
            inline: false,
            selectionTxtFontSize: '.875rem',
            componentDisabled: this.isReadOnly,
            openSelectorTopOfInput: true,
            showSelectorArrow: false
        };

        if (!this.monthlySchedule) {
            this.monthlySchedule = new MonthlySchedule();
            this.monthlySchedule.DaysOfTheWeek = new DaysOfTheWeek;
            this.monthlySchedule.CalendarDays = [];
            this.monthlySchedule.PayOnIndex = [];
        }

        if (!this.monthlySchedule.HasEndDate) {
            this.scheduleEndChanged('none');
        } else if (this.monthlySchedule.EndPaymentsAfterNMonths) {
            this.scheduleEndChanged('endAfter');
        } else if (this.monthlySchedule.EndDate) {
            this.scheduleEndChanged('endOn');
        }
        if (this.isReadOnly) {
            return;
        }
        
        this.centralCodesHolidayDataService.getCentralCodesHolidays()
            .subscribe((ret: Holiday[]) => {
                if (ret && ret.length > 0) {
                    this.processingDateService = new ProcessingDateService(ret);
                }
            },
            (err: any) => {
                //TODO: Add new growler message
            });
        if (this.monthlySchedule.PayEveryMonth !== undefined) {
            this.paymentInitiationRequired = false;
        }

        if (this.monthlySchedule.PayEveryNMonths !== undefined) {
            this.paymentInitiationMonthFieldRequired = false;
        }

        if (this.prepaymentRestriction && this.prepaymentRestriction === '1') {
            this.monthlySchedule.RecurBy = 'calendarDay';
            this.recurChanged(this.monthlySchedule.RecurBy);
        }
    }

    recurChanged(selection: string) {
        this.monthlySchedule.DaysOfTheWeek = new DaysOfTheWeek();
        this.monthlySchedule.CalendarDays = [];
        this.monthlySchedule.PayOnIndex = [];
        this.monthlySchedule.RecurBy = selection;
        this.recurRequired = false;
    }

    scheduleEndChanged(scheduleEnd: string) {
        this.endDateOption = scheduleEnd;
        this.endFrequencyRequired = false;

        if (scheduleEnd === 'none') {
            this.endAfterNPaymentsRequired = false;
            this.endOnDateRequired = false;
            this.monthlySchedule.HasEndDate = false;
            this.monthlySchedule.EndDate = undefined;
            this.monthlySchedule.EndPaymentsAfterNMonths = undefined;
        }
        else if (scheduleEnd === 'endAfter') {
            this.endOnDateRequired = false;
            this.monthlySchedule.HasEndDate = true;
            this.monthlySchedule.EndDate = undefined;
        } else if (scheduleEnd === 'endOn') {
            this.endAfterNPaymentsRequired = false;
            this.monthlySchedule.HasEndDate = true;
            this.monthlySchedule.EndPaymentsAfterNMonths = undefined;
        }
    }

    startDateSelected(date: string) {
        if (!this.startDateSelectionError) {
            this.monthlySchedule.StartDate = date;
            this.startDateRequired = false;
        }
    }

    endDateSelected(date: string) {
        if (!this.endDateSelectionError) {
            this.monthlySchedule.HasEndDate = true;
            this.monthlySchedule.EndDate = date;
            this.endOnDateRequired = false;
        }
    }

    numberSelected(number: number) {
        let index = this.monthlySchedule.CalendarDays.indexOf(number);
        if (index > -1) {
            this.monthlySchedule.CalendarDays.splice(index, 1);
        } else {
            this.monthlySchedule.CalendarDays.push(number);
        }
        if (this.monthlySchedule.RecurBy === 'calendarDay' && this.monthlySchedule.CalendarDays.length > 0) {
            this.numberPickerRequired = false;
        }

        if (this.monthlySchedule && this.monthlySchedule.CalendarDays && this.monthlySchedule.CalendarDays.length > 0) {
            this.monthlySchedule.StartDate = this.processingDateService
                .getNextProcessingDayByDayOfTheMonth(this.monthlySchedule.CalendarDays, this.minDate);
        }
    }

    setMonthlyRecurrence(monthlyRecurrence: string) {
        if (monthlyRecurrence === 'monthly') {
            this.monthlySchedule.PayEveryMonth = true;
            this.monthlySchedule.PayEveryNMonths = undefined;
        } else {
            this.monthlySchedule.PayEveryMonth = false;
        }

        this.paymentInitiationRequired = false;
    }

    getComponentModelData() {
        if (this.daysOfTheWeekComponent && this.monthlySchedule.RecurBy === 'daysOfWeek') {
            this.monthlySchedule.DaysOfTheWeek = this.daysOfTheWeekComponent.getComponentModelData();
        }

        return this.monthlySchedule;
    }

    setEndPaymentsFieldDirty() {
        this.paymentInitiationMonthFieldRequired = false;
    }

    setEndPaymentsAfterNMonthsDirty() {
        this.endAfterNPaymentsRequired = false;
    }

    onPayOnIndexChange(index: number[]) {
        this.payOnIndex = index;
        if (this.payOnWeekday && this.payOnIndex && this.payOnIndex.length > 0) {
            this.monthlySchedule.StartDate = this.processingDateService
                .getNextProcessingDateByIndexAndWeekday(this.payOnIndex, this.payOnWeekday, this.minDate);
        }
    }

    onPayOnWeekdayChange(weekday: WeekdayModel) {
        this.payOnWeekday = weekday.DayOfTheWeekNumber;
        if (this.payOnWeekday && this.payOnIndex && this.payOnIndex.length > 0) {
            this.monthlySchedule.StartDate = this.processingDateService
                .getNextProcessingDateByIndexAndWeekday(this.payOnIndex, this.payOnWeekday, this.minDate);
        }
    }

    hasErrors() {
        let hasErrors = false;

        if (this.monthlySchedule.RecurBy === 'calendarDay' && this.monthlySchedule.CalendarDays.length < 1) {
            this.numberPickerRequired = true;
            hasErrors = true;
        }

        if (!this.monthlySchedule.RecurBy) {
            this.recurRequired = true;
            hasErrors = true;
        }

        if (this.paymentInitiationRequired !== false) {
            this.paymentInitiationRequired = true;
            hasErrors = true;
        }

        if (this.daysOfTheWeekComponent) {
            hasErrors = this.daysOfTheWeekComponent.hasErrors();
        }

        if (this.paymentInitiationMonthFieldRequired) {
            hasErrors = true;
        }

        if (this.monthlySchedule.StartDate === undefined || this.monthlySchedule.StartDate === '') {
            this.startDateRequired = true;
            hasErrors = true;
        } else {
            this.startDateRequired = false;
        }

        if (this.endFrequencyRequired !== false) {
            this.endFrequencyRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endAfter' && (this.monthlySchedule.EndPaymentsAfterNMonths === undefined || this.monthlySchedule.EndPaymentsAfterNMonths < 1)) {
            this.endAfterNPaymentsRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endOn' && (this.monthlySchedule.EndDate === undefined || this.monthlySchedule.EndDate.trim() === "")) {
            this.endOnDateRequired = true;
            hasErrors = true;
        }

        if (this.monthlySchedule.PayEveryMonth !== undefined && this.monthlySchedule.PayEveryMonth === false && !this.monthlySchedule.PayEveryNMonths) {
            this.paymentInitiationMonthFieldRequired = true;
            hasErrors = true;
        }

        return hasErrors;
    }

}