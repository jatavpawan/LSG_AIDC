import { Component, HostListener } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { FormsModule } from '@angular/forms';

import { CustomerResults } from '../../customer-results/customer-results.component';
import { Customer } from "../../models/customer.model";
import { CustomerSearchDataService } from "../../../core/services/customers-search-data.service";
import { MultiSelectValue } from "../../models/multi-select-value.model";
import {ElasticSearchResult} from "../../models/elastic-search-result.model";

export interface CustomerSearchModel {
    
}

@Component({
    selector: 'ta-customer-search',
    templateUrl: 'customer-search-modal.component.html',
    styleUrls: ['customer-search-modal.component.scss']
})
export class CustomerSearchModalComponent extends DialogComponent<CustomerSearchModel, Customer> implements CustomerSearchModel {
    public result: Customer;
    public customers: Customer[];
    public searching: boolean;

    constructor(dialogService: DialogService, public searchDataService: CustomerSearchDataService) {
        super(dialogService);
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key !== "Enter") {
            return;
        }

        this.confirm();
    }

    search(query: string) {
        this.searchDataService.search(query)
            .subscribe((ret: ElasticSearchResult) => {
                this.searching = false;
                this.customers = ret.Customers;
                this.customers.forEach(cust => {
                    cust.GridDisplayAccount = cust.AccountNumbers.length;
                });
            });
    }

    customerSelected(event: any) {
        this.result = event;
    }

    confirm() {
        if (!this.result) {
            return;
        }

        this.close();
    }

    cancel() {
        this.result = undefined;
        this.close();
    }
}
