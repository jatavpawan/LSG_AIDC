import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs";

import { Facility } from '../../shared/models/facility.model';
import { SettingsService } from "./settings.service";

@Injectable()
export class FacilityDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    handleError(error: any) {
        return Observable.throw(error);
    }
}