import { MockCustomerService } from '../../tests/mocks/mock-customer.service';
import { CustomerService } from '../../core/services/customer.service';

import { AchRejectionsComponent } from './ach-rejections.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'ng2-bootstrap-modal';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MockActivatedRoute } from '../../tests/mocks/mock-activated-route';
import { AchDataService } from '../../core/services/ach/ach-data.service';
import { MockAchDataService } from '../../tests/mocks/mock-ach-data.service';
import { MockDialogService } from '../../tests/mocks/mock-dialog-service';
import { GrowlerMediatorService } from '../../core/services/mediators/growler-mediator.service';
import { MockGrowlerMediatorService } from '../../tests/mocks/mock-growler-mediator-service';
import { FormsModule } from '@angular/forms';
import { DownloadCsvService } from '../../shared/export/downLoadCsv.service';
import { AchTransaction } from '../../shared/models/ach/ach-transaction.model';

describe('AchRejectComponent', () => {

    let comp: AchRejectionsComponent;
    let fixture: ComponentFixture<AchRejectionsComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let spyDialog: any;
    let errorSpy: any;
    let successSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [AchRejectionsComponent],
            providers: [DialogService, DownloadCsvService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(AchRejectionsComponent, {
            set: {
                providers: [
                    { provide: ActivatedRoute, useClass: MockActivatedRoute }
                    , { provide: AchDataService, useClass: MockAchDataService }
                    , { provide: DialogService, useClass: MockDialogService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: CustomerService, useClass: MockCustomerService }
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AchRejectionsComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        spyDialog = spyOn(comp.dialogService, 'addDialog')
            .and.returnValue(Observable.of(true));
        errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');
    });

    describe('ngOninit method ', () => {
        it('should call getACHRejections on init', () => {
            comp.ngOnInit();
            expect(comp.achRejections.length > 0).toBeTruthy();
        });
    });

    describe('ngOnDestroy method ', () => {
        it('should set noCustomerSelectedText to be correct text', () => {
            comp.ngOnDestroy();
            expect(comp.customerService.noCustomerSelectedText).toEqual('No Customer Selected');
        });
    });

    describe('getAchRejections method ', () => {
        it('should call achDataService getAchRejectionData', () => {
            comp.getAchRejections();
            expect(comp.achRejections.length > 0).toBeTruthy();
        });
    });

    describe('deleteRejected method ', () => {
        it('should call dialogService addDialog', () => {
            let achRejection = new AchTransaction();
            achRejection.AchId = 1;

            comp.deleteRejected(achRejection);
            expect(spyDialog.calls.any()).toBe(true);
        });
    });

    describe('deleteRejected method ', () => {
        it('should call achDataService addDialog', () => {
            let achRejection = new AchTransaction();
            achRejection.AchId = 1;

            comp.deleteRejected(achRejection);
            expect(successSpy.calls.any()).toBe(true);
        });
    });

    describe('deleteRejected method ', () => {
        it('should call achDataService addDialog', () => {
            let achRejection = new AchTransaction();
            achRejection.AchId = 0;

            comp.deleteRejected(achRejection);
            expect(errorSpy.calls.any()).toBe(true);
        });
    });

});


