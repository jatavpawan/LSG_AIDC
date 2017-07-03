import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { SchedulerContainer } from "../../shared/models/scheduler-container.model";
import { SettingsService } from "./settings.service";
import { Http, Response } from "@angular/http";

@Injectable()
export class ProcessingDatesDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    getProcessingDates(schedule: SchedulerContainer): Observable<string[]> {
        return this.http.post(this.serverUrl + 'processingDates', schedule, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return Observable.throw(error);
            });
    }
}