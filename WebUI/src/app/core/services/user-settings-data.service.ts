import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs";

import { SettingsService } from "./settings.service";
import { UserSetting } from '../../shared/models/user-setting.model';

@Injectable()
export class UserSettingsDataService {
    public serverUrl: string;

    constructor(private http: Http, private settingService: SettingsService) {
        this.serverUrl = settingService.serviceFabricApi;
    }

    getUserSettings(): Observable<UserSetting> {
        let url = this.settingService.serviceFabricApi + 'users/' + this.settingService.loggedOnUserName;

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