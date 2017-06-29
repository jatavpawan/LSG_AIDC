import { UserSetting } from './../../shared/models/user-setting.model';
import { Office } from './../../shared/models/office.model';
import { MockDialogService } from './../../tests/mocks/mock-dialog-service';
import { CounterDraft } from './../../shared/models/drafts/counter-draft.model';

import { GrowlerMediatorService } from './../../core/services/mediators/growler-mediator.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA, OnInit, ViewChild, Input, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { NgForm, Validator, FormsModule } from '@angular/forms';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CoreModule } from './../../core/core.module';
import { DialogService } from "ng2-bootstrap-modal";
import { MockGrowlerMediatorService } from '../../tests/mocks/mock-growler-mediator-service';
import { MockDraftDataService } from '../../tests/mocks/mock-draft-data.service';
import { DraftsDataService } from '../../core/services/drafts/drafts-data.service';
import { MockActivatedRoute } from '../../tests/mocks/mock-activated-route';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CounterDraftComponent } from './counter-draft.component';
import { AccountsDataService } from '../../core/services/accounts-data.service';
import { MockAccountsDataService } from '../../tests/mocks/mock-accounts-data.service';
import { CustomerService } from '../../core/services/customer.service';
import { MockCustomerService } from '../../tests/mocks/mock-customer.service';
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { UserSettingsDataService } from '../../core/services/user-settings-data.service';
import { MockCentralCodesDataService } from '../../tests/mocks/mock-central-codes-data.service';
import { MockUserSettingsDataService } from '../../tests/mocks/mock-user-settings-data.service';
import { Account } from '../../shared/models/account.model';

describe('CounterDraftComponent', () => {

    let comp: CounterDraftComponent;
    let fixture: ComponentFixture<CounterDraftComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let errorSpy: any;
    let successSpy: any;
    let addDialogSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [CounterDraftComponent],
            providers: [],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .overrideComponent(CounterDraftComponent, {
                set: {
                    providers: [
                        { provide: DialogService, useClass: MockDialogService }
                        , { provide: DraftsDataService, useClass: MockDraftDataService }
                        , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                        , { provide: AccountsDataService, useClass: MockAccountsDataService }
                        , { provide: CustomerService, useClass: MockCustomerService }
                        , { provide: CentralCodesDataService, useClass: MockCentralCodesDataService }
                        , { provide: UserSettingsDataService, useClass: MockUserSettingsDataService }
                        ,
                    ]
                }
            })
            .compileComponents();
    }));


    beforeEach(() => {
        fixture = TestBed.createComponent(CounterDraftComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        comp.customerService.selectedCustomer.Id = 1;

        errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');
    });

    describe('when populateEligibleAccounts are called from repo', () => {
        it('should have correct returns', () => {
            comp.populateEligibleAccounts();
            expect(comp.eligibleAccounts.length).toEqual(2);
        });
    });

    describe('When calling populateOffices method', () => {
        it('should have correct returns', () => {
            comp.populateOffices();

            expect(comp.officeList.length).toEqual(3);
        });
    });

    describe('When calling populateUserSetting method', () => {
        it('should have correct returns', () => {
            comp.populateUserSetting();

            expect(comp.userSetting.UserId).toEqual(1);
        });
    });

    describe('When calling submit method with account having region not matching users', () => {
        it('should fail with a growl call', () => {


            this.accounts = new Array<Account>();
            let testAccount = new Account();
            testAccount.AccountNumber = 1
            testAccount.Office = new Office();
            testAccount.Office.RegionId = 2;

            comp.counterDraft = new CounterDraft();
            comp.counterDraft.LASAccountNumber = 1;
            comp.counterDraft.Office = new Office();
            comp.counterDraft.Office.OfficeId = 1;
            comp.userSetting = new UserSetting();
            comp.userSetting.RegionId = 2;

            comp.populateEligibleAccounts();
            comp.populateOffices();

            comp.submit();

            expect(errorSpy.calls.any()).toBe(true, 'growlError');
        });
    });

    describe('When calling submit method for an account with exiting draft range for same office', () => {
        it('should fail with a growl call', () => {
            comp.counterDraft = new CounterDraft();
            comp.counterDraft.LASAccountNumber = 1;
            comp.counterDraft.BeginningDraftNumber = 11;
            comp.counterDraft.EndingDraftNumber = 14;

            comp.counterDraft.Office = new Office();
            comp.counterDraft.Office.OfficeId = 1;
            comp.userSetting = new UserSetting();
            comp.userSetting.RegionId = 1;

            comp.populateEligibleAccounts();
            comp.populateOffices();

            comp.submit();

            expect(errorSpy.calls.any()).toBe(true, 'growlError');
        });
    });

    describe('When calling submit method valid office and draft range', () => {
        it('should succeed with a growl', () => {

            let mockAccounts: Account[] = [];
            let mockAccount: Account = new Account();
            mockAccount.AccountId = 1;
            mockAccount.ExternalAccountNumber = 1234;
            mockAccount.Office = new Office();
            mockAccount.Office.RegionId = 1;
            mockAccounts.push(mockAccount);
            spyOn(comp, 'filterEligibleAccounts').and.returnValue(mockAccounts);

            let offices: Office[] = [];
            let office = new Office();
            office.OfficeId = 1;
            office.OfficeName = 'Omaha';
            offices.push(office);
            spyOn(comp, 'populateOffices').and.returnValue(offices);

            comp.counterDraft = new CounterDraft();
            comp.counterDraft.LASAccountNumber = 1;
            comp.counterDraft.BeginningDraftNumber = 1;
            comp.counterDraft.EndingDraftNumber = 4;

            comp.counterDraft.Office = new Office();
            comp.counterDraft.Office.OfficeId = 1;
            comp.userSetting = new UserSetting();
            comp.userSetting.RegionId = 1;

            spyOn(comp.draftsDataService, 'insertCounterDraft').and.returnValue(Observable.of(true));

            comp.submit();

            expect(successSpy.calls.any()).toBe(true, 'growlSuccess');
        });
    });
});

//adding in a comment to get the merge to work. 