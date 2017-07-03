import { Component, OnInit} from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

import { Customer } from '../../../../../shared/models/customer.model';
import {CustomerSearchDataService} from '../../../../../core/services/customers-search-data.service';
import {ElasticSearchResult} from '../../../../../shared/models/elastic-search-result.model';

@Component({
    selector: 'wire-allocation-customer-search',
    templateUrl: 'wire-allocation-customer-search.component.html'
})
export class WireAllocationCustomerSearchComponent extends DialogComponent<void, Customer> implements OnInit {

    searchQry: string;
    searching: boolean = false;
    customers: Customer[] = [];
    selectedCustomer: Customer;

    constructor(public dialogService: DialogService, private searchDataService: CustomerSearchDataService) {
        super(dialogService);
    }

    ngOnInit() {
        this.initializeComponent();
    }

    initializeComponent() {

    }

    public doSearch(qry: string): boolean {
        this.searching = true;
        this.clearCustomerList();

        let performSearch: boolean = false;
        let searchPerformed: boolean = false;

        performSearch = qry && ((this.isNaN(qry) && qry.length > 2) || !this.isNaN(qry));

        if (performSearch) {
            this.searchDataService.search(qry)
                .subscribe((ret: ElasticSearchResult) => {
                    this.searching = false;
                    this.customers = ret.Customers;
                    this.customers.forEach(cust => {
                        cust.GridDisplayAccount = cust.AccountNumbers.length;
                        searchPerformed = true;
                    });
                });
        }
        else {
            this.searching = false;
        }

        return searchPerformed;
    }

    public clearCustomerList() {
        this.customers = [];
    }

    confirm() {
        if (this.selectedCustomer) {
            this.result = this.selectedCustomer;
        }
        this.close();
    }

    public isNaN(value: any) {
        return Number.isNaN(Number(value));
    }
};