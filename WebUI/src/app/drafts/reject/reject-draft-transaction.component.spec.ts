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


import { SettingsService } from "../../core/services/settings.service";
import { AchRejectConfirmationMediatorService } from
    "../../core/services/mediators/ach-reject-confirmation-mediator.service";
import { MockActivatedRoute } from "../../tests/mocks/mock-activated-route";
import { MockDialogService } from "../../tests/mocks/mock-dialog-service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { MockGrowlerMediatorService } from "../../tests/mocks/mock-growler-mediator-service";
import { CustomerService } from "../../core/services/customer.service";
import { MockCustomerService } from "../../tests/mocks/mock-customer.service";
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { FormsModule } from '@angular/forms';
import { RejectDraftTransactionComponent } from './reject-draft-transaction.component';
import { DraftsDataService } from './../../core/services/drafts/drafts-data.service';
import { MockDraftDataService } from './../../tests/mocks/mock-draft-data.service';
import { DraftTransaction } from '../../shared/models/drafts/draft-transaction.model';
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';
import { RejectDraftConfirmationComponent } from './reject-draft-confirmation.component';

describe('DraftRejectComponent', () => {

    let comp: RejectDraftTransactionComponent;
    let fixture: ComponentFixture<RejectDraftTransactionComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let errorSpy: any;
    let successSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [RejectDraftTransactionComponent, CurrencyFormatPipe, DateFormatPipe],
            providers: [DialogService, SettingsService, AchRejectConfirmationMediatorService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(RejectDraftTransactionComponent, {
            set: {
                providers: [
                    { provide: ActivatedRoute, useClass: MockActivatedRoute }
                    , { provide: DialogService, useClass: MockDialogService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: CustomerService, useClass: MockCustomerService }
                    , { provide: DraftsDataService, useClass: MockDraftDataService }
                ]
            }
        })
            .overrideModule(BrowserDynamicTestingModule,
            {
                set: {
                    entryComponents: [RejectDraftTransactionComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RejectDraftTransactionComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');
    });

    describe('getRouteParams method ', () => {
        it('should call getDraftTransactions when CustomerId is greater than 0', () => {
            comp.getRouteParams();
            expect(comp.customerId > 0).toBe(true);
        });
    });

    describe('rejectDraftTransaction method ', () => {
        it('should call draft data service reject draft rejection', () => {
            spyOn(comp.draftDataService, 'rejectDraftTransaction').and.returnValue(Observable.of(true));

            let draftRejection = new DraftRejection();
            draftRejection.DraftId = 1;
            comp.rejectDraftTransaction(draftRejection);
            expect(comp.draftDataService.rejectDraftTransaction).toHaveBeenCalledTimes(1);
        });
    });

    describe('openConfirmDelete method ', () => {
        it('should open Confirm Delete dialog', () => {

            let dialogSpy = spyOn(comp.dialogService, 'addDialog').and.returnValue(Observable.of(new DraftRejection()));            
            spyOn(comp, 'rejectDraftTransaction');

            let testDraftFileRow: any = new Object();
            testDraftFileRow.DraftId = 1;
            testDraftFileRow.DraftNumber = 1;
            testDraftFileRow.Amount = 1;

            comp.draftRejection = new DraftRejection();

            comp.openConfirmDelete(testDraftFileRow);
            
            expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
        });
    });
});