import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { IMyOptions } from 'mydatepicker';

import { QuarterlySchedule } from '../../models/quarterly-schedule.model';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';

@Component({
    selector: 'quarterly-component',
    templateUrl: 'quarterly.component.html'
})
export class QuarterlyComponent implements OnInit {

    @Input() quarterlySchedule: QuarterlySchedule;
    @Output() onDateSelected = new EventEmitter<QuarterlySchedule>();
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
        if (!this.quarterlySchedule) {
            this.quarterlySchedule = new QuarterlySchedule();
        } else {
            this.hideEndDateError = true;
            this.endDateSelectionError = false;
            this.paymentInitiationYearFieldRequired = false;
            this.hideStartDateError = false;
            if (!this.quarterlySchedule.HasEndDate) {
                this.endDateOption = 'none';
            } else if (this.quarterlySchedule.EndAfterNPayments && this.quarterlySchedule.EndAfterNPayments > 0) {
                this.endDateOption = 'endAfter';
            } else if (this.quarterlySchedule.EndDate !== undefined && this.quarterlySchedule.EndDate !== '' && this.quarterlySchedule.EndDate !== null) {
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

    quarterlyStartDateSelected(date: string) {
        this.quarterlySchedule.StartDate = date;
        this.startDateRequired();
        this.onDateSelected.emit(this.quarterlySchedule);
    }
    quarterlyEndDateSelected(date: string) {
        this.quarterlySchedule.EndDate = date;
        this.endDateRequired();
        this.onDateSelected.emit(this.quarterlySchedule);
    }

    startDateRequired() {
        if (!this.quarterlySchedule.StartDate) {
            this.hideStartDateError = false;
        } else {
            this.hideStartDateError = true;
        }
    }

    endDateRequired() {
        if (!this.quarterlySchedule.EndDate) {
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
            this.quarterlySchedule.HasEndDate = false;
            this.quarterlySchedule.EndDate = undefined;
            this.quarterlySchedule.EndAfterNPayments = undefined;
        }
        else if (scheduleEnd === 'endAfter') {
            this.endOnDateRequired = false;
            this.quarterlySchedule.HasEndDate = true;
            this.quarterlySchedule.EndDate = undefined;
        } else if (scheduleEnd === 'endOn') {
            this.endAfterNPaymentsRequired = false;
            this.quarterlySchedule.HasEndDate = true;
            this.quarterlySchedule.EndAfterNPayments = undefined;
        }
    }

    endDateSelected(date: string) {
        if (!this.endDateSelectionError) {
            this.quarterlySchedule.HasEndDate = true;
            this.quarterlySchedule.EndDate = date;
            this.endOnDateRequired = false;
        }
    }

    setEndPaymentsFieldDirty() {
        this.paymentInitiationYearFieldRequired = false;
    }

    setEndPaymentsAfterNQuartersDirty() {
        this.endAfterNPaymentsRequired = false;
    }

    hasErrors() {
        let hasErrors = false;

        if (this.quarterlySchedule.StartDate === undefined || this.quarterlySchedule.StartDate === '') {
            this.hideStartDateError = false;
            hasErrors = true;
        } else {
            this.hideStartDateError = true;
        }

        if (this.endFrequencyRequired) {
            this.endFrequencyRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endAfter' && (this.quarterlySchedule.EndAfterNPayments === undefined || this.quarterlySchedule.EndAfterNPayments < 1)) {
            this.endAfterNPaymentsRequired = true;
            hasErrors = true;
        }

        if (this.endDateOption === 'endOn' && (this.quarterlySchedule.EndDate === undefined || this.quarterlySchedule.EndDate.trim() === "")) {
            this.endOnDateRequired = true;
            hasErrors = true;
        }

        return hasErrors;
    }

}