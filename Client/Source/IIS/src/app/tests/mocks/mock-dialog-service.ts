import { Observable } from 'rxjs/Observable';

import { SchedulerContainer } from "../../shared/models/scheduler-container.model";
import { RecurringSchedule } from '../../shared/models/recurring-schedule.model';
import { WeeklySchedule } from '../../shared/models/weekly-schedule.model';
import { MonthlySchedule } from '../../shared/models/monthly-schedule.model';

export class MockDialogService {
    data: any = 'hi';

    constructor() {
    }

    public addDialog(item: any, obj: any): Observable<any> {

        return Observable.of(true);
    }

    public removeDialog(item: any) {

    }

    public removeAll(){

    }
};

export class MockDialogServiceSchedulerContainer {
    public addDialog(item: any, obj: any): Observable<SchedulerContainer> {
        var returnSchedulerContainer = new SchedulerContainer();
        returnSchedulerContainer.OneTimePaymentDate = 'test';
        returnSchedulerContainer.Frequency = 'testFrequency';
        returnSchedulerContainer.RecurringSchedule = new RecurringSchedule();
        returnSchedulerContainer.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
        returnSchedulerContainer.RecurringSchedule.WeeklySchedule = new WeeklySchedule();


        return Observable.of(returnSchedulerContainer);
    }
};
