import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'ng2-bootstrap-modal';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DraftRejectionsComponent } from './draft-rejections.component';
import { DownloadCsvService } from '../../shared/export/downLoadCsv.service';
import { MockActivatedRoute } from '../../tests/mocks/mock-activated-route';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { MockGrowlerMediatorService } from '../../tests/mocks/mock-growler-mediator-service';
import { CustomerService } from '../../core/services/customer.service';
import { MockCustomerService } from '../../tests/mocks/mock-customer.service';
import { MockDraftDataService } from '../../tests/mocks/mock-draft-data.service';
import { DraftsDataService } from '../../core/services/drafts/drafts-data.service';
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';
import { MockCentralCodesDataService } from '../../tests/mocks/mock-central-codes-data.service';
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';
import { DraftTransaction } from '../../shared/models/drafts/draft-transaction.model';

describe('DraftRejectionsComponent',
    () => {

        let comp: DraftRejectionsComponent;
        let fixture: ComponentFixture<DraftRejectionsComponent>;
        let element: HTMLElement;
        let debugEl: DebugElement;
        let spyDialog: any;
        let errorSpy: any;
        let successSpy: any;
        let warnSpy: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, RouterTestingModule],
                declarations: [DraftRejectionsComponent],
                providers: [DialogService, DownloadCsvService, DraftsDataService],
                schemas: [NO_ERRORS_SCHEMA]
            }).overrideComponent(DraftRejectionsComponent,
                {
                    set: {
                        providers: [
                            { provide: ActivatedRoute, useClass: MockActivatedRoute },
                            { provide: DraftsDataService, useClass: MockDraftDataService },
                            { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService },
                            { provide: CustomerService, useClass: MockCustomerService },
                            { provide: CentralCodesDataService, useClass: MockCentralCodesDataService }
                        ]
                    }
                }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DraftRejectionsComponent);
            comp = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
            spyDialog = spyOn(comp.dialogService, 'addDialog').and.returnValue(Observable.of(true));
            errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
            warnSpy = spyOn(comp.growlerMediatorService, 'growlWarn');
            successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');

        });

        describe('ngOninit method ', () => {
            it('should call getDraftRejections, set customerService.selectedCustomer to undefined, and set customer service selected text to empty string', () => {
                spyOn(comp.draftDataService, 'getDraftRejectionsData').and.returnValue(Observable.of());
                spyOn(comp, 'getDraftRejections').and.callThrough();

                comp.ngOnInit();

                expect(comp.draftDataService.getDraftRejectionsData).toHaveBeenCalledTimes(1);
                expect(comp.getDraftRejections).toHaveBeenCalledTimes(1);
                expect(comp.customerService.selectedCustomer).toBeUndefined();
                expect(comp.customerService.noCustomerSelectedText).toEqual('');
            });
        });

        describe('ngOnDestroy method ', () => {
            it('should set customer service, no customer selected text to "No Customer Selected"', () => {

                comp.ngOnDestroy();

                expect(comp.customerService.noCustomerSelectedText).toEqual('No Customer Selected');
            });
        });

        describe('getDraftRejections method ', () => {
            it('should call draft data service getDraftRejectionsData and set draftRejections to the results of the call', () => {
                spyOn(comp.draftDataService, 'getDraftRejectionsData').and.returnValue(Observable.of(new Array<DraftRejection>()));

                comp.getDraftRejections();

                expect(comp.draftRejections).toBeDefined();
            });
        });

        describe('deleteRejected method ', () => {
            it('should open Confirm Delete dialog', () => {

                spyOn(comp, 'deleteDraftRejections');
                spyOn(comp, 'getDraftRejections');                
                spyOn(comp.currencyPipe, 'transform');
                spyOn(comp.ng2CurrencyPipe, 'transform');

                let testDraftTransaction = new DraftTransaction();
                testDraftTransaction.Amount = "1000";

                comp.deleteRejected(testDraftTransaction);

                expect(spyDialog.calls.any()).toBe(true);

            });
        });

        describe('deletedraftRejections method ', () => {
            it('should call draft data service delete draft rejection', () => {
                spyOn(comp.draftDataService, 'deleteDraftRejections').and.returnValue(Observable.of(true));
                spyOn(comp, 'getDraftRejections');
                spyOn(comp.currencyPipe, 'transform');
                spyOn(comp.ng2CurrencyPipe, 'transform');


                let testDraftTransaction = new DraftTransaction();
                testDraftTransaction.DraftId = 1;

                comp.deleteDraftRejections(testDraftTransaction);

                expect(comp.draftDataService.deleteDraftRejections).toHaveBeenCalledTimes(1);
                expect(comp.getDraftRejections).toHaveBeenCalledTimes(1);
                expect(successSpy.calls.any()).toBe(true);

            });

            it('should growl error when delete draft rejection returns false', () => {
                spyOn(comp.draftDataService, 'deleteDraftRejections').and.returnValue(Observable.of(false));

                let testDraftTransaction = new DraftTransaction();
                testDraftTransaction.DraftId = 1;

                comp.deleteDraftRejections(testDraftTransaction);
                expect(warnSpy.calls.any()).toBe(true);
            });
        });


        describe('draftRejectionsExport method ', () => {
            it('should call download csv service download csv', () => {
                spyOn(comp.downloadCsvService, 'downloadCsv');

                let testDataTable: any = new Object;
                comp.draftRejectionsExport(testDataTable);

                expect(comp.downloadCsvService.downloadCsv).toHaveBeenCalledTimes(1);

            });
        });
    });