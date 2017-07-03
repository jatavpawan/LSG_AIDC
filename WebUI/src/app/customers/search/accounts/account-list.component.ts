
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../shared/models/account.model';

@Component({
    selector: 'ta-account-list',
    templateUrl: 'account-list.component.html',
    styleUrls: ['account-list.component.scss']
})
export class AccountListComponent implements OnInit {

    @Input() filteredAccounts: Account[] = [];
    @Output() onRowSelected = new EventEmitter<Account>();
    @Input() showProductTypeColumn: boolean = false;

    constructor() {

    }

    ngOnInit(): void {

    }

    public rowSelect(event: any) {
        if (event && event.data) {
            this.onRowSelected.emit(event.data as Account);
        }
    }

    onStatusChanged(dt: any, event: any, col: any) {
        if (event && event.value && event.value.length > 0 && event.value[0] === 'Deleted') {
            this.filteredAccounts = this.filteredAccounts;
        }

        dt.filter(event.value, col.field, col.filterMatchMode);
    }
}
