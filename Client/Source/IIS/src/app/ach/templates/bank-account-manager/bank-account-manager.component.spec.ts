import { StatusTypeFormatPipe } from './../../../shared/pipes/status-type-format.pipe';
import { AccountNumberFormatPipe } from './../../../shared/pipes/account-number-format.pipe';
import { SharedModule } from './../../../shared/shared.module';

import { MockDialogService } from './../../../tests/mocks/mock-dialog-service';
import { BankTemplateComponent } from './../bank-template/bank-template.component';
import { BankTemplate } from './../../../shared/models/ach/bank-template.model';
import { MockRouter } from './../../../tests/mocks/mock-router';
import { MockActivatedRoute } from './../../../tests/mocks/mock-activated-route';
import { DialogService } from 'ng2-bootstrap-modal';
import { ActivatedRoute, Router } from '@angular/router';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { AchDataService } from './../../../core/services/ach/ach-data.service';
import { MockBankTemplateDataService }
    from './../bank-template/mock-bank-template-data.service';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { GrowlerMediatorService } from '../../../core/services/mediators/growler-mediator.service';
import { BankAccountManagerMediatorService } from "../../shared/mediators/bank-account-manager-mediator.service";
import { BankAccountManagerComponent } from "./bank-account-manager.component";
import { FormsModule } from '@angular/forms';

describe('BankAccountManagerComponent', () => {

    let comp: BankAccountManagerComponent;
    let fixture: ComponentFixture<BankAccountManagerComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let spy: any;

    let errorSpy: any;
    let successSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [BankAccountManagerComponent
                , BankTemplateComponent, AccountNumberFormatPipe, StatusTypeFormatPipe],
            providers: [DialogService],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .overrideComponent(BankAccountManagerComponent, {
                set: {
                    providers: [
                        { provide: AchDataService, useClass: MockBankTemplateDataService }
                        , { provide: ActivatedRoute, useClass: MockActivatedRoute }
                        , { provide: Router, useClass: MockRouter }
                        , { provide: DialogService, useClass: MockDialogService }
                        , BankAccountManagerMediatorService
                        , GrowlerMediatorService
                    ]
                }
            })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [BankTemplateComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BankAccountManagerComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        spy = spyOn(comp.dialogService, 'addDialog')
            .and.returnValue(Observable.of(true));

        errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');
    });

    it('should create the BankAccountManagerComponent', () => {
        expect(comp).toBeTruthy();
    });
    it('should have the BankAccountManagerMediatorService Observables defined', () => {
        expect(comp.bankAccountMgrMediatorService.viewDetailsChanged$).toBeTruthy();
        expect(comp.bankAccountMgrMediatorService.newAchRequired$).toBeTruthy();
        expect(comp.bankAccountMgrMediatorService.deletionRequired$).toBeTruthy();
    });
    describe('When calling getTemplates method', () => {
        it('should have length of 1 for originalTemplates',
            () => {
                comp.getTemplates(1);

                expect(comp.originalTemplates.length).toEqual(1);
            });
        it('should have length of 1 for templates',
            () => {
                comp.getTemplates(1);
                expect(comp.templates.length).toEqual(1);
            });
       
    });

    describe('When calling getDynamicAutoId method', () => {
        it('should return data-auto-id-1',() => {
                var name = comp.getDynamicAutoId('data-auto-id-', '1');
                expect(name).toEqual('data-auto-id-1');
            });
    });

    describe('When calling addNew method', () => {
        it('should return show template equals true', () => {
            comp.addNew();

            expect(spy.calls.any()).toBe(true, 'addDialog');
        });
    });


    describe('When calling deleteAchTemplate method', () => {

        it('should growl successfully when BankTemplateId > 0', () => {
            var bankTemplate = new BankTemplate();
            bankTemplate.BankTemplateId = 1;

            var name = comp.deleteAchTemplate(bankTemplate);

            expect(successSpy.calls.any()).toBe(true, 'growlSuccess');
        })

        it('should growl with failure when BankTemplateId < 0', () => {
            var bankTemplate = new BankTemplate();
            bankTemplate.BankTemplateId = -1;

            var name = comp.deleteAchTemplate(bankTemplate);
            expect(errorSpy.calls.any()).toBe(true, 'growlError');
        })
    });

    describe('When calling newAch method', () => {

        it('should growl successfully when BankTemplateId > 0', () => {
            var bankTemplate = new BankTemplate();
            bankTemplate.BankTemplateId = 1;
            comp.customerId = 2;

                spyOn(comp.router, 'navigate');

            var name = comp.newAch(bankTemplate);

                expect(comp.router.navigate).toHaveBeenCalledWith(['customer/2/ach/createAch/1']);
            });

    });

    describe('When calling delete method and is not eligible for deletion', () => {

        it('should show a pop-up warning', () => {
                var bankTemplate = new BankTemplate();
                bankTemplate.BankTemplateId = 1;
                comp.customerId = 2;                

                comp.delete(bankTemplate);

                expect(spy.calls.any()).toBe(true, 'addDialog');
            });
    });
});

//adding in a comment to get the merge to work.