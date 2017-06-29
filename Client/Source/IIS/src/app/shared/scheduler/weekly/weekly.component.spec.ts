import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { WeeklyComponent } from './weekly.component';
import { WeekdayModel } from '../../../shared/models/week-day.model';
import { MockCentralCodesHolidayData } from '../../../tests/mocks/mock-central-codes-holiday-data';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';

describe('WeeklyComponent',() => {

        let comp: WeeklyComponent;
        let fixture: ComponentFixture<WeeklyComponent>;
        let element: HTMLElement;
        let debugEl: DebugElement;
        let arbitraryDateString: string = '05/01/2017';

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [],
                declarations: [WeeklyComponent],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .overrideComponent(WeeklyComponent,
                {
                    set: {
                        providers: [
                            { provide: CentralCodesDataService, useClass: MockCentralCodesHolidayData }
                        ]
                    }
                })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WeeklyComponent);
            comp = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;

            comp.minDate = new Date();
            //these are set for hasErrors tests
            comp.initializeObjects();
            comp.paymentInitiationRequired = false;
            comp.weeklySchedule.RecurBy = [];
            comp.weeklySchedule.StartDate = arbitraryDateString;
            comp.endFrequencyRequired = false;
            comp.endPaymentsAfterNWeeksRequired = false;
            comp.endDateOption = "endOn";
            comp.weeklySchedule.EndDate = arbitraryDateString;
            comp.weeklySchedule.PayEveryWeek = true;
            comp.weeklySchedule.PayEveryNWeeks = undefined;
        });

        describe('initializeObjects method ',() => {
                it('when called, objects are initialized',() => {
                        comp.initializeObjects();
                        expect(comp.weeklySchedule).toBeDefined();
                        expect(comp.weeklySchedule.RecurBy).toBeDefined();
                    });
            });

        describe('daySelectedToggle method ',() => {
                it('when called with existing item, item should be removed',() => {

                        comp.initializeObjects();
                        comp.initializeProcessingDateService([]);

                        comp.weeklySchedule.RecurBy.push(new WeekdayModel(1, "Monday"));
                        comp.weeklySchedule.RecurBy.push(new WeekdayModel(2, "Tuesday"));                        
                        comp.weeklySchedule.RecurBy.push(new WeekdayModel(3, "Wednesday"));    
                        
                        comp.daySelectedToggle(2);

                        expect(comp.weeklySchedule.RecurBy.length).toEqual(2);
                    });

                it('when called with nonexisting item, item should be added',() => {
                        fixture = TestBed.createComponent(WeeklyComponent);
                        comp = fixture.componentInstance;
                        comp.minDate = new Date();

                        comp.initializeObjects();

                        comp.weeklySchedule.RecurBy.push(new WeekdayModel(1, "Monday"));
                        comp.weeklySchedule.RecurBy.push(new WeekdayModel(2, "Tuesday"));
                        comp.weeklySchedule.RecurBy.push(new WeekdayModel(3, "Wednesday"));

                        comp.daySelectedToggle(4);

                        expect(comp.weeklySchedule.RecurBy.length).toEqual(4);
                    });
            });

        describe('startDateSelected method ',() => {
                it('when called, startDate is set to false and startDate is set to given parameter',() => {
                        comp.initializeObjects();

                        comp.startDateSelected(arbitraryDateString);

                        expect(comp.startDateRequired).toEqual(false);
                        expect(comp.weeklySchedule.StartDate).toEqual(arbitraryDateString);
                    });
            });

        describe('endDateSelected method ',() => {
                it('when called, startDate is set to false and startDate is set to given parameter',() => {
                        comp.initializeObjects();

                        comp.endDateSelected(arbitraryDateString);

                        expect(comp.endOnDateRequired).toEqual(false);
                        expect(comp.weeklySchedule.HasEndDate).toEqual(true);
                        expect(comp.weeklySchedule.EndDate).toEqual(arbitraryDateString);
                    });
            });

        describe('scheduleEndChanged method ',() => {
                it('when scheduleEnd is none, validate fields are set correctly',() => {
                        comp.initializeObjects();

                        let scheduleEnd: string = "none";
                        comp.scheduleEndChanged(scheduleEnd);

                        expect(comp.endPaymentsAfterNWeeksRequired).toEqual(false);
                        expect(comp.endOnDateRequired).toEqual(false);
                        expect(comp.weeklySchedule.HasEndDate).toEqual(false);
                        expect(comp.weeklySchedule.EndDate).toBeUndefined();
                        expect(comp.weeklySchedule.EndPaymentsAfterNWeeks).toBeUndefined();
                    });

                it('when scheduleEnd is endAfter, validate fields are set correctly',() => {
                        comp.initializeObjects();

                        let scheduleEnd: string = "endAfter";
                        comp.scheduleEndChanged(scheduleEnd);

                        expect(comp.endOnDateRequired).toEqual(false);
                        expect(comp.weeklySchedule.HasEndDate).toEqual(true);
                        expect(comp.weeklySchedule.EndDate).toBeUndefined();
                    });

                it('when scheduleEnd is endOn, validate fields are set correctly',() => {
                        comp.initializeObjects();

                        let scheduleEnd: string = "endOn";
                        comp.scheduleEndChanged(scheduleEnd);

                        expect(comp.endPaymentsAfterNWeeksRequired).toEqual(false);
                        expect(comp.weeklySchedule.HasEndDate).toEqual(true);
                        expect(comp.weeklySchedule.EndPaymentsAfterNWeeks).toBeUndefined();
                    });
            });

        describe('setPayEveryWeek method ',() => {
                it('when called and frequency is weekly, payEveryWeek and PayEveryNWeeks are modified',() => {
                        comp.initializeObjects();

                        let frequencyString: string = "weekly";
                        comp.setPayEveryWeek(frequencyString);

                        expect(comp.weeklySchedule.PayEveryWeek).toEqual(true);
                        expect(comp.weeklySchedule.PayEveryNWeeks).toBeUndefined();
                        expect(comp.paymentInitiationRequired).toEqual(false);
                    });

                it('when called and frequency is not weekly, payEveryWeek is modified',() => {
                        comp.initializeObjects();

                        let frequencyString: string = "monthly";
                        comp.setPayEveryWeek(frequencyString);

                        expect(comp.weeklySchedule.PayEveryWeek).toEqual(false);
                        expect(comp.paymentInitiationRequired).toEqual(false);
                    });
            });

        describe('setEndPaymentsFieldDirty method ',() => {
                it('when called, paymentInitiationWeekFieldRequired is set to false ',() => {
                        comp.initializeObjects();

                        comp.setEndPaymentsFieldDirty();

                        expect(comp.paymentInitiationWeekFieldRequired).toEqual(false);
                    });
            });

        describe('setEndPaymentsAfterNWeeksDirty method ',() => {
                it('when called, endAfterNPaymentsRequired is set to false ',() => {
                        comp.initializeObjects();

                        comp.setEndPaymentsAfterNWeeksDirty();

                        expect(comp.endPaymentsAfterNWeeksRequired).toEqual(false);
                    });
            });


        describe('hasErrors method ',() => {
                it('if paymentInitiationRequired != false, return true',() => {
                        comp.initializeObjects();
                        comp.paymentInitiationRequired = true;

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if weeklySchedule.RecurBy is undefined, return true',() => {
                        comp.initializeObjects();
                                                
                        comp.weeklySchedule.RecurBy = undefined;

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if weeklySchedule.RecurBy is empty, return true',() => {
                        comp.initializeObjects();
                                                
                        comp.weeklySchedule.RecurBy = [];

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if weeklySchedule.StartDate is undefined, return true',() => {
                        comp.initializeObjects();

                        comp.weeklySchedule.StartDate = undefined;

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if weeklySchedule.StartDate is an empty string, return true',() => {
                        comp.initializeObjects();

                        comp.weeklySchedule.StartDate = "";

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if weeklySchedule.StartDate is defined and not empty, set startDateRequired',() => {
                        comp.initializeObjects();

                        comp.weeklySchedule.StartDate = arbitraryDateString;

                        comp.hasErrors();

                        expect(comp.startDateRequired).toEqual(false);
                    });

                it('if endFrequencyRequired is not false, set endFrequencyRequired to and return true',() => {
                        comp.initializeObjects();

                        comp.endFrequencyRequired = true;

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if endPaymentsAfterNWeeksRequired is not false, return true',() => {
                        comp.initializeObjects();
                        
                        comp.endPaymentsAfterNWeeksRequired = true;

                        let errors: boolean = comp.hasErrors();

                        expect(errors).toEqual(true);
                    });

                it('if endDateOption is "endAfter" and EndPaymentsAfterNWeeks is defined, set endAfterNPaymentsRequired to and return true',() => {
                        comp.initializeObjects();

                        comp.endDateOption = "endAfter";
                        comp.weeklySchedule.EndPaymentsAfterNWeeks = undefined;

                        let errors: boolean = comp.hasErrors();

                        expect(comp.endPaymentsAfterNWeeksRequired).toEqual(true);
                        expect(errors).toEqual(true);
                    });

                it('if endDateOption is "endon" and endDate is undefined, set endOnDateRequired to and return true',() => {
                        comp.initializeObjects();

                        comp.endDateOption = "endOn";
                        comp.weeklySchedule.EndDate = undefined;

                        let errors: boolean = comp.hasErrors();

                        expect(comp.endOnDateRequired).toEqual(true);
                        expect(errors).toEqual(true);
                    });

                it('if endDateOption is "endon" and endDate is an empty string, set endOnDateRequired to and return true',() => {
                        comp.initializeObjects();

                        comp.endDateOption = "endOn";
                        comp.weeklySchedule.EndDate = "";

                        let errors: boolean = comp.hasErrors();

                        expect(comp.endOnDateRequired).toEqual(true);
                        expect(errors).toEqual(true);
                    });

                it('if PayEveryWeek is defined and not false and PayEveryNWeeks is undefined, set paymentInitiationWeekFieldRequired to and return true',() => {
                        comp.initializeObjects();

                        comp.weeklySchedule.PayEveryWeek = false;
                        comp.weeklySchedule.PayEveryNWeeks = undefined;

                        let errors: boolean = comp.hasErrors();

                        expect(comp.paymentInitiationWeekFieldRequired).toEqual(true);
                        expect(errors).toEqual(true);
                    });
            });

});
//adding in a comment to get merge to work.