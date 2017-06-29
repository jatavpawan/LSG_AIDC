import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {WireAllocationInputDetailsComponent} from './wire-allocation-input-details.component';
import {SettingsService} from '../../../../../core/services/settings.service';
import {GrowlerMediatorService} from '../../../../../core/services/mediators/growler-mediator.service';
import {MockGrowlerMediatorService} from '../../../../../tests/mocks/mock-growler-mediator-service';
import {CentralCodesDataService} from '../../../../../core/services/central-codes-data.service';
import {MockCentralCodesDataService} from '../../../../../tests/mocks/mock-central-codes-data.service';
import {WireCustomerAllocationModel} from '../../../../../shared/models/wires/wire-customer-allocation.model';
import {GenericDropDownModel} from '../../../../../shared/models/generic-dropdown-model';
import {IncomingWireTransactionDetails} from '../../../../../shared/models/wires/IncomingWireTransactionDetails';
import {Customer} from '../../../../../shared/models/customer.model';
import { Account } from '../../../../../shared/models/account.model';

describe('WiresInAllocationInputComponent', () => {

    let comp: WireAllocationInputDetailsComponent;
    let fixture: ComponentFixture<WireAllocationInputDetailsComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let fakeDropDownResults: GenericDropDownModel[];
    let fakeDropDownResult: GenericDropDownModel; 

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                imports: [RouterTestingModule, FormsModule],
                declarations: [WireAllocationInputDetailsComponent],
                providers: [SettingsService],
                schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(WireAllocationInputDetailsComponent,
                {
                    set: {
                        providers: [                            
                            { provide: CentralCodesDataService, useClass: MockCentralCodesDataService },
                            { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                        ]
                    }
                })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WireAllocationInputDetailsComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

        fakeDropDownResults = [];
        fakeDropDownResult = new GenericDropDownModel();
        fakeDropDownResult.Id = 1;

        fakeDropDownResults.push(fakeDropDownResult);

    });

    describe('initializeComponent method ',
        () => {
            it('should call getHowToApplyOptions and getFeeCodeOptions', () => {
                spyOn(comp, 'getHowToApplyOptions');
                spyOn(comp, 'getFeeCodeOptions');

                comp.initializeComponent();

                expect(comp.getHowToApplyOptions).toHaveBeenCalledTimes(1);                
                expect(comp.getFeeCodeOptions).toHaveBeenCalledTimes(1);                
            });
        });
    describe('howToApplyChanged method ',
        () => {
            it('should call setFeeCodeVisibilityByTransactionType and setScheduledPaymentAmountByTransactionType', () => {
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType = new GenericDropDownModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType.Description = 'test';

                spyOn(comp, 'setFeeCodeVisibilityByTransactionType');
                spyOn(comp, 'setScheduledPaymentAmountByTransactionType');

                comp.howToApplyChanged();

                expect(comp.setFeeCodeVisibilityByTransactionType).toHaveBeenCalledTimes(1);
                expect(comp.setScheduledPaymentAmountByTransactionType).toHaveBeenCalledTimes(1);
            });
        });

    describe('setFeeCodeVisibilityByTransactionType method ',
        () => {
            it('when transactionTypeDescription is Other Fee then showFeeCodes is true', () => {

                comp.setFeeCodeVisibilityByTransactionType('Other Fee');

                expect(comp.showFeeCodes).toBeTruthy();
            });
        });

    describe('setFeeCodeVisibilityByTransactionType method ',
        () => {
            it('when transactionTypeDescription is not Other Fee then showFeeCodes is false', () => {
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();

                comp.setFeeCodeVisibilityByTransactionType('Some other code');

                expect(comp.showFeeCodes).toBeFalsy();
                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail).toBeDefined();
            });
        });

    describe('setScheduledPaymentAmountByTransactionType method ',
        () => {
            it('when transactionTypeDescription is Scheduled Payment and customer is selected then allocation amount need to be ScheduledPaymentAmount', () => {
                let account = new Account();

                account.AccountId = 1;
                account.ScheduledPaymentAmount = 100;

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account = account;

                comp.selectedCustomer = new Customer();
                comp.selectedCustomer.AccountNumbers = [account];

                comp.setScheduledPaymentAmountByTransactionType('Scheduled Payment');

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount).toEqual(100);
            });
        });

    describe('setScheduledPaymentAmountByTransactionType method ',
        () => {
            it('when transactionTypeDescription is Scheduled Payment and customer is selected and ScheduledPaymentAmount is not defined then allocation amount is zero', () => {
                let account = new Account();

                account.AccountId = 1;
                account.ScheduledPaymentAmount = undefined;

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account = account;

                comp.selectedCustomer = new Customer();
                comp.selectedCustomer.AccountNumbers = [account];

                comp.setScheduledPaymentAmountByTransactionType('Scheduled Payment');

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount).toEqual(0);
            });
        });

    describe('setScheduledPaymentAmountByTransactionType method ',
        () => {
            it('when transactionTypeDescription is not Scheduled Payment then allocation amount need to be undefined', () => {
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();

                comp.setScheduledPaymentAmountByTransactionType('abc');

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount).toEqual(undefined);
            });
        });

    describe('setScheduledPaymentAmountByTransactionType method ',
        () => {
            it('when transactionTypeDescription is Scheduled Payment and customer is NOT selected then allocation amount need to be zero', () => {
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();

                comp.setScheduledPaymentAmountByTransactionType('Scheduled Payment');

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount).toEqual(0);
            });
        });

    describe('getHowToApplyOptions method ',
        () => {
            it('should call centralCodesDataService getHowToApplyList', () => {                              
                spyOn(comp.centralCodesDataService, 'getHowToApplyList').and.returnValue(Observable.of(new Array<GenericDropDownModel>(fakeDropDownResult)));
                comp.getHowToApplyOptions();

                expect(comp.centralCodesDataService.getHowToApplyList).toHaveBeenCalledTimes(1);
                expect(comp.howtoApplyList).toBeDefined();
            });
        });

    describe('getFeeCodeOptions method ',
        () => {
            it('should call centralCodesDataService getOtherFees', () => {                
                spyOn(comp.centralCodesDataService, 'getOtherFees').and.returnValue(Observable.of(new Array<GenericDropDownModel>(fakeDropDownResult)));
                comp.getFeeCodeOptions();

                expect(comp.centralCodesDataService.getOtherFees).toHaveBeenCalledTimes(1);
                expect(comp.feeCodes).toBeDefined();
            });
        });

    describe('isValidPrinciplePrepayment method ',
        () => {
            it('when searchMode equals customer and How to apply is Principal PrePayment then allocation amount can not be 250 over billed principle', () => {
                let account = new Account();
                account.CurrentBilledPrincipal = 100;
                comp.searchMode = 'customer';

                let transactionType = new GenericDropDownModel();
                transactionType.Description = 'Principal PrePayment';


                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount = 400;
                comp.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType = transactionType;

                spyOn(comp, 'getSelectedCustomerAccountId').and.returnValue(account);
                let ret = comp.isValidPrinciplePrepayment();

                expect(ret).toBeFalsy();
            });
        });

    describe('isValidPrinciplePrepayment method ',
        () => {
            it('when searchMode equals customer and How to apply is Principal PrePayment then allocation amount can not be 250 over billed principle', () => {
                let account = new Account();
                account.CurrentBilledPrincipal = 100;
                comp.searchMode = 'customer';

                let transactionType = new GenericDropDownModel();
                transactionType.Description = 'Principal PrePayment';


                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount = 200;
                comp.wireCustomerAllocation.incomingWireTransactionDetail.TransactionType = transactionType;

                spyOn(comp, 'getSelectedCustomerAccountId').and.returnValue(account);
                let ret = comp.isValidPrinciplePrepayment();

                expect(ret).toBeTruthy();
            });
        });

    describe('isAllocationAmountLessThanWire method ',
        () => {
            it('when remainingAllocationAmount is negative should return false', () => {
                let ret = comp.isAllocationAmountLessThanWire(-1);

                expect(ret).toBeFalsy();
            });
        });

    describe('isAllocationAmountLessThanWire method ',
        () => {
            it('when remainingAllocationAmount is not negative should return true', () => {
                let ret = comp.isAllocationAmountLessThanWire(1);

                expect(ret).toBeTruthy();
            });
        });

    describe('isFormValid method ',
        () => {
            it('when call should call 3 validation methods', () => {
                spyOn(comp, 'isFormPristineAndValid').and.returnValue(true);
                spyOn(comp, 'isValidPrinciplePrepayment').and.returnValue(true);
                spyOn(comp, 'isValidAmount').and.returnValue(true);
                spyOn(comp, 'isAllocationAmountLessThanWire').and.returnValue(true);
                spyOn(comp, 'getRemainingAllocationAmount');

                comp.isFormValid();

                expect(comp.isFormPristineAndValid).toHaveBeenCalledTimes(1);
                expect(comp.isValidPrinciplePrepayment).toHaveBeenCalledTimes(1);
                expect(comp.isValidAmount).toHaveBeenCalledTimes(1);
                expect(comp.isAllocationAmountLessThanWire).toHaveBeenCalledTimes(1);
                expect(comp.getRemainingAllocationAmount).toHaveBeenCalledTimes(1);
            });
        });

    describe('isFormValid method ',
        () => {
            it('when isFormPristineAndValid is false the following validation methods do not fire and return false', () => {
                spyOn(comp, 'isFormPristineAndValid').and.returnValue(false);
                spyOn(comp, 'isValidPrinciplePrepayment').and.returnValue(true);
                spyOn(comp, 'isAllocationAmountLessThanWire').and.returnValue(true);
                spyOn(comp, 'getRemainingAllocationAmount');

                let result = comp.isFormValid();

                expect(comp.isFormPristineAndValid).toHaveBeenCalledTimes(1);
                expect(comp.isValidPrinciplePrepayment).toHaveBeenCalledTimes(0);
                expect(comp.isAllocationAmountLessThanWire).toHaveBeenCalledTimes(0);
                expect(comp.getRemainingAllocationAmount).toHaveBeenCalledTimes(0);
                expect(result).toBeFalsy();
            });
        });
    describe('isFormValid method ',
        () => {
            it('when isFormPristineAndValid is true but isValidPrinciplePrepayment is false the following validation methods do not fire and return false', () => {
                spyOn(comp, 'isFormPristineAndValid').and.returnValue(true);
                spyOn(comp, 'isValidPrinciplePrepayment').and.returnValue(false);
                spyOn(comp, 'isAllocationAmountLessThanWire').and.returnValue(true);
                spyOn(comp, 'getRemainingAllocationAmount');

                let result = comp.isFormValid();

                expect(comp.isFormPristineAndValid).toHaveBeenCalledTimes(1);
                expect(comp.isValidPrinciplePrepayment).toHaveBeenCalledTimes(1);
                expect(comp.isAllocationAmountLessThanWire).toHaveBeenCalledTimes(0);
                expect(comp.getRemainingAllocationAmount).toHaveBeenCalledTimes(0);
                expect(result).toBeFalsy();
            });
        });
    describe('isFormValid method ',
        () => {
            it('when isFormPristineAndValid and isValidPrinciplePrepayment are true but isAllocationAmountLessThanWire is false the following validation methods do not fire and return false', () => {
                spyOn(comp, 'isFormPristineAndValid').and.returnValue(true);
                spyOn(comp, 'isValidPrinciplePrepayment').and.returnValue(true);
                spyOn(comp, 'isValidAmount').and.returnValue(true);
                spyOn(comp, 'isAllocationAmountLessThanWire').and.returnValue(false);
                spyOn(comp, 'getRemainingAllocationAmount');

                let result = comp.isFormValid();

                expect(comp.isFormPristineAndValid).toHaveBeenCalledTimes(1);
                expect(comp.isValidPrinciplePrepayment).toHaveBeenCalledTimes(1);
                expect(comp.isAllocationAmountLessThanWire).toHaveBeenCalledTimes(1);
                expect(comp.isValidAmount).toHaveBeenCalledTimes(1);
                expect(comp.getRemainingAllocationAmount).toHaveBeenCalledTimes(1);
                expect(result).toBeFalsy();
            });
        });

    describe('setDisplayAccountId method ',
        () => {
            it('when adding record by customer, display account id is set to customer selected account record', () => {
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account = new Account();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId = 1;
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountNumber = 1;

                let result = comp.setDisplayAccountId();

                expect(result).toEqual('1');

            });
        });

    describe('setDisplayAccountId method ',
        () => {
            it('when adding record by gl account, set display account id to gl account id', () => {
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Description = '1 - 1';                

                let result = comp.setDisplayAccountId();

                expect(result).toEqual('1');

            });
        });

    describe('getRemainingAllocationAmount method ',
        () => {
            it('when not editing a record, return total wire amount minus total allocated amount', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = true;

                let result = comp.getRemainingAllocationAmount();

                expect(result).toEqual(100);

            });
        });

    describe('getRemainingAllocationAmount method ',
        () => {
            it('when not editing a record, return total wire amount minus total allocated amount minus amount of record currently being created', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Amount = 100;

                let result = comp.getRemainingAllocationAmount();

                expect(result).toEqual(0);
            });
        });

    describe('isDisabled method ',
        () => {
            it('when account and glaccount are not defined, return true', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();

                let result = comp.isDisabled();

                expect(result).toBeTruthy();
            });
        });

    describe('isDisabled method ',
        () => {
            it('when account is defined but accountId undefined, return true', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account = new Account();                

                comp.searchMode = 'customer';

                let result = comp.isDisabled();

                expect(result).toBeTruthy();
            });
        });

    describe('isDisabled method ',
        () => {
            it('when account is defined but accountId is 0 , return true', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account = new Account();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId = 0;                

                comp.searchMode = 'customer';

                let result = comp.isDisabled();

                expect(result).toBeTruthy();
            });
        });

    describe('isDisabled method ',
        () => {
            it('when account and glaccount are defined but gl account is undefined, return true', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();                
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = undefined;

                comp.searchMode = 'not customer';

                let result = comp.isDisabled();

                expect(result).toBeTruthy();
            });
        });

    describe('isDisabled method ',
        () => {
            it('when account and glaccount are defined but gl account is 0, return true', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();                
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id = 0;

                comp.searchMode = 'not customer';

                let result = comp.isDisabled();

                expect(result).toBeTruthy();
            });
        });

    describe('isDisabled method ',
        () => {
            it('when account is defined and accountId is greater than zero, return false', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();                
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account = new Account();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.Account.AccountId = 1; 

                comp.searchMode = 'customer';

                let result = comp.isDisabled();

                expect(result).toBeFalsy();
            });
        });

    describe('isDisabled method ',
        () => {
            it('when gl account is defined and gl account id is greater than zero, return false', () => {
                spyOn(comp, 'getTotalAllocatedAmount').and.returnValue(100);
                comp.wireAmount = 200;
                comp.isEdit = false;
                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();                
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id = 1;

                comp.searchMode = 'not customer';

                let result = comp.isDisabled();

                expect(result).toBeFalsy();
            });
        });

    describe('getGlAccounts method ',
        () => {
            it('call centralCodesDataService getGlAccount', () => {
                spyOn(comp.centralCodesDataService, 'getGlAccount').and.returnValue(Observable.of(fakeDropDownResult));

                comp.getGlAccounts('');

                expect(comp.centralCodesDataService.getGlAccount).toHaveBeenCalledTimes(1);                
            });
        });

    describe('getTypeAheadData method ',
        () => {
            it('call getGlAccount', () => {
                spyOn(comp, 'getGlAccounts').and.returnValue(Observable.of(fakeDropDownResult));

                comp.getTypeAheadData('');

                expect(comp.getGlAccounts).toHaveBeenCalledTimes(1);
                expect(comp.results).toBeDefined();
            });
        });

    describe('setEditSearchSelection method ',
        () => {
            it('call getGlAccount', () => {                
                spyOn(comp, 'getGlAccounts').and.returnValue(Observable.of(fakeDropDownResults));

                comp.setEditSearchSelection(1);

                expect(comp.getGlAccounts).toHaveBeenCalledTimes(1);
                expect(comp.results).toBeDefined();
                expect(comp.searchSelection).toBeDefined();
            });
        });

    describe('glAccountOnBlur method ',
        () => {
            it('when field value is empty, set glaccountid to undefined', () => {

                let selection: any = new Object();
                selection.currentTarget = new Object;
                selection.currentTarget.value = '';

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();

                comp.glAccountOnBlur(selection);

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId).toBeUndefined();

            });
        });

    describe('glAccountOnBlur method ',
        () => {
            it('when field value is not empty and gl account list is 1, set glaccountid returned id', () => {

                let selection: any = new Object();
                selection.currentTarget = new Object;
                selection.currentTarget.value = 'test';
                
                spyOn(comp, 'getGlAccounts').and.returnValue(Observable.of(fakeDropDownResults));

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();

                comp.glAccountOnBlur(selection);

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id).toEqual(1);
            });
        });

    describe('glAccountOnBlur method ',
        () => {
            it('when field value is not empty and gl account list is greater than 1, set glaccountid to undefined', () => {

                let secondObject = new GenericDropDownModel();
                secondObject.Id = 2;

                fakeDropDownResults.push(secondObject);

                let selection: any = new Object();
                selection.currentTarget = new Object;
                selection.currentTarget.value = 'test';

                spyOn(comp, 'getGlAccounts').and.returnValue(Observable.of(fakeDropDownResults));

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();

                comp.glAccountOnBlur(selection);

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId).toBeUndefined();
            });
        });

    describe('setSelectionId method ',
        () => {
            it('set gl accountid to passed in selection', () => {

                let testObject = new GenericDropDownModel();
                testObject.Id = 2;

                comp.wireCustomerAllocation = new WireCustomerAllocationModel();
                comp.wireCustomerAllocation.incomingWireTransactionDetail = new IncomingWireTransactionDetails();
                comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId = new GenericDropDownModel();

                comp.setSelectionId(testObject);

                expect(comp.wireCustomerAllocation.incomingWireTransactionDetail.GLAccountId.Id).toEqual(2);
            });
        });
});
