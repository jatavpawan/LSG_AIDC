import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";

import { Account } from '../../shared/models/account.model';
import {SettingsService} from "./settings.service";
import {Facility} from "../../shared/models/facility.model";
import {Office} from "../../shared/models/office.model";

@Injectable()
export class AccountsDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    getAccounts(customerId: number): Observable<Account[]> {
        let url = this.settingService.serviceFabricApi + 'accounts/customer/' + customerId;

        return this.http.get(url, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getCounterDraftEligibleAccounts(customerId: number): Observable<Account[]> {
        let url = this.settingService.serviceFabricApi + 'accounts/counterdraft/eligible/customer/' + customerId;

        return this.http.get(url, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    handleError(error: any) {
        return Observable.throw(error);
    }
}