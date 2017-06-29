import { Component } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { Router } from '@angular/router';
import { CustomerSearchDataService } from '../services/customers-search-data.service';
import { AccountsMediatorService } from '../services/mediators/accounts-mediator.service';
import { RoutesFactory } from '../../shared/routes.factory';

@Component({
    selector: 'ta-customer-info',
    templateUrl: 'customer-info.component.html',
    styleUrls: ['customer-info.component.scss']
})
export class CustomerInfoComponent {
    private customer: Customer;

    constructor(public customerService: CustomerService
        , private router: Router
        , private accountsMediatorService: AccountsMediatorService
        , private customerSearchDataService: CustomerSearchDataService) {
    }

    public searchAccounts() {
        this.router.navigate([RoutesFactory.createAccountSearchRoute(this.customer.Id)]);
    }
}