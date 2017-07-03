import { ProcessingDatesDataService } from './../core/services/processing-dates-data.service';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from "ng2-bootstrap-modal";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AchComponent } from "./ach.component";
import { SchedulerContainer } from "../shared/models/scheduler-container.model";
import { RecurringSchedule } from "../shared/models/recurring-schedule.model";
import { MonthlySchedule } from "../shared/models/monthly-schedule.model";
import { WeeklySchedule } from "../shared/models/weekly-schedule.model";
import { SettingsService } from "../core/services/settings.service";
import { MockActivatedRoute } from "../tests/mocks/mock-activated-route";
import { MockDialogServiceSchedulerContainer } from "../tests/mocks/mock-dialog-service";
import { AchDataService } from "../core/services/ach/ach-data.service";
import { MockAchDataService } from "../tests/mocks/mock-ach-data.service";
import { GrowlerMediatorService } from "../core/services/mediators/growler-mediator.service";
import { MockGrowlerMediatorService } from "../tests/mocks/mock-growler-mediator-service";
import { AccountsDataService } from "../core/services/accounts-data.service";
import { MockAccountsDataService } from "../tests/mocks/mock-accounts-data.service";
import { Ach } from "../shared/models/ach/ach.model";
import { AchApprover } from "../shared/models/ach/ach-approver.model";
import { DateFormatPipe } from '../shared/pipes/date-format.pipe';
import { FormsModule } from '@angular/forms';
import { CentralCodesDataService } from '../core/services/central-codes-data.service';
import { MockCentralCodesDataService } from '../tests/mocks/mock-central-codes-data.service';
import { AccountsMediatorService } from '../core/services/mediators/accounts-mediator.service';
import { Account } from '../shared/models/account.model';
import { AchMediatorService } from "../core/services/mediators/ach-mediator.service";
import { MockProcessingDatesDataService } from "../tests/mocks/mock-processing-dates-data.service";

import { GenericDropDownModel } from '../shared/models/generic-dropdown-model';
import { CustomerService } from "../core/services/customer.service";
import { MockCustomerService } from "../tests/mocks/mock-customer.service";

