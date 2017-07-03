import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Ach } from "../../../shared/models/ach/ach.model";
import { DaysOfTheWeekComponent } from "../../../shared/scheduler/daysoftheweek/days-of-the-week.component";
import { WeeklyComponent } from "../../../shared/scheduler/weekly/weekly.component";
import { MonthlyComponent } from "../../../shared/scheduler/monthly/monthly.component";
import { MonthlySchedule } from "../../../shared/models/monthly-schedule.model";
import { DaysOfTheWeek } from "../../../shared/models/days-of-the-week.model";
import { IViewTransactionModel } from './view-transaction-model.interface';
import {GenericDropDownModel} from '../../../shared/models/generic-dropdown-model';

@Component({
    selector: 'ta-view-transaction',
    templateUrl: 'view-transaction-modal.component.html'
})

export class ViewTransactionModalComponent extends DialogComponent<IViewTransactionModel, boolean> implements OnInit {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    ach: Ach;
    twentyOneFourty: boolean;
    verbalAchReceived: boolean;
    minDate: Date;

    @ViewChild(DaysOfTheWeekComponent) daysOfTheWeekComponent: DaysOfTheWeekComponent;
    @ViewChild(WeeklyComponent) weeklyComponent: WeeklyComponent;

    @ViewChild(MonthlyComponent) monthlyComponent: MonthlyComponent;
    constructor(dialogService: DialogService) {
        super(dialogService);
    }

    ngOnInit(): void {
        this.initializeObjects();
    }


    public initializeObjects() {
        this.minDate = new Date();
        if (!this.ach.Schedule.RecurringSchedule.MonthlySchedule) {
            this.ach.Schedule.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            this.ach.Schedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek =
                new DaysOfTheWeek();
            this.ach.Schedule.RecurringSchedule.MonthlySchedule.CalendarDays = [];
            this.ach.Schedule.RecurringSchedule.MonthlySchedule.PayOnIndex = [];
        }
    }
    confirm() {
        this.result = true;
        this.close();
    }

    cancel() {
        this.result = false;
        this.dialogService.removeAll();
    }

    isAchInTransactionDirection(): boolean {
        if (!this.ach.TransactionDirection) {
            this.ach.TransactionDirection = new GenericDropDownModel();
        }
        return (this.ach.TransactionDirection.Description === "In");
    }

    isAchOutTransactionDirection(): boolean {
        if (!this.ach.TransactionDirection) {
            this.ach.TransactionDirection = new GenericDropDownModel();
        }
        return (this.ach.TransactionDirection.Description === "Out");
    }
}
