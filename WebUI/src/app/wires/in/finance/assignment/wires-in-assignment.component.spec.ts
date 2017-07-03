import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { DialogService } from 'ng2-bootstrap-modal';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConfirmModalComponent } from '../../../../shared/modals/confirm-modal/confirm-modal.component';
import { SettingsService } from '../../../../core/services/settings.service';

import { MockDialogService } from '../../../../tests/mocks/mock-dialog-service';
import { GrowlerMediatorService } from '../../../../core/services/mediators/growler-mediator.service';
import { MockGrowlerMediatorService } from '../../../../tests/mocks/mock-growler-mediator-service';

import { CentralCodesDataService } from '../../../../core/services/central-codes-data.service';
import { MockCentralCodesDataService } from '../../../../tests/mocks/mock-central-codes-data.service';
import { GenericDropDownModel } from '../../../../shared/models/generic-dropdown-model';
import { WiresInAssignmentComponent } from './wires-in-assignment.component';
import { WireInAssignmentModel } from '../../../../shared/models/wires/wire-in-assignment.model';
import { DateFormatPipe } from '../../../../shared/pipes/date-format.pipe';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { WireInModel } from '../../../../shared/models/wires/wire-in.model';

describe('WiresInAssignmentComponent', () => {

    let comp: WiresInAssignmentComponent;
    let fixture: ComponentFixture<WiresInAssignmentComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [WiresInAssignmentComponent, ConfirmModalComponent, DateFormatPipe, CurrencyFormatPipe],
            providers: [SettingsService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(WiresInAssignmentComponent,
            {
                set: {
                    providers: [
                        { provide: DialogService, useClass: MockDialogService },
                        { provide: CentralCodesDataService, useClass: MockCentralCodesDataService },
                        { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    ]
                }
            })
            .overrideModule(BrowserDynamicTestingModule,
            {
                set: {
                    entryComponents: [ConfirmModalComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WiresInAssignmentComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('initializeComponent method ', () => {
        it('should initialize the expected objects', () => {
            comp.wiresIn = new WireInModel();
            comp.wiresIn.WireInId = 1;

            comp.initializeComponent();

            expect(comp.wiresInAssignment).toBeDefined();
            expect(comp.wiresInAssignment.WireInId).toEqual(1);
            expect(comp.searchMode).toEqual('costcenter');
        });
    });

    describe('getCostCenter method ', () => {
        it('should call central codes data service get cost center method', () => {

            spyOn(comp.centralCodesDataService, 'getCostCenter').and.returnValue(Observable.of(new Array<GenericDropDownModel>()));

            comp.getCostCenterByQuery('test input');

            expect(comp.centralCodesDataService.getCostCenter).toHaveBeenCalledTimes(1);
        });
    });

    describe('getGlAccount method ', () => {
        it('should call central codes data service get gl account method', () => {

            spyOn(comp.centralCodesDataService, 'getGlAccount').and.returnValue(Observable.of(new Array<GenericDropDownModel>()));

            comp.getGlAccountByQuery('test input');

            expect(comp.centralCodesDataService.getGlAccount).toHaveBeenCalledTimes(1);
        });
    });

    describe('getTypeAhead method ', () => {
        it('should call appropriate search method given a decision input', () => {

            spyOn(comp, 'getGlAccountByQuery').and.returnValue(Observable.of(new Array<GenericDropDownModel>()));
            spyOn(comp, 'getCostCenterByQuery').and.returnValue(Observable.of(new Array<GenericDropDownModel>()));
            comp.searchMode = 'glaccount';

            comp.getTypeAheadData('test input');

            expect(comp.getGlAccountByQuery).toHaveBeenCalledTimes(1);
            expect(comp.getCostCenterByQuery).toHaveBeenCalledTimes(0);
        });
    });

    describe('getTypeAhead method ', () => {
        it('should call appropriate search method given a decision input', () => {

            spyOn(comp, 'getGlAccountByQuery').and.returnValue(Observable.of(new Array<GenericDropDownModel>()));
            spyOn(comp, 'getCostCenterByQuery').and.returnValue(Observable.of(new Array<GenericDropDownModel>()));

            comp.searchMode = 'costcenter';

            comp.getTypeAheadData('test input');

            expect(comp.getCostCenterByQuery).toHaveBeenCalledTimes(1);
            expect(comp.getGlAccountByQuery).toHaveBeenCalledTimes(0);
        });
    });

    describe('setSelectionId method ', () => {
        it('should set the GLAccoutnId if search mode is glaccount', () => {

            comp.wiresIn = new WireInModel();
            comp.wiresIn.WireInId = 1;

            comp.initializeComponent();

            comp.searchMode = 'glaccount';
            comp.searchSelection = new GenericDropDownModel();
            comp.searchSelection.Id = 1;

            comp.setSelectionId();

            expect(comp.wiresInAssignment.GLAccountId).toEqual(1);
            expect(comp.wiresInAssignment.OfficeId).toBeUndefined();
        });
    });

    describe('setSelectionId method ', () => {
        it('should set the OfficeId if search mode is costcenter', () => {
            comp.wiresIn = new WireInModel();
            comp.wiresIn.WireInId = 1;

            comp.initializeComponent();

            comp.searchMode = 'costcenter';
            comp.searchSelection = new GenericDropDownModel();
            comp.searchSelection.Id = 1;

            comp.setSelectionId();

            expect(comp.wiresInAssignment.GLAccountId).toBeUndefined();
            expect(comp.wiresInAssignment.OfficeId).toEqual(1);
        });
    });

    describe('confirm method ', () => {
        it('should set result and call close', () => {
            spyOn(comp, 'close');
            comp.wiresInAssignment = new WireInAssignmentModel();

            comp.confirm();
            expect(comp.close).toHaveBeenCalledTimes(1);
        });
    });
});