import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";
import * as moment from 'moment';

@Injectable()
export class SettingsService {

    public authToken: string;
    public auditInfoToken: string;
    public loggedOnUserName: string;
    public userImageUrl: string; 
    public serviceFabricApi: string;

    constructor() {
        let clientSettings: any = (<any>window).ClientSettings;
        this.authToken = clientSettings.AuthToken;
        this.auditInfoToken = clientSettings.AuditInfoToken;
        this.loggedOnUserName = clientSettings.LoggedOnUserName;
        this.userImageUrl = clientSettings.UserImageUrl;
        this.serviceFabricApi = clientSettings.ServiceFabricApi;
    }

    public getDefaultHeaders() {
        return {
            headers: this.getHeaders()
        }
    }

    public getHeaders() {
        // Commenting out the authorization and fcsa-audit due to service fabric throwing CORS errors on dev server.
        return new Headers({
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': this.authToken,
            'fcsa-audit': this.auditInfoToken,
            'If-Modified-Since': moment().add(-1, 'days').date().toString(),
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        });
    }
}