import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { IMyOptions } from 'mydatepicker';

import { WeeklySchedule } from '../../../shared/models/weekly-schedule.model';
import { WeekdayModel } from '../../../shared/models/week-day.model';
import { ProcessingDateService } from '../../../core/services/processing-date.service';
import { Holiday } from '../../../shared/models/holiday.model';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';

@Component({
    selector: 'weekly-component',
    templateUrl: 'weekly.component.html',
    styleUrls: ['weekly.component.scss']
})

export class WeeklyComponent implements OnInit {

    @Output() isValid = new EventEmitter<boolean>();

    @Input() weeklySchedule: WeeklySchedule;
    @Input() isReadOnly: boolean = false;
    @Input() minDate: Date;

    endDateOption: string;

    daySelectedRequired: boolean;
    startDateRequired: boolean;
    endFrequencyRequired: any;
    endPaymentsAfterNWeeksRequired: boolean;
    endOnDateRequired: boolean;
    paymentInitiationWeekFieldRequired: boolean;
    paymentInitiationRequired: boolean;
    startDateSelectionError: string;
    endDateSelectionError: string;
    weekdaySelectionList: WeekdayModel[];
    processingDateService: ProcessingDateService;
    recurDays: WeekdayModel[];
    datePickerOptions: IMyOptions;

    constructor(private centralCodesHolidayDataService: CentralCodesDataService) {
    }

    ngOnInit(): void {
        this.initializeObjects();
    }

    initializeObjects() {
        if (!this.weeklySchedule) {
            this.weeklySchedule = new WeeklySchedule();
        }

        if (!this.weeklySchedule.RecurBy) {
            this.weeklySchedule.RecurBy = [];
        } else {
            this.recurDays = [];
            for (let day of this.weeklySchedule.RecurBy) {
                if (day) {
                    this.recurDays.push(day);
                }
            }
        }

        if (this.weeklySchedule.PayEveryWeek !== undefined) {
            this.paymentInitiationRequired = false;
        }

        if (this.weeklySchedule.PayEveryNWeeks !== undefined) {
            this.paymentInitiationWeekFieldRequired = false;
        }

        if (!this.weeklySchedule.HasEndDate) {
            this.scheduleEndChanged('none');
        } else if (this.weeklySchedule.EndPaymentsAfterNWeeks) {
            this.scheduleEndChanged('endAfter');
        } else if (this.weeklySchedule.EndDate) {
            this.scheduleEndChanged('endOn');
        }

        this.centralCodesHolidayDataService.getCentralCodesHolidays()
            .subscribe((ret: Holiday[]) => {
                if (ret && ret.length > 0) {
                    this.initializeProcessingDateService(ret);
                }
            },
            (err: any) => {
                //TODO: Add new growler message
            });

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
            componentDisabled: this.isReadOnly
        };
    }

    public initializeProcessingDateService(holidayList: Holiday[]) {
        this.processingDateService = new ProcessingDateService(holidayList);
    }

    daySelectedToggle(selection: number) {
        this.daySelectedRequired = false;
        if (this.weeklySchedule.RecurBy) {
            let currentWeekDay: WeekdayModel = this.processingDateService.getWeekDayByIndex(+selection);
            let index = +this.weeklySchedule.RecurBy.findIndex(r => r.DayOfTheWeekNumber === currentWeekDay.DayOfTheWeekNumber);
            if (index > -1) {
                this.weeklySchedule.RecurBy.splice(index, 1);
            } else {
                this.weeklySchedule.RecurBy.push(currentWeekDay);
            }

            this.setStartDate();
        }
    }

    setStartDate() {
        if (this.weeklySchedule.RecurBy && this.weeklySchedule.RecurBy.length > 0) {

            this.weeklySchedule.StartDate = this.processingDateService
                .getNextProcessingDateByWeekdayArray(this.weeklySchedule.RecurBy, this.minDate);
        }
    }

    startDateSelected(date: string) {
        if (!this.startDateSelectionError) {
            this.startDateRequired = false;
            this.weeklySchedule.StartDate = date;
        }
    }

    endDateSelected(date: string) {
        if (!this.endDateSelectionError) {
            this.endOnDateRequired = false;
            this.weeklySchedule.HasEndDate = true;
            this.weeklySchedule.EndDate = date;
        }
    }

    scheduleEndChanged(scheduleEnd: string) {
        this.endDateOption = scheduleEnd;
        this.endFrequencyRequired = false;

        if (scheduleEnd === 'none') {
            this.endPaymentsAfterNWeeksRequired = false;
            this.endOnDateRequired = false;
            this.weeklySchedule.HasEndDate = false;
            this.weeklySchedule.EndDate = undefined;
            this.weeklySchedule.EndPaymentsAfterNWeeks = undefined;
        }
        else if (scheduleEnd === 'endAfter') {
            this.endPaymentsAfterNWeeksRequired = true;
            this.endOnDateRequired = false;
            this.weeklySchedule.HasEndDate = true;
            this.weeklySchedule.EndDate = undefined;
        }
        else if (scheduleEnd === 'endOn') {
            this.endPaymentsAfterNWeeksRequired = false;
            this.weeklySchedule.HasEndDate = true;
            this.weeklySchedule.EndPaymentsAfterNWeeks = undefined;
        }
    }

    setPayEveryWeek(payFrequency: string) {
        if (payFrequency === 'weekly') {
            this.weeklySchedule.PayEveryWeek = true;
            this.weeklySchedule.PayEveryNWeeks = undefined;
        } else {
            this.weeklySchedule.PayEveryWeek = false;
        }
        this.paymentInitiationRequired = false;
    }

    setEndPaymentsFieldDirty() {
        this.paymentInitiationWeekFieldRequired = false;
    }

    setEndPaymentsAfterNWeeksDirty() {
        this.endPaymentsAfterNWeeksRequired = false;
    }

    getComponentModelData() {
        return this.weeklySchedule;
    }

    hasErrors() {
        let hasErrors = false;

        if (this.paymentInitiationRequired !== false) {
            this.paymentInitiationRequired = true;
            hasErrors = true;
        }

        if (this.weeklySchedule.RecurBy === undefined || this.weeklySchedule.RecurBy.length < 1) {
            this.daySelectedRequired = true;
            hasErrors = true;
        }

        if (this.weeklySchedule.StartDate === undefined || this.weeklySchedule.StartDate.trim() === "") {
            this.startDateRequired = true;
            hasErrors = true;
        } else {
            this.startDateRequired = false;
        }

        if (this.endFrequencyRequired !== false) {
            this.endFrequencyRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endAfter' && this.weeklySchedule.EndPaymentsAfterNWeeks === undefined) {
            this.endPaymentsAfterNWeeksRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endOn' &&
            (this.weeklySchedule.EndDate === undefined || this.weeklySchedule.EndDate.trim() === "")) {
            this.endOnDateRequired = true;
            hasErrors = true;
        }

        if (this.weeklySchedule.PayEveryWeek !== undefined &&
            this.weeklySchedule.PayEveryWeek === false &&
            !this.weeklySchedule.PayEveryNWeeks) {
            this.paymentInitiationWeekFieldRequired = true;
            hasErrors = true;
        }

        return hasErrors;
    }

    containsWeekday(recurDays: WeekdayModel[], value: number) {
        let ret = false;

        if (recurDays && recurDays.length > 0) {
            this.recurDays.forEach(day => {
                if (day && day.DayOfTheWeekNumber === value) {
                    ret = true;
                }
            });
        }

        return ret;
    }
}