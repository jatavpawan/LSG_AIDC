import { SelectCustomersTabDirective } from './select-customers-tab.directive';
import { ElasticSearchResult } from './../../shared/models/elastic-search-result.model';
import { Component, OnInit, Directive, ViewChild, OnDestroy, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from '../../shared/models/customer.model';
import { CustomerSearchDataService } from '../../core/services/customers-search-data.service';
import { CustomerService } from '../../core/services/customer.service';
import { AccountsDataService } from '../../core/services/accounts-data.service';
import { CustomerMediatorService } from '../customer-mediator.service';
import { CustomerLocalStorageService } from '../../core/services/local-storage/customer-local-storage.service';
import { AccountsMediatorService } from '../../core/services/mediators/accounts-mediator.service';
import { Deal } from '../../shared/models/deal.model';
import { DealDataService } from '../../core/services/deal-data.service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { Facility } from '../../shared/models/facility.model';
import { FacilityDataService } from '../../core/services/facility-data.service';
import { Account } from '../../shared/models/account.model';
import { DealLocalStorageService } from '../../core/services/local-storage/deal-local-storage.service';
import { FacilityLocalStorageService } from '../../core/services/local-storage/facility-local-storage.service';
import { AccountLocalStorageService } from '../../core/services/local-storage/account-local-storage.service';
import { Subscription } from "rxjs/Subscription";
import {RoutesFactory} from "../../shared/routes.factory";

@Component({
    selector: 'ta-search-list',
    templateUrl: 'search-list.component.html',
    styleUrls: ['search-list.component.scss']
})
export class SearchListComponent implements OnInit, OnDestroy {
    @ViewChild(SelectCustomersTabDirective) selectCustomersTab: SelectCustomersTabDirective;

    public customers: Customer[];
    public deals: Deal[] = [];
    public facilities: Facility[] = [];
    public accounts: Account[] = [];

    public searching: boolean;
    public searchPerformed: boolean;

    public searchInputModel: string;

    private searchSubscription: Subscription;

    constructor(
        private customerMediatorService: CustomerMediatorService
        , private searchDataService: CustomerSearchDataService
        , private router: Router
        , private customerService: CustomerService
        , private accountsMediatorService: AccountsMediatorService
        , private customerLocalStorageService: CustomerLocalStorageService
        , private dealLocalStorageService: DealLocalStorageService
        , private facilityLocalStorageService: FacilityLocalStorageService
        , private accountLocalStorageService: AccountLocalStorageService
        , private growler: GrowlerMediatorService) {
    }

    ngOnInit(): void {
        this.getLocalStorageResults();
        this.searching = false;
        this.searchPerformed = false;

        this.searchSubscription = this.customerMediatorService.searchQryChanged$.subscribe((searchQuery: string) => {
            this.searchInputModel = searchQuery
            this.trySearch();
        });
    }

    ngOnDestroy(): void {
        this.searchSubscription.unsubscribe();
    }

    getLocalStorageResults() {
        this.customers = this.customerLocalStorageService.getCustomers().map(this.customerLocalStorageService.mapLocalStorageCustomerToCustomer);
        this.deals = this.dealLocalStorageService.getDeals();
        this.facilities = this.facilityLocalStorageService.getFacilities();
        this.accounts = this.accountLocalStorageService.getAccounts();
    }

    public trySearch(): boolean {
        this.searching = true;

        const performSearch = this.searchInputModel && (this.searchIsNotNumberAndMoreThanTwoCharacters() || this.searchIsNumber());

        if (!performSearch) {
            this.searching = false;
            this.searchPerformed = false;
            return;
        }

        if (this.selectCustomersTab) {
            this.selectCustomersTab.select();
        }
        
        this.searchDataService.search(this.searchInputModel)
            .subscribe((result: ElasticSearchResult) => {
                this.searchPerformed = true;
                this.searching = false;

                this.customers = result.Customers;
                this.deals = result.Deals;
                this.facilities = result.Facilities;
                this.accounts = result.Accounts;

                this.customers.forEach(cust => {
                    cust.GridDisplayAccount = cust.AccountNumbers.length;
                });
            });

        return this.searchPerformed;
    }


    public selectCustomer(customer: Customer) {
        this.customerService.selectedCustomer = customer;
        this.customerLocalStorageService.storeCustomer(customer);

        this.accountsMediatorService.selectedAccount = undefined;
        this.router.navigate([RoutesFactory.createCustomerRoute(customer.Id)]);
    }

    public onRowSelect(eventData: any) {
        if (eventData) {
            this.selectCustomer(eventData as Customer);
        }
    }

    public reset() {
        this.searchPerformed = false;
        this.getLocalStorageResults();
        this.selectCustomersTab.select();
        this.searchInputModel = '';
    }

    public dealSelected(deal: Deal) {
        this.dealLocalStorageService.storeDeal(deal);
    }

    public facilitySelected(facility: Facility) {
        this.facilityLocalStorageService.storeFacility(facility);
    }

    public accountSelected(account: Account) {
        this.accountLocalStorageService.storeAccount(account);
    }

    private isNumber(value: any) {
        return !Number.isNaN(Number.parseInt(value));
    }

    private searchIsNotNumberAndMoreThanTwoCharacters() {
        return !this.isNumber(this.searchInputModel) && this.searchInputModel.length > 2;
    }

    private searchIsNumber() {
        return this.isNumber(this.searchInputModel);
    }

};