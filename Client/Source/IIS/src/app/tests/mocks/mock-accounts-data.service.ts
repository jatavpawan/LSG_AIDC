import { Office } from './../../shared/models/office.model';
import { Observable } from "rxjs";

import { Account } from '../../shared/models/account.model';

export class MockAccountsDataService {   

    getAccounts(Id: number): Observable<Account[]> {

        let mockAccounts: Account[] = [];
        let mockAccount: Account = new Account();

        mockAccount.AccountId = 1;
        mockAccount.ExternalAccountNumber = 1234;
        mockAccount.AccountNumber = 1;

        mockAccounts.push(mockAccount);

        mockAccount = new Account();
        mockAccount.AccountId = 2;
        mockAccount.ExternalAccountNumber = 4321;
        mockAccount.AccountNumber = 2;

        mockAccounts.push(mockAccount);

        return Observable.of(mockAccounts);
    }

    getCounterDraftEligibleAccounts(Id: number): Observable<Account[]> {

        let mockAccounts: Account[] = [];
        let mockAccount: Account = new Account();
        let mockAccount2: Account = new Account();

        mockAccount.AccountId = 1;
        mockAccount.ExternalAccountNumber = 1234;
        mockAccount.Office = new Office();
        mockAccount.Office.RegionId = 1;

        mockAccounts.push(mockAccount);

        mockAccount2.AccountId = 2;
        mockAccount2.ExternalAccountNumber = 4321;
        mockAccount2.Office = new Office();
        mockAccount2.Office.RegionId = 2;

        mockAccounts.push(mockAccount2);

        return Observable.of(mockAccounts);
    }    
}