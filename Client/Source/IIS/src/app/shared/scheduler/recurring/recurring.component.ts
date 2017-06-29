import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { WeeklyComponent } from '../weekly/weekly.component';
import { MonthlyComponent } from '../monthly/monthly.component';

import { RecurringSchedule } from '../../../shared/models/recurring-schedule.model';
import { WeeklySchedule } from '../../../shared/models/weekly-schedule.model';
import { MonthlySchedule } from "../../../shared/models/monthly-schedule.model";
import { AnnualSchedule } from "../../models/annual-schedule.model";
import { QuarterlySchedule } from "../../models/quarterly-schedule.model";
import { AnnualComponent } from "../annual/annual.component";
import {QuarterlyComponent} from "../quarterly/quarterly.component";

@Component({
    selector: 'recurring-component',
    templateUrl: 'recurring.component.html',
    styleUrls: ['recurring.component.scss']
})

export class RecurringComponent implements OnInit {

    @Output() isValid = new EventEmitter<boolean>();

    @Input() recurringSchedule: RecurringSchedule;

    @Input() prepaymentRestriction: string;

    @Input() minDate: Date;

    @Input() isReadOnly: boolean = false;

    constructor() {
    }

    @ViewChild(WeeklyComponent) weeklyComponent: WeeklyComponent;

    @ViewChild(MonthlyComponent) monthlyComponent: MonthlyComponent;

    @ViewChild(QuarterlyComponent) quarterlyComponent: QuarterlyComponent;

    @ViewChild(AnnualComponent) annualComponent: AnnualComponent;

    ngOnInit(): void {
        this.initializeObjects();
    }

    initializeObjects() {
        if (!this.recurringSchedule) {
            this.recurringSchedule = new RecurringSchedule();
            this.recurringSchedule.MonthlySchedule = new MonthlySchedule();
            this.recurringSchedule.WeeklySchedule = new WeeklySchedule();
        }
        if (this.recurringSchedule && !this.recurringSchedule.AnnualSchedule) {
            this.recurringSchedule.AnnualSchedule = new AnnualSchedule();
        }
        if (this.recurringSchedule && !this.recurringSchedule.QuarterlySchedule) {
            this.recurringSchedule.QuarterlySchedule = new QuarterlySchedule();
        }

        if (this.prepaymentRestriction && this.prepaymentRestriction === '1') {
            this.recurringSchedule.Frequency = 'monthly';
            this.frequencyChanged(this.recurringSchedule.Frequency);
        }
    }

    frequencyChanged(frequency: string) {
        this.recurringSchedule.MonthlySchedule = new MonthlySchedule();
        this.recurringSchedule.WeeklySchedule = new WeeklySchedule();
        this.recurringSchedule.AnnualSchedule = new AnnualSchedule();
        this.recurringSchedule.QuarterlySchedule = new QuarterlySchedule();
        this.recurringSchedule.Frequency = frequency;
    }

    getComponentModelData() {
        if (this.monthlyComponent && this.recurringSchedule.Frequency === 'monthly') {
            this.recurringSchedule.MonthlySchedule = this.monthlyComponent.getComponentModelData();
        }
        else if (this.weeklyComponent && this.recurringSchedule.Frequency === 'weekly') {
            this.recurringSchedule.WeeklySchedule = this.weeklyComponent.getComponentModelData();
        }

        return this.recurringSchedule;
    }

    quarterlyChanged(quarterlySchedule: QuarterlySchedule) {
        this.recurringSchedule.QuarterlySchedule = quarterlySchedule;
    }

    annualChanged(annualSchedule: AnnualSchedule) {
        this.recurringSchedule.AnnualSchedule = annualSchedule;
    }

    hasErrors() {
        let hasErrors = false;

        if (this.monthlyComponent) {
            hasErrors = this.monthlyComponent.hasErrors();
            return hasErrors;
        }

        if (this.weeklyComponent) {
            hasErrors = this.weeklyComponent.hasErrors();
            return hasErrors;
        }

        if (this.quarterlyComponent) {
            hasErrors = this.quarterlyComponent.hasErrors();
            return hasErrors;
        }

        if (this.annualComponent) {
            hasErrors = this.annualComponent.hasErrors();
        }

        return hasErrors;
    }
}