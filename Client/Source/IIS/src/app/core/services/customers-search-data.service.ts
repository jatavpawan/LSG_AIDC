import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";

import { ElasticSearchResult } from '../../shared/models/elastic-search-result.model';
import { EcsSettings } from './../../shared/models/ecs-settings.model';
import { Customer } from '../../shared/models/customer.model';
import { SettingsService } from "../../core/services/settings.service";

@Injectable()
export class CustomerSearchDataService {

    constructor(private http: Http, private settingService: SettingsService) {
    }

    search(searchQuery: string): Observable<ElasticSearchResult> {
        let serverUrl = this.settingService.serviceFabricApi + 'search';
        const params = new URLSearchParams();
        params.set('searchQuery', searchQuery as string);

        return this.http.get(serverUrl, { search: params, headers: this.settingService.getHeaders() })
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    getByCustomerId(customerId: string): Observable<Customer> {
        let serverUrl = this.settingService.serviceFabricApi + 'search/customer/' + customerId;

        return this.http.get(serverUrl, this.settingService.getDefaultHeaders())
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.handleError);
    }

    handleError(error: any) {
        return Observable.throw(error);
    }
}