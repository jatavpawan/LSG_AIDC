import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MonthlyComponent } from './monthly.component';
import { DaysOfTheWeekComponent } from '../daysoftheweek/days-of-the-week.component';
import { DaysOfTheWeek } from '../../../shared/models/days-of-the-week.model';
import { MockCentralCodesHolidayData } from '../../../tests/mocks/mock-central-codes-holiday-data';
import { CentralCodesDataService } from '../../../core/services/central-codes-data.service';

describe('MonthlyComponent',
    () => {

        let comp: MonthlyComponent;
        let fixture: ComponentFixture<MonthlyComponent>;
        let daysOfTheWeekComp: DaysOfTheWeekComponent;
        let daysOfTheWeekCompFixture: ComponentFixture<DaysOfTheWeekComponent>;
        let element: HTMLElement;
        let debugEl: DebugElement;
        let arbitraryDate: string = "05/01/2017";

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule],
                declarations: [MonthlyComponent, DaysOfTheWeekComponent],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .overrideComponent(MonthlyComponent,
                {
                    set: {
                        providers: [
                            { provide: CentralCodesDataService, useClass: MockCentralCodesHolidayData }
                        ]
                    }
                })
                .overrideComponent(DaysOfTheWeekComponent,
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
            fixture = TestBed.createComponent(MonthlyComponent);
            daysOfTheWeekCompFixture = TestBed.createComponent(DaysOfTheWeekComponent);
            comp = fixture.componentInstance;
            daysOfTheWeekComp = daysOfTheWeekCompFixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
            comp.minDate = new Date();
            comp.initializeObjects();

            //these are set for hasErrors tests
            comp.monthlySchedule.RecurBy = 'RecurByText';
            comp.monthlySchedule.CalendarDays = [1];
            comp.paymentInitiationRequired = false;
            comp.daysOfTheWeekComponent = undefined;
            comp.paymentInitiationMonthFieldRequired = true;
            comp.monthlySchedule.StartDate = arbitraryDate;
            comp.endFrequencyRequired = false;
            comp.monthlySchedule.EndPaymentsAfterNMonths = 10;
            comp.monthlySchedule.EndDate = arbitraryDate;
            comp.monthlySchedule.PayEveryMonth = undefined;
        });

        describe('recurChanged method ', () => {
            it('when called with string parameter, initialize properties of DaysOfTheWeek object', () => {
                let arbitraryString: string = "calendar days";

                comp.recurChanged(arbitraryString);

                expect(comp.monthlySchedule.DaysOfTheWeek).toBeDefined();
                expect(comp.monthlySchedule.CalendarDays).toEqual([]);
                expect(comp.monthlySchedule.PayOnIndex).toEqual([]);
                expect(comp.monthlySchedule.RecurBy).toEqual(arbitraryString);
                expect(comp.recurRequired).toEqual(false);

            });
        });

        describe('scheduleEndChanged method ', () => {
            it('when param equals "none", end date property validators are set', () => {
                let arbitraryEndType: string = "none";

                comp.scheduleEndChanged(arbitraryEndType);

                expect(comp.endDateOption).toEqual(arbitraryEndType);
                expect(comp.endFrequencyRequired).toEqual(false);

                expect(comp.endAfterNPaymentsRequired).toEqual(false);
                expect(comp.endOnDateRequired).toEqual(false);
                expect(comp.monthlySchedule.HasEndDate).toEqual(false);
                expect(comp.monthlySchedule.EndDate).toEqual(undefined);
                expect(comp.monthlySchedule.EndPaymentsAfterNMonths).toBeUndefined();
            });

            it('when param equals "endAfter", end date property validators are set', () => {
                let arbitraryEndType: string = "endAfter";

                comp.scheduleEndChanged(arbitraryEndType);

                expect(comp.endDateOption).toEqual(arbitraryEndType);
                expect(comp.endFrequencyRequired).toEqual(false);

                expect(comp.endOnDateRequired).toEqual(false);
                expect(comp.monthlySchedule.HasEndDate).toEqual(true);
                expect(comp.monthlySchedule.EndDate).toEqual(undefined);
            });

            it('when param equals "endOn", end date property validators are set', () => {
                let arbitraryEndType: string = "endOn";

                comp.scheduleEndChanged(arbitraryEndType);

                expect(comp.endDateOption).toEqual(arbitraryEndType);
                expect(comp.endFrequencyRequired).toEqual(false);

                expect(comp.endAfterNPaymentsRequired).toEqual(false);
                expect(comp.monthlySchedule.HasEndDate).toEqual(true);
                expect(comp.monthlySchedule.EndPaymentsAfterNMonths).toEqual(undefined);
            });
        });

        describe('startDateSelected method ', () => {
            it('when called with date parameter, sets start date property', () => {
                comp.startDateSelected(arbitraryDate);

                expect(comp.monthlySchedule.StartDate).toEqual(arbitraryDate);
                expect(comp.startDateRequired).toEqual(false);
            });
        });

        describe('endDateSelected method ', () => {
            it('when called with date parameter, sets start date property', () => {
                comp.endDateSelected(arbitraryDate);

                expect(comp.monthlySchedule.HasEndDate).toEqual(true);
                expect(comp.monthlySchedule.EndDate).toEqual(arbitraryDate);
                expect(comp.endOnDateRequired).toEqual(false);
            });
        });

        describe('numberSelected method ', () => {
            it('if number parameter exists in calendarDays, removes item', () => {
                comp.initializeObjects();

                let arbitraryNumber: number = 10;
                comp.monthlySchedule.CalendarDays = [];
                comp.monthlySchedule.CalendarDays.push(1);
                comp.monthlySchedule.CalendarDays.push(5);
                comp.monthlySchedule.CalendarDays.push(10);
                comp.monthlySchedule.CalendarDays.push(15);

                comp.numberSelected(arbitraryNumber);

                expect(comp.monthlySchedule.CalendarDays.length).toEqual(3);
            });

            it('if number parameter does not exist in calendarDays, pushes item to array', () => {
                comp.initializeObjects();

                let arbitraryNumber: number = 11;
                comp.monthlySchedule.CalendarDays = [];
                comp.monthlySchedule.CalendarDays.push(1);
                comp.monthlySchedule.CalendarDays.push(5);
                comp.monthlySchedule.CalendarDays.push(10);
                comp.monthlySchedule.CalendarDays.push(15);

                comp.numberSelected(arbitraryNumber);

                expect(comp.monthlySchedule.CalendarDays.length).toEqual(5);
            });

            it('if RecurBy is "calendarDays" and CalendarDays is not empty, sets numberPickerRequired to false', () => {
                let arbitraryNumber: number = 11;
                comp.monthlySchedule.RecurBy = "calendarDay";
                comp.numberSelected(arbitraryNumber);

                expect(comp.numberPickerRequired).toEqual(false);
            });
        });

        describe('setMonthlyRecurrence method ', () => {
            it('if param is "monthly", sets monthly payment properties', () => {
                let arbitraryRecurrence: string = "monthly";

                comp.setMonthlyRecurrence(arbitraryRecurrence);

                expect(comp.monthlySchedule.PayEveryMonth).toEqual(true);
                expect(comp.monthlySchedule.PayEveryNMonths).toBeUndefined();
                expect(comp.paymentInitiationRequired).toEqual(false);
            });

            it('if param is not "monthly", sets monthly payment properties', () => {
                let arbitraryRecurrence: string = "not monthly";

                comp.setMonthlyRecurrence(arbitraryRecurrence);

                expect(comp.monthlySchedule.PayEveryMonth).toEqual(false);
                expect(comp.paymentInitiationRequired).toEqual(false);
            });
        });

        describe('getComponentModelData method ', () => {
            it('if daysOfTheWeekComponent is defined & RecurBy = "daysofWeek, calls getComponentModelData from DaysOfTheWeekComponent', () => {
                comp.daysOfTheWeekComponent = daysOfTheWeekComp;
                comp.monthlySchedule.RecurBy = 'daysOfWeek';

                spyOn(comp.daysOfTheWeekComponent, 'getComponentModelData').and.returnValue(new DaysOfTheWeek());

                comp.getComponentModelData();

                expect(comp.monthlySchedule.DaysOfTheWeek).toBeDefined();
                expect(comp.daysOfTheWeekComponent.getComponentModelData).toHaveBeenCalledTimes(1);
            });
        });

        describe('setEndPaymentsFieldDirty method ', () => {
            it('when called, set paymentInitiationMonthFieldRequired to false', () => {
                comp.setEndPaymentsFieldDirty();

                expect(comp.paymentInitiationMonthFieldRequired).toEqual(false);
            });
        });

        describe('setEndPaymentsAfterNMonthsDirty method ', () => {
            it('when called, set endAfterNPaymentsRequired to false', () => {
                comp.setEndPaymentsAfterNMonthsDirty();

                expect(comp.endAfterNPaymentsRequired).toEqual(false);
            });
        });

        describe('hasErrors method ', () => {
            it('when RecurBy is "calendarDay" and CalendarDays is empty, set numberPickerRequired to and return true', () => {
                comp.monthlySchedule.RecurBy = 'calendarDay';
                comp.monthlySchedule.CalendarDays = [];

                let errors: boolean = comp.hasErrors();

                expect(comp.numberPickerRequired).toEqual(true);
                expect(errors).toEqual(true);
            });

            it('when RecurBy is undefined, set recurRequired to and return true', () => {
                comp.monthlySchedule.RecurBy = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.recurRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when paymentInitiationRequired is not equal to false, set paymentInitiationRequired to and return true', () => {
                comp.paymentInitiationRequired = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.paymentInitiationRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when daysOfTheWeekComponent is not undefined, call child component has errors method', () => {
                comp.daysOfTheWeekComponent = daysOfTheWeekComp;
                spyOn(comp.daysOfTheWeekComponent, 'hasErrors').and.returnValue(true);
                let errors: boolean = comp.hasErrors();

                expect(comp.daysOfTheWeekComponent.hasErrors).toHaveBeenCalledTimes(1);
                expect(errors).toEqual(true);
            });
            it('when paymentInitiationMonthFieldRequired is not equal to false or undefined, set hasErrors to and return true', () => {
                comp.paymentInitiationMonthFieldRequired = true;

                let errors: boolean = comp.hasErrors();

                expect(errors).toEqual(true);
            });
            it('when monthlySchedule.StartDate is undefined or monthlySchedule.StartDate is empty, set startDateRequired and has errors to and return true', () => {
                comp.monthlySchedule.StartDate = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.startDateRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when endFrequencyRequired is not equal to false, set endFrequencyRequired and has errors to and return true', () => {
                comp.endFrequencyRequired = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.endFrequencyRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when endDateOption is endAfter and monthlySchedule.EndPaymentsAfterNMonths is undefined, set endAfterNPaymentsRequired to and return true', () => {
                comp.endAfterNPaymentsRequired = false;
                comp.endDateOption = 'endAfter';
                comp.monthlySchedule.EndPaymentsAfterNMonths = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.endAfterNPaymentsRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when endDateOption is endAfter and monthlySchedule.EndPaymentsAfterNMonths is undefined, set endAfterNPaymentsRequired to and return true', () => {
                comp.endAfterNPaymentsRequired = false;
                comp.endDateOption = 'endAfter';
                comp.monthlySchedule.EndPaymentsAfterNMonths = 0;

                let errors: boolean = comp.hasErrors();

                expect(comp.endAfterNPaymentsRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when endDateOption is endOn and monthlySchedule.EndDate is undefined or monthlySchedule.EndDate is empty, set endOnDateRequired to and return true', () => {
                comp.endOnDateRequired = false;
                comp.endDateOption = 'endOn';
                comp.monthlySchedule.EndDate = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.endOnDateRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when endDateOption is endOn and monthlySchedule.EndDate is undefined or monthlySchedule.EndDate is empty, set endOnDateRequired to and return true', () => {
                comp.endOnDateRequired = false;
                comp.endDateOption = 'endOn';
                comp.monthlySchedule.EndDate = "   ";

                let errors: boolean = comp.hasErrors();

                expect(comp.endOnDateRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
            it('when monthlySchedule.PayEveryMonth is not undefined and monthlySchedule.PayEveryMonth is false and monthlySchedule.PayEveryNMonths is not undefined or false, set paymentInitiationMonthFieldRequired to and return true', () => {
                comp.paymentInitiationMonthFieldRequired = false;
                comp.monthlySchedule.PayEveryMonth = false;
                comp.monthlySchedule.PayEveryNMonths = undefined;

                let errors: boolean = comp.hasErrors();

                expect(comp.paymentInitiationMonthFieldRequired).toEqual(true);
                expect(errors).toEqual(true);
            });
        });

    });