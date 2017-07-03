import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";

import { Deal } from '../../shared/models/deal.model';
import { SettingsService } from "./settings.service";

@Injectable()
export class DealDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    handleError(error: any) {
        return Observable.throw(error);
    }
}