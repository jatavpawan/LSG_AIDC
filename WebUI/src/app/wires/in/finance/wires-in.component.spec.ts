import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { DialogService } from 'ng2-bootstrap-modal/index';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ConfirmModalComponent } from '../../../shared/modals/confirm-modal/confirm-modal.component';
import { SettingsService } from '../../../core/services/settings.service';

import { MockDialogService } from '../../../tests/mocks/mock-dialog-service';
import { GrowlerMediatorService } from '../../../core/services/mediators/growler-mediator.service';
import { MockGrowlerMediatorService } from '../../../tests/mocks/mock-growler-mediator-service';

import { WiresInComponent } from './wires-in.component';
import { WiresInDataService } from '../../../core/services/wires/wires-in-data.service';
import { MockWiresDataService } from '../../../tests/mocks/mock-wires-data.service';
import { WireInAssignmentModel } from '../../../shared/models/wires/wire-in-assignment.model';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { WireInModel } from '../../../shared/models/wires/wire-in.model';

describe('WiresInComponent', () => {

    let comp: WiresInComponent;
    let fixture: ComponentFixture<WiresInComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, FormsModule],
            declarations: [WiresInComponent, ConfirmModalComponent, DateFormatPipe],
            providers: [SettingsService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(WiresInComponent,
            {
                set: {
                    providers: [
                        { provide: DialogService, useClass: MockDialogService },
                        { provide: WiresInDataService, useClass: MockWiresDataService },
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
        fixture = TestBed.createComponent(WiresInComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('getWiresIn method ',
        () => {
            it('should call wiresDataService getWiresIn method', () => {
                let arrayReturn = new Array<WireInModel>();
                let wireInModel = new WireInModel();

                wireInModel.WireInId = 1;
                arrayReturn.push(wireInModel);

                spyOn(comp.wiresDataService, 'getWiresIn').and.returnValue(Observable.of(arrayReturn));
                comp.getWiresIn();

                expect(comp.wiresDataService.getWiresIn).toHaveBeenCalledTimes(1);
                expect(comp.wiresInList).toBeDefined();
            });
        });

    describe('ngOnInit method ',
        () => {
            it('should call getWiresIn method', () => {

                spyOn(comp, 'getWiresIn');
                comp.ngOnInit();

                expect(comp.getWiresIn).toHaveBeenCalledTimes(1);
            });
        });

    describe('insertWiresInAssignment method ',
        () => {
            it('should call wiresDataService insertWireInAssignment method', () => {

                spyOn(comp.wiresDataService, 'insertWireInAssignment').and.returnValue(Observable.of(1));
                spyOn(comp, 'getWiresIn');

                comp.insertWiresInAssignment(new WireInAssignmentModel());

                expect(comp.getWiresIn).toHaveBeenCalledTimes(1);
                expect(comp.wiresDataService.insertWireInAssignment).toHaveBeenCalledTimes(1);
            });
        });

    describe('openAssign method ',
        () => {
            it('should call dialogService addDialog method', () => {
                let wireInAssignment = new WireInAssignmentModel();
                wireInAssignment.WireInId = 1;

                spyOn(comp.dialogService, 'addDialog').and.returnValue(Observable.of(wireInAssignment));

                spyOn(comp, 'insertWiresInAssignment');

                comp.openAssign(new Object());

                expect(comp.dialogService.addDialog).toHaveBeenCalledTimes(1);
                expect(comp.insertWiresInAssignment).toHaveBeenCalledTimes(1);
            });
        });
});
