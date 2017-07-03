import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ElasticSearchResult } from '../../shared/models/elastic-search-result.model';
import { Router, RouterLink } from '@angular/router';
import { CustomerMediatorService } from '../../customers/customer-mediator.service'
import { RoutesFactory } from "../../shared/routes.factory";

@Component({
    selector: 'ta-search-input',
    templateUrl: 'search-input.component.html',
    styleUrls: ['search-input.component.scss']
})
export class SearchInputComponent {

    constructor(public customerMediatorService: CustomerMediatorService, private router: Router) {
    }

    public broadcast(searchQuery: string) {
        this.customerMediatorService.broadCastSearchQryChange(searchQuery);
        this.router.navigate([RoutesFactory.createCustomerSearchRoute()]);
    };
}

