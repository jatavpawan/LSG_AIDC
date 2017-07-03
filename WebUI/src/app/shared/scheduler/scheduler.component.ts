import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { IMyOptions } from 'mydatepicker';

import { SchedulerContainer } from '../../shared/models/scheduler-container.model';
import { RecurringComponent } from './recurring/recurring.component';
import { RecurringSchedule } from '../../shared/models/recurring-schedule.model';
import { Holiday } from '../../shared/models/holiday.model';
import { ProcessingDateService } from '../../core/services/processing-date.service';
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { ProcessingDatesDataService } from "../../core/services/processing-dates-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import {AnnualSchedule} from '../models/annual-schedule.model';
import {QuarterlySchedule} from '../models/quarterly-schedule.model';

export interface ISchedulerModel {
    schedulerContainer: SchedulerContainer;
    prepaymentRestriction: string;
    verbalAchReceived: boolean;
    minDate: Date;
}

@Component({
    selector: 'scheduler-component',
    templateUrl: 'scheduler.component.html',
    styleUrls: ['scheduler.component.scss']
})

export class SchedulerComponent extends DialogComponent<ISchedulerModel, SchedulerContainer> implements OnInit {

    @Output() isValid = new EventEmitter<boolean>();

    public schedulerContainer: SchedulerContainer;
    public oneTimePaymentDateRequired: boolean;
    public result: SchedulerContainer;
    public errors: boolean = false;
    public dateSelectionError: string;
    public holidays: Holiday[];
    public disabledDates: any[];
    public processingDateService: ProcessingDateService;
    public prepaymentRestriction: string;
    public verbalAchReceived: boolean;
    public datePickerOptions: IMyOptions;
    public minDate: Date;

    constructor(dialogService: DialogService, private centralCodesHolidayDataService: CentralCodesDataService, public processingDatesDataService: ProcessingDatesDataService, private growler: GrowlerMediatorService) {
        super(dialogService);
    }

    @ViewChild(RecurringComponent) recurringComponent: RecurringComponent;
    ngOnInit(): void {
        this.initializeObjects();

    }

    initializeObjects() {
        if (this.schedulerContainer === undefined) {
            this.result = new SchedulerContainer();
            this.schedulerContainer = new SchedulerContainer();
            this.schedulerContainer.RecurringSchedule = new RecurringSchedule();
        }
        this.disabledDates = [];

        this.centralCodesHolidayDataService.getCentralCodesHolidays()
            .subscribe((ret: Holiday[]) => {
                if (ret && ret.length > 0) {
                    this.holidays = ret;
                    this.processingDateService = new ProcessingDateService(this.holidays);
                    this.disabledDates = this.processingDateService.getProcessingDateDisableList();
                    this.assignDatepickerOptions();
                }
            },
            (err: any) => {
                //TODO: Add new growler message
            });


        if (this.prepaymentRestriction && this.prepaymentRestriction === '1' ) {
            this.schedulerContainer.Frequency = 'recurring';
            this.frequencyChanged(this.schedulerContainer.Frequency);

        }

        if (this.verbalAchReceived) {
            this.schedulerContainer.Frequency = 'once';
            this.frequencyChanged(this.schedulerContainer.Frequency);
        }

    }

    frequencyChanged(frequency: string) {
        this.schedulerContainer.RecurringSchedule = new RecurringSchedule();
        this.recurringComponent = new RecurringComponent();
        this.schedulerContainer.OneTimePaymentDate = undefined;
        this.schedulerContainer.Frequency = frequency;
        this.schedulerContainer.RecurringSchedule.AnnualSchedule = new AnnualSchedule();
        this.schedulerContainer.RecurringSchedule.QuarterlySchedule = new QuarterlySchedule();
    }

    confirm() {
        this.result = this.schedulerContainer;
        this.close();
    }
    cancel() {
        this.result = undefined;
        this.close();
    }

    dateSelected(date: string) {
        this.dateSelectionError = this.processingDateService.getProcessingDateErrors(date, this.minDate);

        if (!this.dateSelectionError) {
            this.schedulerContainer.OneTimePaymentDate = date;
            this.oneTimePaymentDateRequired = false;
        }
    }

    hasErrors() {
        if (this.schedulerContainer.Frequency === 'once' && (!this.schedulerContainer.OneTimePaymentDate || this.schedulerContainer.OneTimePaymentDate === '')) {
            this.oneTimePaymentDateRequired = true;
            this.errors = true;
        }
    }

    save() {
        this.errors = false;
        if (this.recurringComponent) {
            if (!this.recurringComponent.hasErrors()) {
                this.schedulerContainer.RecurringSchedule = this.recurringComponent.getComponentModelData();
            }
            else {
                this.errors = true;
            }
        }

        this.hasErrors();

        if (!this.errors) {
            this.processingDatesDataService.getProcessingDates(this.schedulerContainer)
                .subscribe((ret: string[]) => {
                    this.schedulerContainer = this.processingDateService.formatProcessingDates(ret, this.schedulerContainer);
                    this.confirm();
                },
                (err) => {
                    this.growler.growlError('Error', 'Could not get processing dates');
                }
            );
        }
    }

    isDisplayable(frequency: string): boolean {
        if (frequency === 'recurring' && this.verbalAchReceived) {
            return false;
        }

        return true;
    }

    assignDatepickerOptions() {
        this.datePickerOptions = {
            // other options...
            dateFormat: 'mm/dd/yyyy',
            disableUntil: {
                year: this.minDate.getFullYear(),
                month: this.minDate.getMonth() + 1,
                day: this.minDate.getDate()
            },
            disableDays: this.disabledDates,
            disableWeekends: true,
            todayBtnTxt: 'Today',
            firstDayOfWeek: 'su',
            sunHighlight: true,
            height: '2.125rem',
            //height: this.height,
            inline: false,
            selectionTxtFontSize: '.875rem',
            componentDisabled: false

        };
    }

}