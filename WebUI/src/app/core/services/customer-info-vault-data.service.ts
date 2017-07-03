import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { SettingsService } from "./settings.service";
import { GrowlerMediatorService } from "./mediators/growler-mediator.service";
import {CivCustomer} from "../../shared/models/civ-customer";

@Injectable()
export class CustomerInfoVaultDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    getCustomer(customerId: number): Observable<CivCustomer> {
        let url = this.serverUrl + 'customerinfovault/customer/' + customerId;
        return this.http.get(url, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error getting customer.');
            });
    }

    handleError(error: any, message: string) {
        this.growler.growlError('Error', message);
        return Observable.throw(new Error(error.status));
    }
}