import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from "@angular/http";
import { Observable } from "rxjs";

import { SettingsService } from '../settings.service';
import { StopPayment } from './../../../shared/models/payments/stop-payment.model';
import { Account } from '../../../shared/models/account.model';
import { GrowlerMediatorService } from '../mediators/growler-mediator.service';

@Injectable()
export class PaymentDataService {

    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi + 'payment/';
    }

    getStopPayment(customerId: number): Observable<StopPayment[]> {
        return this.http.get(this.serverUrl + customerId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve customer payment.");
                return this.handleError(error);
            });
    }

    updateStopPayment(stopPayment: StopPayment): Observable<boolean> {
        return this.http.post(this.serverUrl, stopPayment, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot update stop payment record.");
                return this.handleError(error);
            });
    }

    deleteStopPayment(stopPaymentId: number, stopPaymentTypeId: number): Observable<boolean> {
        return this.http.delete(this.serverUrl + stopPaymentId + "/" + stopPaymentTypeId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot delete stop payment record.");
                return this.handleError(error);
            });
    }

    getFeeAmount(stopPaymentTypeId: number): Observable<number> {
        return this.http.get(this.serverUrl + "feeamount/" + stopPaymentTypeId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                this.growler.growlError("Error!", "Cannot retrieve customer payment.");
                return this.handleError(error);
            });
    }

    handleError(error: any) {
        return Observable.throw(new Error(error.status));
    }
}