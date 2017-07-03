import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

import { SettingsService } from "../settings.service";
import { GrowlerMediatorService } from "../mediators/growler-mediator.service";
import { ScheduleType } from "../../../shared/models/schedule-type.model";
import { InternalTransferTransactionTemplate } from "../../../shared/models/internal-transfer/internal-transfer-transaction-template.model";

@Injectable()
export class InternalTransferDataService {

    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi + 'internalTransfer/';
    }

    getInternalTransfers(customerId: number) {
        return this.http.get(`${this.serverUrl}${customerId}`, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Could not get internal transfers.');
            });
    }

    isForm2279Needed(fromCustomerId: number, fromAccount: number, toCustomerId: number, toAccount: number, scheduleType: ScheduleType): Observable<boolean> {
        return this.http.get(`${this.serverUrl}form2279Required/${fromCustomerId}/${fromAccount}/${toCustomerId}/${toAccount}/${scheduleType}`, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Cannot determine if Form 2279 is needed.');
            });
    }

    submitInternalTransfer(transferObject: InternalTransferTransactionTemplate): Observable<boolean> {
        return this.http.post(`${this.serverUrl}templates`, transferObject, this.settingService.getDefaultHeaders())
           .map((response: Response) => {
               return response.json();
           })
           .catch((error: any) => {
               return this.handleError(error, 'Unable to submit transfer.');
           });
    }

    deleteInternalTransfer(transferId: number): Observable<boolean> {
        return this.http.delete(`${this.serverUrl}templates/${transferId}`, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Unable to delete transfer.');
            });
    }

    handleError(error: any, message: string) {
        this.growler.growlError('Error', message);
        return Observable.throw(new Error(error.status));
    }
}