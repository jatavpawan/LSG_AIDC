import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EcsSettings } from './../../shared/models/ecs-settings.model';
import { Injectable } from '@angular/core';

@Injectable()
export class EcsSettingsDataService {

    public serverUrl: string = 'home/ecs/configuration';

    constructor(private http: Http) { }

    public getEcsSetting(): Observable<EcsSettings> {
        return this.http.get(this.serverUrl)
                .map((response: Response) => {
                    return response.json();
                })
                .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }
}