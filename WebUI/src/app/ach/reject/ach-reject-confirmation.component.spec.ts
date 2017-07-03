import { AchRejectConfirmationComponent } from './ach-reject-confirmation.component';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from "ng2-bootstrap-modal";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ConfirmModalComponent} from "../../shared/modals/confirm-modal/confirm-modal.component";
import {SettingsService} from "../../core/services/settings.service";

import {MockDialogService} from "../../tests/mocks/mock-dialog-service";
import {AchDataService} from "../../core/services/ach/ach-data.service";
import {MockAchDataService} from "../../tests/mocks/mock-ach-data.service";
import {GrowlerMediatorService} from "../../core/services/mediators/growler-mediator.service";
import {MockGrowlerMediatorService} from "../../tests/mocks/mock-growler-mediator-service";
import { AchTransaction } from "../../shared/models/ach/ach-transaction.model";
import { AchRejectConfirmationMediatorService } from '../../core/services/mediators/ach-reject-confirmation-mediator.service';
import { FormsModule } from '@angular/forms';
import {CentralCodesDataService} from '../../core/services/central-codes-data.service';
import { MockCentralCodesDataService } from './../../tests/mocks/mock-central-codes-data.service';
import {GenericDropDownModel} from '../../shared/models/generic-dropdown-model';
describe('AchRejectConfirmationComponent', () => {

    let comp: AchRejectConfirmationComponent;
    let fixture: ComponentFixture<AchRejectConfirmationComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let spy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [AchRejectConfirmationComponent, ConfirmModalComponent],
            providers: [SettingsService, AchRejectConfirmationMediatorService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(AchRejectConfirmationComponent, {
            set: {
                providers: [
                    { provide: DialogService, useClass: MockDialogService }
                    , { provide: AchDataService, useClass: MockAchDataService }
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: CentralCodesDataService, useClass: MockCentralCodesDataService }
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
        fixture = TestBed.createComponent(AchRejectConfirmationComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('getAchRejectionReasonCodes method ', () => {
        it('should call achDataService.getRejectReasonCodes() with reason codes', () => {            
            spyOn(comp.centralCodesDataService, 'getAchInRejectReasonCodes').and.returnValue(Observable.of(GenericDropDownModel));
            comp.achRejection = new AchTransaction();
            comp.achRejection.OlderThan24Hours = false;
            comp.achRejection.TransactionDirection = new GenericDropDownModel();
            comp.achRejection.TransactionDirection.Description = 'In';

            comp.getAchRejectionReasonCodes();

            expect(comp.centralCodesDataService.getAchInRejectReasonCodes).toHaveBeenCalled();

        });
    });

        describe('setIsNoteVisible method ', () => {
        it('otherNoteVisible should be true when other is being passed', () => {
            comp.achRejection = new AchTransaction();
            comp.achRejection.OlderThan24Hours = false;

            comp.achRejectionReasonCodes = [];
            let achRejectionReason = new GenericDropDownModel();
            achRejectionReason.Id = 1;
            achRejectionReason.Description = 'Other';
            comp.achRejectionReasonCodes.push(achRejectionReason);

            comp.achRejection.RejectionReasonId = 1;

            comp.setIsNoteVisible();

            expect(comp.otherNoteVisible).toBeTruthy();

        });
    });
});


