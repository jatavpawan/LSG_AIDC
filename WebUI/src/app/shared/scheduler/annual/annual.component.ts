import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { IMyOptions } from 'mydatepicker';

import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';
import { AnnualSchedule } from '../../models/annual-schedule.model';

@Component({
    selector: 'annual-component',
    templateUrl: 'annual.component.html'
})
export class AnnualComponent implements OnInit {

    @Input() annualSchedule: AnnualSchedule;
    @Output() onDateSelected = new EventEmitter<AnnualSchedule>();
    @Input() isReadOnly: boolean = false;
    @Input() minDate: Date;

    datePickerOptions: IMyOptions;
    endDateOption: string;
    hideStartDateError: boolean;
    hideEndDateError: boolean;
    endAfterNPaymentsRequired: boolean;
    endFrequencyRequired: boolean;
    endOnDateRequired: boolean;
    endDateSelectionError: boolean;
    paymentInitiationYearFieldRequired: boolean;

    constructor(private centralCodesHolidayDataService: CentralCodesDataService) {
    }

    ngOnInit(): void {
        if (!this.annualSchedule) {
            this.annualSchedule = new AnnualSchedule();
        } else {
            this.hideEndDateError = true;
            this.endDateSelectionError = false;
            this.paymentInitiationYearFieldRequired = false;
            this.hideStartDateError = false;
            if (!this.annualSchedule.HasEndDate) {
                this.endDateOption = 'none';
            } else if (this.annualSchedule.EndAfterNPayments && this.annualSchedule.EndAfterNPayments > 0) {
                this.endDateOption = 'endAfter';
            } else if (this.annualSchedule.EndDate !== undefined && this.annualSchedule.EndDate !== '' && this.annualSchedule.EndDate !== null) {
                this.endDateOption = 'endOn';
            }

            this.scheduleEndChanged(this.endDateOption);
        }

        this.hideStartDateError = true;
        this.hideEndDateError = true;

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

    annualStartDateSelected(date: string) {
        this.annualSchedule.StartDate = date;
        this.startDateRequired();
        this.onDateSelected.emit(this.annualSchedule);
    }
    annualEndDateSelected(date: string) {
        this.annualSchedule.EndDate = date;
        this.endDateRequired();
        this.onDateSelected.emit(this.annualSchedule);
    }

    startDateRequired() {
        if (!this.annualSchedule.StartDate) {
            this.hideStartDateError = false;
        } else {
            this.hideStartDateError = true;
        }
    }

    endDateRequired() {
        if (!this.annualSchedule.EndDate) {
            this.hideEndDateError = false;
        } else {
            this.hideEndDateError = true;
        }
    }

    scheduleEndChanged(scheduleEnd: string) {
        this.endDateOption = scheduleEnd;

        if (scheduleEnd === 'none') {
            this.endAfterNPaymentsRequired = false;
            this.endOnDateRequired = false;
            this.annualSchedule.HasEndDate = false;
            this.annualSchedule.EndDate = undefined;
            this.annualSchedule.EndAfterNPayments = undefined;
        }
        else if (scheduleEnd === 'endAfter') {
            this.endOnDateRequired = false;
            this.annualSchedule.HasEndDate = true;
            this.annualSchedule.EndDate = undefined;
        } else if (scheduleEnd === 'endOn') {
            this.endAfterNPaymentsRequired = false;
            this.annualSchedule.HasEndDate = true;
            this.annualSchedule.EndAfterNPayments = undefined;
        }
    }

    endDateSelected(date: string) {
        if (!this.endDateSelectionError) {
            this.annualSchedule.HasEndDate = true;
            this.annualSchedule.EndDate = date;
            this.endOnDateRequired = false;
        }
    }

    setEndPaymentsFieldDirty() {
        this.paymentInitiationYearFieldRequired = false;
    }

    setEndPaymentsAfterNYearsDirty() {
        this.endAfterNPaymentsRequired = false;
    }

    hasErrors() {
        let hasErrors = false;

        if (this.annualSchedule.StartDate === undefined || this.annualSchedule.StartDate === '') {
            this.hideStartDateError = false;
            hasErrors = true;
        } else {
            this.hideStartDateError = true;
        }

        if (this.endFrequencyRequired) {
            this.endFrequencyRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endAfter' && (this.annualSchedule.EndAfterNPayments === undefined || this.annualSchedule.EndAfterNPayments < 1)) {
            this.endAfterNPaymentsRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endOn' && (this.annualSchedule.EndDate === undefined || this.annualSchedule.EndDate.trim() === "")) {
            this.endOnDateRequired = true;
            hasErrors = true;
        }

        return hasErrors;
    }
}