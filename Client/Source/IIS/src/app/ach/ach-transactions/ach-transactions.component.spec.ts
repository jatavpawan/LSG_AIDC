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

import { AchDataService } from "../../core/services/ach/ach-data.service";
import { MockAchDataService } from "../../tests/mocks/mock-ach-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { MockGrowlerMediatorService } from "../../tests/mocks/mock-growler-mediator-service";
import { MockActivatedRoute } from "../../tests/mocks/mock-activated-route";
import { MockDialogService } from "../../tests/mocks/mock-dialog-service";
import { MockAccountsDataService } from "../../tests/mocks/mock-accounts-data.service";
import { Ach } from "../../shared/models/ach/ach.model";
import { BankTemplate } from "../../shared/models/ach/bank-template.model";
import { AchStatus } from "../../shared/models/ach/ach-status";
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { AchMediatorService } from "../../core/services/mediators/ach-mediator.service";
import { AchTransactionsComponent } from "./ach-transactions.component";

describe('AchTransactionsComponent', () => {

    let comp: AchTransactionsComponent;
    let fixture: ComponentFixture<AchTransactionsComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let dialogSpy: any;
    let routeSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AchTransactionsComponent, DateFormatPipe],
            providers: [DialogService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(AchTransactionsComponent, {
            set: {
                providers: [
                    { provide: AchDataService, useClass: MockAchDataService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: ActivatedRoute, useClass: MockActivatedRoute }
                    , { provide: DialogService, useClass: MockDialogService }
                    , { provide: AchMediatorService, useClass: MockAccountsDataService }
                ]
            }
        })
            .overrideModule(BrowserDynamicTestingModule,
            {
                set: {
                    entryComponents: [AchTransactionsComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AchTransactionsComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        dialogSpy = spyOn(comp.dialogService, 'addDialog').and.returnValue(Observable.of(true));
        routeSpy = spyOn(comp.router, 'navigate');
    });

    describe('getAchTransactions method ', () => {
        it('should call achDataService method', () => {
            let arbitraryCustomerId: number = 1;
            comp.shouldDisplayActive = true;

            comp.getAchTransactions(arbitraryCustomerId);
            expect(comp.transactions.length).toEqual(3);
        });
    });

    describe('viewAch method ', () => {
        it('should call addDialog method', () => {
            let arbitraryTransaction: Ach = new Ach();
            comp.shouldDisplayActive = true;

            comp.viewAch(arbitraryTransaction);
            expect(dialogSpy.calls.any()).toBe(true, 'addDialog');
        });
    });

    describe('addnew method ', () => {
        it('should call router.navigate method', () => {
            comp.addNew();
            expect(routeSpy.calls.any()).toBe(true, 'navigate');
        });
    });

    describe('copy method ', () => {
        it('should call router.navigate method', () => {
            let arbitraryTransaction: Ach = new Ach();
            arbitraryTransaction.BankTemplate = new BankTemplate();
            comp.copyAch(arbitraryTransaction);
            expect(routeSpy.calls.any()).toBe(true, 'navigate');
        });
    });

    describe('delete method ', () => {
        it('should call addDialog method', () => {
            let arbitraryTransaction = new Ach();
            arbitraryTransaction.AchId = 1;

            comp.deleteAch(arbitraryTransaction);
            expect(dialogSpy.calls.any()).toBe(true, 'addDialog');
        });
    });

    describe('getIsDeleted method ', () => {
        it('should return correct result', () => {
            let arbitraryTransaction = new Ach();
            arbitraryTransaction.Status = AchStatus.Deleted;

            let isDeleted = comp.getIsDeleted(arbitraryTransaction);
            expect(isDeleted).toBe(true);
        });
    });
});
