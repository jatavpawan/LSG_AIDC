
import { Observable } from "rxjs";

import { AbaModel } from './../../../shared/models/aba.model';
import { BankTemplate } from '../../../shared/models/ach/bank-template.model';
import {GenericDropDownModel} from '../../../shared/models/generic-dropdown-model';

export class MockBankTemplateDataService {

    search(customerId: string): Observable<BankTemplate[]> {

        let testAccountType = new GenericDropDownModel();

        let arbitraryAchTemplateId = 1;
        let arbitraryAbaNumber = "123456789";
        let arbitraryAccountNumber = "12345";

        testAccountType.Id = 1;
        testAccountType.Description = 'Test Description';

        let ret = new BankTemplate();
        ret.AbaRoutingNumber = arbitraryAbaNumber;
        ret.BankAccountType = testAccountType;
        ret.ExternalAccountNumber = arbitraryAccountNumber;
        ret.BankTemplateId = arbitraryAchTemplateId;
        ret.BankName = 'Test Bank';
        ret.City = 'Test City';
        ret.State = 'Test State';
        let results: BankTemplate[] = [];
        results.push(ret);

        return Observable.of(results);
    }

    deleteAchTemplate(BankTemplateId: number): Observable<boolean> {
        if (BankTemplateId < 0) {
            return Observable.of(false);
        }
        else {
            return Observable.of(true);
        }
    }

    insertAchTemplateCustomer(bankTemplate: BankTemplate): Observable<boolean> {
        if (bankTemplate.BankTemplateId === 0) {
            return Observable.of(true);
        }
        else {
            return Observable.of(false);
        }
    }

    lookupAba(AbaRoutingNumber: number): Observable<AbaModel> {
        let testAbaModel = new AbaModel();

        if (AbaRoutingNumber === 1) {
            let testAbaNubmer = 1;

            testAbaModel.AbaRoutingNumber = 1;
            testAbaModel.Name = 'Test Aba Name';
            testAbaModel.City = 'Test City';
            testAbaModel.State = 'Test State';

            return Observable.of(testAbaModel);
        }
        else {
            return Observable.of(undefined);
        }
    }

    isBankTemplateEligibleForDeletion(bankTemplateId: number): Observable<boolean> {

        if (bankTemplateId === 1) {
            return Observable.of(true)
        }

        return Observable.of(false);
    }
}

export class MockDropDownOptionsLookupDataService {

    public getAccountTypes(): Observable<GenericDropDownModel[]> {
        let testAccountTypeArray: GenericDropDownModel[] = new Array();
        let testAccountType = new GenericDropDownModel();

        let arbitraryAccountTypeId = 1;
        testAccountType.Id = arbitraryAccountTypeId;
        testAccountType.Description = 'Test Description';

        testAccountTypeArray.push(testAccountType);

        return Observable.of(testAccountTypeArray);
    }
}
