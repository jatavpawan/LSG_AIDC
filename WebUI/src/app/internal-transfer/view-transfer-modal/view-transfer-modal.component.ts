import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { IViewTransferModel } from './view-transfer-model.interface';
import { InternalTransferTransactionTemplate } from "../../shared/models/internal-transfer/internal-transfer-transaction-template.model";
import { DaysOfTheWeekComponent } from "../../shared/scheduler/daysoftheweek/days-of-the-week.component";
import { WeeklyComponent } from "../../shared/scheduler/weekly/weekly.component";
import { MonthlyComponent } from "../../shared/scheduler/monthly/monthly.component";
import { MonthlySchedule } from "../../shared/models/monthly-schedule.model";
import { DaysOfTheWeek } from "../../shared/models/days-of-the-week.model";

@Component({
    selector: 'ta-view-transfer',
    templateUrl: 'view-transfer-modal.component.html'
})

export class ViewTransferModalComponent extends DialogComponent<IViewTransferModel, boolean> implements OnInit {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    transferObject: InternalTransferTransactionTemplate;
    twentyTwoSeventyNine: boolean;
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
        if (!this.transferObject.Schedule.RecurringSchedule.MonthlySchedule) {
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule.DaysOfTheWeek =
                new DaysOfTheWeek();
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule.CalendarDays = [];
            this.transferObject.Schedule.RecurringSchedule.MonthlySchedule.PayOnIndex = [];
        }

        this.minDate = new Date();
    }
    confirm() {
        this.result = true;
        this.close();
    }

    cancel() {
        this.result = false;
        this.dialogService.removeAll();
    }
}