describe('AchComponent', () => {

    (<any>window).ClientSettings = {
        AuthToken: "AuthToken",
        AuditInfoToken: "AuditInfoToken",
        LoggedOnUserName: "LoggedOnUserName",
        UserImageUrl: ".UserImageUrl"
    };

    let comp: AchComponent;
    let fixture: ComponentFixture<AchComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let spy: any;
    let arbitraryStartDate = new Date('01/01/2017');
    let arbitraryEndDate = new Date('01/01/2018');

    let dialogSchedulerReturn = new SchedulerContainer();
    dialogSchedulerReturn.RecurringSchedule = new RecurringSchedule();
    dialogSchedulerReturn.RecurringSchedule.MonthlySchedule = new MonthlySchedule();
    dialogSchedulerReturn.RecurringSchedule.WeeklySchedule = new WeeklySchedule();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [AchComponent, DateFormatPipe],
            providers: [DialogService, SettingsService, AchMediatorService, AccountsMediatorService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(AchComponent, {
            set: {
                providers: [
                    { provide: ActivatedRoute, useClass: MockActivatedRoute }
                    , { provide: DialogService, useClass: MockDialogServiceSchedulerContainer }
                    , { provide: AchDataService, useClass: MockAchDataService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: AccountsDataService, useClass: MockAccountsDataService }
                    , { provide: CentralCodesDataService, useClass: MockCentralCodesDataService }
                    , { provide: ProcessingDatesDataService, useClass: MockProcessingDatesDataService }
                    , { provide: CustomerService, useClass: MockCustomerService }
                ]
            }
        })
            .overrideModule(BrowserDynamicTestingModule,
            {
                set: {
                    entryComponents: [AchComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AchComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        spy = spyOn(comp.dialogService, 'addDialog')
            .and.returnValue(Observable.of(dialogSchedulerReturn));

        comp.initializeAch();

    });

    describe('initializeAch method ', () => {
        it('should instantiate ach object and assign bankTemplateId input to AchOut object', () => {
            let arbitraryBankTemplateId: number = 1;
            comp.customerId = arbitraryBankTemplateId;

            comp.initializeAch();
            expect(comp.ach).toBeDefined();
        });
    });

    describe('getRouteParams method ', () => {
        it('when called, set this.customerId and call this.getAccounts', () => {
            comp.getRouteParams();
            expect(comp.customerId).toEqual(1);
        });
    });

    describe('submitAch method ', () => {
        it('when called, this.achDataService.postAch must be called', () => {

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Id = 1;
            comp.ach.HowToApply.Description = "Something";

            let arbitraryach = new Ach();
            comp.submitAch();
            expect(comp.achDataService.postAch(arbitraryach)).toBeTruthy();
        });
    });

    describe('openScheduler method ', () => {
        it('when called, this.dialogService.addDialog must be called', () => {
            comp.initializeAch();
            comp.ach = new Ach();

            if (!comp.ach.Account) {
                comp.ach.Account = new Account();
            }

            comp.ach.Account.PrePayRestriction = '0';

            comp.ach.Schedule = new SchedulerContainer();
            comp.ach.Schedule.NextPaymentDates = [];
            comp.ach.Schedule.RecurringSchedule = new RecurringSchedule();

            comp.openScheduler();

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('viewPayments method ', () => {
        it('when called, this.dialogService.addDialog must be called', () => {
            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Schedule = new SchedulerContainer();

            comp.viewPayments();

            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });

    describe('getAchApprovers method ', () => {
        it('when called, this.achDataService.getApprovers must be called', () => {
            comp.initializeAch();
            comp.ach = new Ach();
            let arbitraryApprovers: AchApprover[] = [new AchApprover(), new AchApprover(), new AchApprover()];
            let arbitraryId: number = 12;
            comp.customerId = arbitraryId;

            comp.getAchApprovers();

            expect(comp.achDataService.getApprovers(arbitraryId)).toEqual(Observable.of(arbitraryApprovers));
        });
    });

    describe('hideExcessAmountValidation method ', () => {
        it('when called and account has pre-pay restriction and amount is greater than $250, show validation error', () => {
            comp.initializeAch();
            comp.ach = new Ach();

            comp.ach.Account = new Account();
            comp.ach.Account.PrePayRestriction = '1';
            comp.ach.ExcessAmount = "251";

            let result: boolean = comp.hideExcessAmountValidation();

            expect(result).toBeFalsy();
        });
    });

    describe('hideExcessAmountValidation method ', () => {
        it('when called and account has does not have pre-pay restriction and amount is greater than $250, do not show validation error', () => {
            comp.initializeAch();
            comp.ach = new Ach();

            comp.ach.Account = new Account();
            comp.ach.Account.PrePayRestriction = '0';
            comp.ach.ExcessAmount = "251";

            let result: boolean = comp.hideExcessAmountValidation();

            expect(result).toBeTruthy();
        });
    });

    describe('hideExcessAmountValidation method ', () => {
        it('when called and account has pre-pay restriction and amount is $250 or less, do not show validation error', () => {
            comp.initializeAch();
            comp.ach = new Ach();

            comp.ach.Account = new Account();
            comp.ach.Account.PrePayRestriction = '0';
            comp.ach.ExcessAmount = "250";

            let result: boolean = comp.hideExcessAmountValidation();

            expect(result).toBeTruthy();
        });
    });

    describe('accountNumberChanged method ', () => {
        it('when called and transaction type is out, should populate approvers', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;

            let fakeMediatorAccount = new Account();
            fakeMediatorAccount.AccountId = 1;
            fakeMediatorAccount.ExternalAccountNumber = 1234;
            fakeMediatorAccount.AccountNumber = 1;
            comp.accountsMediatorService.selectedAccount = fakeMediatorAccount;
            comp.customerId = 1;

            comp.getAccounts(1);
            comp.ach.TransactionDirection = new GenericDropDownModel();
            comp.ach.TransactionDirection.Description = 'Out';

            comp.accountNumberChanged();

            expect(comp.approvers.length > 0).toBeTruthy();
        });
    });

    describe('howToApplyChanged method ', () => {
        it('when called and how to apply description is scheduled payment, should populate ach amount to be the same as the scheduled payment amount', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Scheduled Payment';

            comp.howToApplyChanged();

            expect(comp.ach.Amount).toEqual(comp.ach.Account.ScheduledPaymentAmount.toString());
        });
    });

    describe('howToApplyChanged method ', () => {
        it('when called and how to apply description is scheduled payment, should populate ach amount to be the same as the scheduled payment amount', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Scheduled Payment';

            comp.howToApplyChanged();

            expect(comp.ach.Amount).toEqual(comp.ach.Account.ScheduledPaymentAmount.toString());
        });
    });

    describe('howToApplyChanged method ', () => {
        it('when called and how to apply description is Scheduled Payment + Excess, should populate ach amount to be the same as the scheduled payment amount', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Scheduled Payment + Excess';

            comp.howToApplyChanged();

            expect(comp.ach.Amount).toEqual(comp.ach.Account.ScheduledPaymentAmount.toString());
        });
    });

    describe('excessAmountRequired method ', () => {
        it('when called and how to apply description is Scheduled Payment + Excess, return true', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Scheduled Payment + Excess';

            let result: boolean = comp.excessAmountRequired();

            expect(result).toBeTruthy();
        });
    });

    describe('excessAmountRequired method ', () => {
        it('when called and how to apply description is not Scheduled Payment + Excess, return false', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Some other how to apply';

            let result: boolean = comp.excessAmountRequired();

            expect(result).toBeFalsy();
        });
    });

    describe('excessAmountDisabled method ', () => {
        it('when called and how to apply description is not Scheduled Payment + Excess, return true and set ach ExcessAmount to undefined', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;
            comp.ach.ExcessAmount = '100';

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Some other how to apply';

            let result: boolean = comp.excessAmountDisabled();

            expect(result).toBeTruthy();
            expect(comp.ach.ExcessAmount).toBeUndefined();
        });
    });

    describe('excessAmountDisabled method ', () => {
        it('when called and how to apply description is Scheduled Payment + Excess, return false and do not set ach ExcessAmount to undefined', () => {

            comp.initializeAch();
            comp.ach = new Ach();
            comp.ach.Account = new Account();
            comp.ach.Account.AccountNumber = 1;
            comp.ach.Account.ScheduledPaymentAmount = 10;
            comp.ach.ExcessAmount = '100';

            comp.ach.HowToApply = new GenericDropDownModel();
            comp.ach.HowToApply.Description = 'Scheduled Payment + Excess';

            let result: boolean = comp.excessAmountDisabled();

            expect(result).toBeFalsy();
            expect(comp.ach.ExcessAmount === '100').toBeTruthy();
        });
    });
});

