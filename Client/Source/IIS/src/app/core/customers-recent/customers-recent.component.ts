import { Component } from '@angular/core';
import { Customer } from '../../shared/models/customer.model';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { AccountsMediatorService } from '../services/mediators/accounts-mediator.service';
import { CustomerSearchDataService } from '../services/customers-search-data.service';
import { CustomerLocalStorageService } from '../services/local-storage/customer-local-storage.service';
import { LocalStorageCustomer } from '../../shared/models/local-storage-customer.model';
import { RoutesFactory } from "../../shared/routes.factory";

@Component({
    selector: 'ta-customers-recent',
    templateUrl: 'customers-recent.component.html',
    styleUrls: ['customers-recent.component.scss']
})
export class CustomersRecentComponent {
    constructor(public customerService: CustomerService
        , private customerLocalStorageMediatorService: CustomerLocalStorageService
        , private accountsMediatorService: AccountsMediatorService
        , private router: Router
        , private customerSearchDataService: CustomerSearchDataService) { }

    public favorite(id: number) {
        this.customerLocalStorageMediatorService.updateFavorite(id);
    }

    public GetCustomersFromLocalStorage(): LocalStorageCustomer[] {
        return this.customerLocalStorageMediatorService.getCustomers();
    }

    public selectCustomer(id: string): void {
        if (id) {
            this.customerSearchDataService.getByCustomerId(id)
                .subscribe((ret: Customer) => {
                    if (ret) {
                        this.customerService.selectedCustomer = ret;
                        this.accountsMediatorService.selectedAccount = undefined;
                        this.router.navigate([RoutesFactory.createCustomerRoute(+id)]);
                    }
                });
        }
    }
}