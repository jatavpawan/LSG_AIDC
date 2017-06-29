import { MultiSelectValue } from './../../shared/models/multi-select-value.model';
import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../core/services/customer.service';
import { AccountsDataService } from '../../core/services/accounts-data.service';
import { Account } from '../../shared/models/account.model';
import { Router, RouterLink } from '@angular/router';
import { AccountsMediatorService } from '../../core/services/mediators/accounts-mediator.service';

@Component({
    selector: 'ta-accounts-search-list',
    templateUrl: 'accounts-search-list-component.html',
    styleUrls: ['accounts-search-list-component.scss']
})
export class AccountsSearchListComponent implements OnInit {

    public filteredAccounts: Account[] = [];
    accountNumberMultiSelects: MultiSelectValue[];
    descriptionMultiSelects: MultiSelectValue[];

    constructor(public customerService: CustomerService
        , public accountsMediatorService: AccountsMediatorService
        , private router: Router) {

    }

    ngOnInit(): void {
        if (this.customerService.selectedCustomer) {
            this.filteredAccounts = this.customerService.selectedCustomer.AccountNumbers;
            this.applyMultiSelects();
        }
    }
    public selectAccount(account: Account) {
        this.accountsMediatorService.selectedAccount = account;
        this.router.navigate(['/']);
    }

    public filterAccounts(AccountNumber: string) {
        if (this.customerService.selectedCustomer) {
            this.filteredAccounts = this.customerService.selectedCustomer.AccountNumbers.filter(account => account.AccountNumber.toString().startsWith(AccountNumber));
        }
    }

    public onRowSelect(event: any) {
        if (event && event.data) {
            this.selectAccount(event.data as Account);
        }
    }

    private applyMultiSelects() {
        this.accountNumberMultiSelects = [];
        this.descriptionMultiSelects = [];

        if (this.filteredAccounts && this.filteredAccounts.length > 0) {
            for (var i = 0; i < this.filteredAccounts.length; i++) {

                if (this.filteredAccounts[i].AccountNumber) {
                    this.filteredAccounts[i].AccountNumber = this.filteredAccounts[i].AccountNumber;
                } else {
                    this.filteredAccounts[i].AccountNumber = undefined;
                }

                if (this.accountNumberMultiSelects.filter(e => e.value === this.filteredAccounts[i].AccountNumber.toString()).length === 0) {
                    this.accountNumberMultiSelects.push(new MultiSelectValue(this.filteredAccounts[i].AccountNumber.toString(), this.filteredAccounts[i].AccountNumber.toString()));
                }

                if (this.descriptionMultiSelects.filter(e => e.value === this.filteredAccounts[i].AccountDescription).length === 0) {
                    this.descriptionMultiSelects.push(new MultiSelectValue(this.filteredAccounts[i].AccountDescription, this.filteredAccounts[i].AccountDescription));
                }
            }
        }
    }
}
