
import { AchRejectConfirmationComponent } from './ach-reject-confirmation.component';

import { AchRejectComponent } from './ach-reject.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { DialogService } from "ng2-bootstrap-modal";
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {SharedModule} from "../../shared/shared.module";
import {SettingsService} from "../../core/services/settings.service";
import {AchRejectConfirmationMediatorService} from
    "../../core/services/mediators/ach-reject-confirmation-mediator.service";
import {MockActivatedRoute} from "../../tests/mocks/mock-activated-route";
import {AchDataService} from "../../core/services/ach/ach-data.service";
import {MockAchDataService} from "../../tests/mocks/mock-ach-data.service";
import {MockDialogService} from "../../tests/mocks/mock-dialog-service";
import {GrowlerMediatorService} from "../../core/services/mediators/growler-mediator.service";
import {MockGrowlerMediatorService} from "../../tests/mocks/mock-growler-mediator-service";
import {CustomerService} from "../../core/services/customer.service";
import { MockCustomerService } from "../../tests/mocks/mock-customer.service";
import {CurrencyFormatPipe} from '../../shared/pipes/currency-format.pipe';
import {DateFormatPipe} from '../../shared/pipes/date-format.pipe';
import { FormsModule } from '@angular/forms';

describe('AchRejectComponent', () => {

    let comp: AchRejectComponent;
    let fixture: ComponentFixture<AchRejectComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;   
    let spy: any;
    let errorSpy: any;
    let successSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule],
            declarations: [AchRejectComponent, AchRejectConfirmationComponent, CurrencyFormatPipe, DateFormatPipe],
            providers: [DialogService, SettingsService, AchRejectConfirmationMediatorService],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideComponent(AchRejectComponent, {
            set: {
                providers: [
                    { provide: ActivatedRoute, useClass: MockActivatedRoute }
                    ,{ provide: AchDataService, useClass: MockAchDataService }
                    , { provide: DialogService, useClass: MockDialogService } 
                    , { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    , { provide: CustomerService, useClass: MockCustomerService }
                ]
            }
            })
            .overrideModule(BrowserDynamicTestingModule,
            {
                set: {
                    entryComponents: [AchRejectConfirmationComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AchRejectComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        spy = spyOn(comp.dialogService, 'addDialog')
            .and.returnValue(Observable.of(AchRejectConfirmationComponent));
             errorSpy = spyOn(comp.growlerMediatorService, 'growlError');
        successSpy = spyOn(comp.growlerMediatorService, 'growlSuccess');
    });

    describe('getRouteParams method ',() => {
        it('should call getRejectAchData when CustomerId is greater than 0',() => {
                comp.getRouteParams();

                expect (comp.customerId > 0).toBeTruthy();
                expect(comp.rejectAchData.length > 0).toBeTruthy();
                expect(comp.accountNumberMultiSelects.length > 0).toBeTruthy();
                expect(comp.amountMultiSelects.length > 0).toBeTruthy();
                expect(comp.companyNameMultiSelects.length > 0).toBeTruthy();
                
            });
    });
});


