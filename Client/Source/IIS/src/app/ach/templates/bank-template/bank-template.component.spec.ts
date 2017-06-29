import { AccountNumberFormatPipe } from './../../../shared/pipes/account-number-format.pipe';

import { GrowlerMediatorService } from './../../../core/services/mediators/growler-mediator.service';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AchDataService } from './../../../core/services/ach/ach-data.service';
import { BankTemplateComponent } from './bank-template.component';
import { MockBankTemplateDataService, MockDropDownOptionsLookupDataService } from './mock-bank-template-data.service';

import { BankTemplate } from '../../../shared/models/ach/bank-template.model';
import { DialogService } from "ng2-bootstrap-modal";
import { MockGrowlerMediatorService } from '../../../tests/mocks/mock-growler-mediator-service';
import { FormsModule } from '@angular/forms';
import { GenericDropDownModel } from '../../../shared/models/generic-dropdown-model';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';
describe('BankTemplateComponent', () => {
    let comp: BankTemplateComponent;
    let fixture: ComponentFixture<BankTemplateComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let errorSpy: any;
    let successSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [BankTemplateComponent, AccountNumberFormatPipe],
            providers: [],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .overrideComponent(BankTemplateComponent, {
                set: {
                    providers: [
                        { provide: CentralCodesDataService, useClass: MockDropDownOptionsLookupDataService }
                        , { provide: AchDataService, useClass: MockBankTemplateDataService }
                        , DialogService
                        , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BankTemplateComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

        let bankAccountType = new GenericDropDownModel();
        bankAccountType.Id = 1;
        bankAccountType.Description = 'Test BankAccountType';
        comp.achTemplateData = new BankTemplate();
        comp.achTemplateData.BankAccountType = bankAccountType;

        errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');
    });

    describe('when account types are called from repo', () => {
        it('should have correct properties', () => {
            comp.getAccountTypes();

            expect(comp.accountTypes[0].Id).toEqual(1);
            expect(comp.accountTypes[0].Description).toEqual('Test Description');
        });
    });

    describe('when looking up aba numbers', () => {
        it('should return test aba data', () => {
            let bankAccountType = new GenericDropDownModel();
            bankAccountType.Id = 1;

            comp.achTemplateData = new BankTemplate();
            comp.achTemplateData.BankTemplateId = 0;
            comp.achTemplateData.AbaRoutingNumber = "1";
            comp.achTemplateData.BankAccountType = bankAccountType;
            let arbitraryAbaNumber = 1;

            let testReturn = comp.lookupAba();

            expect(comp.achTemplateData.BankName).toEqual('Test Aba Name');
            expect(comp.achTemplateData.City).toEqual('Test City');
            expect(comp.achTemplateData.State).toEqual('Test State');
        });

        it('should return aba not found', () => {
            let bankAccountType = new GenericDropDownModel();
            bankAccountType.Id = 1;

            comp.achTemplateData = new BankTemplate();
            comp.achTemplateData.BankTemplateId = 0;
            comp.achTemplateData.AbaRoutingNumber = "0";
            comp.achTemplateData.BankAccountType = bankAccountType;
            let arbitraryAbaNumber = 1;

            comp.achTemplateForm = <any>{
                controls: {
                    AbaRoutingNumber: { setErrors: () => { } }
                }
            }
            spyOn(comp.achTemplateForm.controls["AbaRoutingNumber"], 'setErrors');

            let testReturn = comp.lookupAba();

            expect(comp.achTemplateForm.controls["AbaRoutingNumber"].setErrors).toHaveBeenCalledWith({ 'invalid': true });
        });
    });

    describe('when creating new ach template', () => {
        it('should create new ach template data', () => {
            comp.createNewAchTemplate();

            expect(comp.achTemplateData).toBeTruthy
            expect(comp.achTemplateData.BankAccountType).toBeTruthy
        });
    });

    describe('when submitting new ach template', () => {
        it('should call service and show growl with success message', () => {
            let bankAccountType = new GenericDropDownModel();
            bankAccountType.Id = 1;

            comp.achTemplateData = new BankTemplate();
            comp.achTemplateData.BankTemplateId = 0;
            comp.achTemplateData.AbaRoutingNumber = "1";
            comp.achTemplateData.BankAccountType = bankAccountType;

            comp.accountTypes = [];
            comp.accountTypes.push(bankAccountType);
            comp.submit();

            expect(successSpy.calls.any()).toBe(true, 'growlSuccess');
        });
        it('should call service and show growl with danger message', () => {
            let accType = new GenericDropDownModel();
            accType.Id = 1;

            comp.achTemplateData = new BankTemplate();
            comp.achTemplateData.BankTemplateId = 1;
            comp.achTemplateData.AbaRoutingNumber = "1";
            comp.achTemplateData.BankAccountType = accType;

            comp.accountTypes = [];
            comp.accountTypes.push(accType);
            comp.submit();

            expect(errorSpy.calls.any()).toBe(true, 'growlError');
        });
    });
});