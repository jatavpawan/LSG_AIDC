import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogService } from "ng2-bootstrap-modal";
import * as moment from 'moment';

import any = jasmine.any;
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RecurringComponent } from './recurring/recurring.component';
import { RecurringSchedule } from '../../shared/models/recurring-schedule.model';
import { SchedulerComponent } from './scheduler.component';
import { MockDialogServiceSchedulerContainer } from '../../tests/mocks/mock-dialog-service';
import { MockCentralCodesHolidayData } from '../../tests/mocks/mock-central-codes-holiday-data';
import { Observable } from "rxjs/Observable";
import { SchedulerContainer } from "../models/scheduler-container.model";
import { ProcessingDateService } from "../../core/services/processing-date.service";
import { ProcessingDatesDataService } from "../../core/services/processing-dates-data.service";
import { MockProcessingDatesDataService } from "../../tests/mocks/mock-processing-dates-data.service";
import { GrowlerMediatorService } from "../../core/services/mediators/growler-mediator.service";
import { MockGrowlerMediatorService } from "../../tests/mocks/mock-growler-mediator-service";
import { CentralCodesDataService } from '../../core/services/central-codes-data.service';

describe('SchedulerComponent', () => {

    let comp: SchedulerComponent;
    let fixture: ComponentFixture<SchedulerComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;
    let arbitraryDate: string = "05/01/2017";

    let closeSpy: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [SchedulerComponent, RecurringComponent],
            providers: [DialogService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(SchedulerComponent,
            {
                set: {
                    providers: [
                        { provide: DialogService, useClass: MockDialogServiceSchedulerContainer },
                        { provide: CentralCodesDataService, useClass: MockCentralCodesHolidayData },
                        { provide: ProcessingDatesDataService, useClass: MockProcessingDatesDataService },
                        { provide: GrowlerMediatorService, useClass: MockGrowlerMediatorService }
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SchedulerComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
        closeSpy = spyOn(comp, 'close');
        comp.recurringComponent = new RecurringComponent();
        comp.minDate = new Date();
        spyOn(comp.recurringComponent, 'getComponentModelData').and.returnValue(new RecurringSchedule());
        spyOn(comp.processingDatesDataService, 'getProcessingDates').and.returnValue(Observable.of(['date1', 'date2', 'date3']));
    });

    describe('frequencyChanged method ', () => {
        it('when called, re-initialize schedulerContainer.RecurringSchedule, schedulerContainer.OneTimePaymentDate, and schedulerContainer.Frequency', () => {

            let arbitraryFrequency: string = "test frequency";

            comp.initializeObjects();

            comp.frequencyChanged(arbitraryFrequency);

            expect(comp.schedulerContainer.RecurringSchedule).toBeDefined();
            expect(comp.schedulerContainer.OneTimePaymentDate).toBeUndefined();
            expect(comp.schedulerContainer.Frequency).toEqual(arbitraryFrequency);
        });
    });

    describe('confirm method ', () => {
        it('when called, result is set to schedulerContainer and this.Close() is called.', () => {

            comp.initializeObjects();

            comp.confirm();

            expect(comp.result).toBeDefined();
            expect(closeSpy.calls.any()).toBe(true, 'close');
        });
    });

    describe('cancel method ', () => {
        it('when called, this.Close() is called.', () => {

            comp.initializeObjects();

            comp.cancel();

            expect(closeSpy.calls.any()).toBe(true, 'close');
        });
    });

    describe('dateSelected method ', () => {
        it('when called with date parameter, OneTimePaymentDate = parameter date and oneTimePaymentDateRequired = false', () => {
            const futureArbitraryDate = '06/01/2018'

            comp.initializeObjects();

            comp.dateSelected(futureArbitraryDate);

            expect(comp.schedulerContainer.OneTimePaymentDate).toEqual(futureArbitraryDate);
            expect(comp.oneTimePaymentDateRequired).toEqual(false);
        });
    });

    describe('hasErrors method ', () => {
        it('when called and frequency is once and onetimepaymentdate is undefined then onetimepymentdaterequired is set to and returns true', () => {

            comp.initializeObjects();

            comp.schedulerContainer.Frequency = "once";
            comp.schedulerContainer.OneTimePaymentDate = undefined;
            comp.hasErrors();

            expect(comp.errors).toEqual(true);
            expect(comp.oneTimePaymentDateRequired).toEqual(true);
        });
        it('when called and frequency is once and onetimepaymentdate is not undefined then onetimepymentdaterequired is set to and returns true', () => {

            comp.initializeObjects();

            comp.schedulerContainer.Frequency = "once";
            comp.schedulerContainer.OneTimePaymentDate = arbitraryDate;
            comp.hasErrors();

            expect(comp.errors).toEqual(false);
            expect(comp.oneTimePaymentDateRequired).toBeFalsy();
        });
    });

    describe('save method ', () => {
        it('when called and this.recurringComponent is defined and this.recurringComponent does not have errors, then set this.schedulerContainer.RecurringSchedule = this.recurringComponent.getComponentModelData()', () => {
            
            spyOn(comp.recurringComponent, 'hasErrors').and.returnValue(false);

            comp.initializeObjects();
            comp.processingDateService = new ProcessingDateService(<any> 'we dont care');
            spyOn(comp.processingDateService, 'formatProcessingDates').and.returnValue(new SchedulerContainer());

            comp.save();

            expect(comp.recurringComponent.getComponentModelData).toHaveBeenCalledTimes(1);
        });

        it('gets processing dates from ProcessingDatesDataService', () => {
            const expected = new SchedulerContainer();

            comp.initializeObjects();
            comp.processingDateService = new ProcessingDateService(<any> 'we dont care');
            spyOn(comp.processingDateService, 'formatProcessingDates').and.returnValue(expected);

            comp.save();

            expect(comp.schedulerContainer).toBe(expected);
        });
    });

    describe('isDisplayable method ', () => {
        it('when frequency is "once" and verbalAchReceived is true, then return true',
            () => {

                comp.verbalAchReceived = true;

                let result: boolean = comp.isDisplayable('once');

                expect(result).toBeTruthy();
            });
    });

    describe('isDisplayable method ', () => {
        it('when frequency is "once" and verbalAchReceived is false and prepaymentRestriction is 0, then return true',
            () => {

                comp.verbalAchReceived = false;
                comp.prepaymentRestriction = '0';

                let result: boolean = comp.isDisplayable('once');

                expect(result).toBeTruthy();
            });
    });
    describe('isDisplayable method ', () => {
        it('when frequency is "once" and verbalAchReceived is false and prepaymentRestriction is 0, then return true', () => {

            comp.verbalAchReceived = false;
            comp.prepaymentRestriction = '0';

            let result: boolean = comp.isDisplayable('once');

            expect(result).toBeTruthy();
        });
    });
    describe('isDisplayable method ', () => {
        it('when frequency is "recurring" and verbalAchReceived is false and prepaymentRestriction is 0, then return false', () => {

            comp.verbalAchReceived = true;
            comp.prepaymentRestriction = '0';

            let result: boolean = comp.isDisplayable('recurring');

            expect(result).toBeFalsy();
        });
    });
    describe('isDisplayable method ', () => {
        it('when frequency is "recurring" and verbalAchReceived is false and prepaymentRestriction is 1, then return false', () => {

            comp.prepaymentRestriction = '1';

            let result: boolean = comp.isDisplayable('recurring');

            expect(result).toBeTruthy();
        });
    });
});