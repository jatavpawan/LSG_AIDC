import { SchedulerContainer } from "../../shared/models/scheduler-container.model";
import { Observable } from "rxjs/Observable";

export class MockProcessingDatesDataService {
    public getProcessingDates(schedule: SchedulerContainer): Observable<string[]> {
        return Observable.of(['hi']);
    }
}