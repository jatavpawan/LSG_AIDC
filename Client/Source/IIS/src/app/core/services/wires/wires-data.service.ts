import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { SettingsService } from '../settings.service';
import { WireInAssignmentModel } from '../../../shared/models/wires/wire-in-assignment.model';
import { GrowlerMediatorService } from '../mediators/growler-mediator.service';
import { WireInModel } from '../../../shared/models/wires/wire-in.model';
import { WireInDetailsModel } from '../../../shared/models/wires/wire-in-details.model';
import {RetailWireInUnassignModel} from '../../../shared/models/wires/retail-wire-in-unassign.model';
import {WireCustomerAllocationModel} from '../../../shared/models/wires/wire-customer-allocation.model';
import {IncomingWireTransactionDetails} from '../../../shared/models/wires/IncomingWireTransactionDetails';

@Injectable()
export class WiresDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    getWiresIn(officeIds: string = ''): Observable<WireInModel[]> {
        let url = this.settingService.serviceFabricApi + 'wires/in?officeIds=' + officeIds;

        return this.http.get(url, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error getting wires in.');
            });
    }

    getWireDetailsById(id: number): Observable<WireInDetailsModel> {
        let url = this.settingService.serviceFabricApi + `wires/in/${id}`;

        return this.http.get(url, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error getting wires in.');
            });
    }

    insertWireInAssignment(wireInAssignment: WireInAssignmentModel): Observable<number> {
        let url = this.serverUrl + 'wires/in';
        return this.http.put(url, wireInAssignment, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error inserting wires in assignment.');
            });
    }

    unassignWire(incomingWireId: number, wireInUnassign: RetailWireInUnassignModel): Observable<boolean> {
        let url = this.serverUrl + `wires/in/${incomingWireId}/unassign`;
        return this.http.put(url, wireInUnassign, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error unassigning wire.');
            });
    }

    allocateWire(incomingWireId: number, incommingWiresTransactionDetails: IncomingWireTransactionDetails[]): Observable<boolean> {
        let url = this.serverUrl + `wires/in/${incomingWireId}/allocate`;
        return this.http.post(url, incommingWiresTransactionDetails, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error allocate wire.');
            });
    }

    handleError(error: any, message: string) {
        this.growler.growlError('Error', message);
        return Observable.throw(new Error(error.status));
    }
}