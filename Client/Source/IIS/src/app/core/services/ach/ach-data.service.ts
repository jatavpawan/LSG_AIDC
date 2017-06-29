import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

import { AbaModel } from './../../../shared/models/aba.model';
import { BankTemplate } from '../../../shared/models/ach/bank-template.model';
import { SettingsService } from '../settings.service';
import { AchApprover } from '../../../shared/models/ach/ach-approver.model';
import { SchedulerContainer } from '../../../shared/models/scheduler-container.model';
import { Ach } from '../../../shared/models/ach/ach.model';
import { AchTransaction } from '../../../shared/models/ach/ach-transaction.model';
import { GrowlerMediatorService } from '../mediators/growler-mediator.service';

@Injectable()
export class AchDataService {

    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi + 'ach/';
    }

    search(customerId: string): Observable<BankTemplate[]> {
        return this.http.get(this.serverUrl + 'templates/' + customerId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving bank templates.');
            });
    }

    deleteAchTemplate(bankTemplateId: number): Observable<boolean> {
        return this.http.delete(this.serverUrl + 'templates/' + bankTemplateId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error deleting bank template.');
            });
    }

    insertAchTemplateCustomer(bankTemplate: BankTemplate): Observable<number> {
        return this.http.post(this.serverUrl + 'templates/', bankTemplate, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error creating bank template.');
            });
    }

    lookupAba(abaRoutingNumber: number): Observable<AbaModel> {
        return this.http.get(this.serverUrl + 'templates/aba/' + abaRoutingNumber, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error looking up ABA.');
            });
    }

    postAch(ach: Ach): Observable<boolean> {
        return this.http.post(this.serverUrl, ach, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;

            })
            .catch((error: any) => {
                return this.handleError(error, 'Error submitting ACH Out.');
            });
    }

    getApprovers(customerId: number): Observable<AchApprover[]> {
        return this.http.get(this.serverUrl + 'customer/' + customerId + '/approvers', this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving approvers.');
            });
    }

    getProcessingDates(schedule: SchedulerContainer): Observable<string[]> {
        return this.http.post(this.serverUrl + 'out/processingDates', schedule, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {

                return this.handleError(error, 'Error retrieving processing dates.');
            });
    }

    getAchTransactions(id: number): Observable<Ach[]> {
        return this.http.get(this.serverUrl + 'achTransactions/' + id, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {                
                return this.handleError(error, 'Error retrieving ACH transactions.');                
            });
    }

    deleteAchTransaction(achId: number) {
        return this.http.delete(this.serverUrl + 'achTransactions/' + achId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error deleting ACH transaction.');                
            });
    }

    getRejectAchData(customerId: number): Observable<AchTransaction[]> {
        return this.http.get(this.serverUrl + `customer/${customerId}/rejects`, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            }).catch((error: any) => {
                return this.handleError(error, 'Error retrieving ACH.');
            });
    }

    rejectAch(ach: AchTransaction): Observable<any> {
        return this.http.post(this.serverUrl + 'reject', ach, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            }).catch((error: any) => {
                return this.handleError(error, 'Error rejecting ACH.');
            });
    }


    getAchRejectionsData(): Observable<AchTransaction[]> {
        return this.http.get(this.serverUrl + `rejections`, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            }).catch((error: any) => {
                return this.handleError(error, 'Error retrieving ACH Rejections.');
            });
    }

    deleteAchRejection(achId: number) {
        return this.http.delete(this.serverUrl + 'rejections/' + achId, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error deleting ACH transaction.');
            });
    }

    handleError(error: any, message: string) {
        this.growler.growlError('Error', message);
        return Observable.throw(new Error(error.status));
    }
}