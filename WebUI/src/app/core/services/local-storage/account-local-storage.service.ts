import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Account } from "../../../shared/models/account.model";

@Injectable()
export class AccountLocalStorageService {

    private key = 'AccountSearchHistory_v1';

    constructor(private localStorageService: LocalStorageService) {

    }

    public getAccounts(): Account[] {
        let accounts: Account[] = [];

        const localStorageAccounts = this.localStorageService.get(this.key);
        if (localStorageAccounts) {
            accounts = JSON.parse(<any>localStorageAccounts) || [];
        }

        return accounts;
    }

    public storeAccount(account: Account): void {
        const accountsFromLocalStorage = <any>this.localStorageService.get(this.key) || [];
        const accounts: Account[] = accountsFromLocalStorage.length > 0 ? JSON.parse(accountsFromLocalStorage) : [];

        const existingAccountIndex = accounts.findIndex(d => d.AccountId === account.AccountId);
        if (existingAccountIndex !== -1) {
            accounts.splice(existingAccountIndex, 1);
        }

        accounts.unshift(account);
        this.localStorageService.set(this.key, JSON.stringify(accounts));
    }
}
