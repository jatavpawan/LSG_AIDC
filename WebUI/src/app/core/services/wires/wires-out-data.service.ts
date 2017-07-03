import { RetailWireOutTemplateCheck } from './../../../shared/models/wires/retail-wire-out-template-check.model';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import { SettingsService } from '../settings.service';
import { GrowlerMediatorService } from '../mediators/growler-mediator.service';
import { RetailWireOut } from "../../../shared/models/wires/retail-wire-out.model";

@Injectable()
export class WiresOutDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    insertWireOutAssignment(wireOut: RetailWireOut): Observable<number> {
        let url = this.serverUrl + 'wiresout/templates';
        return this.http.post(url, wireOut, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.status === 200;
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error inserting wires in assignment.');
            });
    }

    checkForExistingWireTemplate(templateCheck: RetailWireOutTemplateCheck): Observable<RetailWireOut> {
        let url = this.serverUrl + 'wiresout/existing';
        return this.http.post(url, templateCheck, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error inserting wires in assignment.');
            });
    }
    handleError(error: any, message: string) {
        this.growler.growlError('Error', message);
        return Observable.throw(new Error(error.status));
    }
}