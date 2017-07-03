import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Holiday } from './../../shared/models/holiday.model';
import { Injectable } from '@angular/core';
import { Office } from '../../shared/models/office.model';
import { SettingsService } from "./settings.service";
import { GrowlerMediatorService } from './mediators/growler-mediator.service';
import { GenericDropDownModel } from '../../shared/models/generic-dropdown-model';

@Injectable()
export class CentralCodesDataService {

    constructor(private http: Http, private settingService: SettingsService, private growler: GrowlerMediatorService) {
    }

    public getOffices(): Observable<Office[]> {

        return this.http.get(`${this.settingService.serviceFabricApi}centralcodes/offices`, this.settingService.getHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Office Codes.');
            });
    }

    public getHowToApplyList(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/howtoapplylist';

        return this.http.get(serverUrl, { headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving How To Apply Codes.');
            });
    }

    public getOtherFees(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/otherFees';

        return this.http.get(serverUrl, { headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Other Fee Codes.');
            });
    }

    getAchInRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/rejectreasons/ach/in';
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving ACH Rejection Codes.');
            });
    }

    getAchOutRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/rejectreasons/ach/out';
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving ACH Rejection Codes.');
            });
    }

    getAchOlderThan24HoursRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/rejectreasons/ach/olderthantwentyfourhours';
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving ACH Rejection Codes.');
            });
    }

    getDraftRejectReasonCodes(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/rejectreasons/draft';
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving ACH Rejection Codes.');
            });
    }

    public getCentralCodesHolidays(): Observable<Holiday[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/holidays';

        return this.http.get(serverUrl)
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Holiday data');
            });
    }

    public getAccountTypes(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/accounttypes';
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Account Type data');
            });
    }

    getCostCenter(input: string = '') {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/offices/costcenter?searchString=' + input;
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Cost Centers');
            });
    }

    getGlAccount(input: string = '') {
        let serverUrl = this.settingService.serviceFabricApi + 'accounts/glaccount?searchString=' + input;
        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving GL Accounts');
            });
    }

    public getMethodRequestOptions(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/methodrequestlist';

        return this.http.get(serverUrl, { headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Request Method Codes.');
            });
    }

    public getInPersonIdentificationOptions(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/inPersonIdentifierList';

        return this.http.get(serverUrl, { headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving In Person Identification Codes.');
            });
    }

    public getOutgoingTemplateTypeOptions(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/outgoingTemplateTypeList';

        return this.http.get(serverUrl, { headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Outgoing Template Type Codes.');
            });
    }

    public getOutgoingStatusOptions(): Observable<GenericDropDownModel[]> {
        let serverUrl = this.settingService.serviceFabricApi + 'centralcodes/outgoingStatusList';

        return this.http.get(serverUrl, { headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch((error: any) => {
                return this.handleError(error, 'Error retrieving Outoging Status Codes.');
            });
    }

    handleError(error: any, message: string) {
        this.growler.growlError('Error', message);
        return Observable.throw(new Error(error.status));
    }
}