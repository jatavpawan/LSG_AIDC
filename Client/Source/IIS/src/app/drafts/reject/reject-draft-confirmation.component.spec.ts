import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from "ng2-bootstrap-modal";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConfirmModalComponent } from "../../shared/modals/confirm-modal/confirm-modal.component";
import { SettingsService } from "../../core/services/settings.service";

import { MockDialogService } from "../../tests/mocks/mock-dialog-service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { MockGrowlerMediatorService } from "../../tests/mocks/mock-growler-mediator-service";
import { FormsModule } from '@angular/forms';
import { DraftRejection } from '../../shared/models/drafts/draft-rejection.model';
import {CentralCodesDataService} from '../../core/services/central-codes-data.service';
import { MockCentralCodesDataService } from './../../tests/mocks/mock-central-codes-data.service';
import { RejectDraftConfirmationComponent } from './reject-draft-confirmation.component';
import {GenericDropDownModel} from '../../shared/models/generic-dropdown-model';
describe('RejectDraftConfirmationComponent', () => {

    let comp: RejectDraftConfirmationComponent;
    let fixture: ComponentFixture<RejectDraftConfirmationComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let spy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [RejectDraftConfirmationComponent, ConfirmModalComponent],
            providers: [SettingsService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(RejectDraftConfirmationComponent, {
            set: {
                providers: [
                    { provide: DialogService, useClass: MockDialogService }
                    , { provide: CentralCodesDataService, useClass: MockCentralCodesDataService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
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
        fixture = TestBed.createComponent(RejectDraftConfirmationComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        spy = spyOn(comp.dialogService, 'addDialog').and.returnValue(Observable.of(ConfirmModalComponent));
    });

    describe('initializeComponent method ', () => {
        it('should initialize the objects so that the objects not being undefined', () => {
            comp.draftRejectionReasonCodes = undefined;
            comp.initializeComponent();
            expect(comp.draftRejectionReasonCodes != undefined).toBeTruthy;
            expect(comp.draftRejection != undefined).toBeTruthy;            
            expect(comp.draftRejection.RejectReasonCode != undefined).toBeTruthy;   
            expect(comp.draftRejection.Description = '').toBeTruthy;               
        });
    });

    describe('getDraftRejectionReasonCodes method ', () => {
        it('should call centralCodesDataService.getRejectReasonCodes with reason codes', () => {
            comp.initializeComponent();
            comp.getDraftRejectionReasonCodes();

            expect(comp.draftRejectionReasonCodes.length).toEqual(2);
        });
    });

    describe('submit method ', () => {
       it('should call addDialog', () => {
           comp.draftRejection = new DraftRejection();
           comp.draftRejection.DraftId = 1;
           comp.submit();

           expect(spy.calls.any()).toBe(true, 'addDialog');
       });
    });

    describe('when call selectionChanged method ', () => {
       it('if Description is Other then the visibility of Other field should be true', () => {
            comp.initializeComponent();
           comp.draftRejection = new DraftRejection();
           comp.draftRejection.DraftId = 1;
           comp.draftRejection.RejectReasonCode = new GenericDropDownModel();
           comp.draftRejection.RejectReasonCode.Description = "Other";
           comp.selectionChanged();

           expect(comp.draftRejectionDescriptionVisible).toBe(true);
       });
    });

    describe('when call selectionChanged method ', () => {
       it('if Description is Not Other then the visibility of Other field should be false', () => {
            comp.initializeComponent();
           comp.draftRejection = new DraftRejection();
           comp.draftRejection.DraftId = 1;
           comp.draftRejection.RejectReasonCode = new GenericDropDownModel();
           comp.draftRejection.RejectReasonCode.Description = "insufficient funds";
           comp.selectionChanged();

           expect(comp.draftRejectionDescriptionVisible).toBe(false);
       });
    });
});