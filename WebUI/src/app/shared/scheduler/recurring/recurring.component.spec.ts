import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RecurringComponent } from './recurring.component';
import { WeeklyComponent } from '../weekly/weekly.component';
import { MonthlyComponent } from '../monthly/monthly.component';

import { WeeklySchedule } from '../../../shared/models/weekly-schedule.model';
import { MonthlySchedule } from "../../../shared/models/monthly-schedule.model";

describe('RecurringComponent',() => {

        let comp: RecurringComponent;
        let fixture: ComponentFixture<RecurringComponent>;
        let element: HTMLElement;
        let debugEl: DebugElement;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [],
                declarations: [RecurringComponent, MonthlyComponent, WeeklyComponent],
                providers: [],
                schemas: [NO_ERRORS_SCHEMA]
            })
                .overrideComponent(RecurringComponent,
                {
                    set: {
                        providers: [
                        ]
                    }
                })
                .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RecurringComponent);
            comp = fixture.componentInstance;
            debugEl = fixture.debugElement;
            element = fixture.nativeElement;
            comp.monthlyComponent = new MonthlyComponent(null);
            comp.weeklyComponent = new WeeklyComponent(null);
            spyOn(comp.monthlyComponent, 'getComponentModelData').and.returnValue(new MonthlySchedule());
            spyOn(comp.weeklyComponent, 'getComponentModelData').and.returnValue(new WeeklySchedule());
        });

        describe('frequencyChanged method ',() => {
                it('when called, re-initialize recurringSchedule.MonthlySchedule, recurringSchedule.WeeklySchedule, and recurringSchedule.Frequency',() => {

                        let arbitraryFrequency: string = "test frequency";

                        comp.initializeObjects();

                        comp.frequencyChanged(arbitraryFrequency);

                        expect(comp.recurringSchedule.MonthlySchedule).toBeDefined();
                        expect(comp.recurringSchedule.WeeklySchedule).toBeDefined();
                        expect(comp.recurringSchedule.Frequency).toEqual(arbitraryFrequency);
                    });
            });

        describe('getComponentModelData method ',() => {
                it('when called, if recurringSchedule.Frequency is monthly, call this.monthlyComponent.getComponentModelData',() => {

                        comp.initializeObjects();
                        comp.recurringSchedule.Frequency = 'monthly';

                        comp.getComponentModelData();

                        expect(comp.monthlyComponent.getComponentModelData).toHaveBeenCalledTimes(1);
                        expect(comp.weeklyComponent.getComponentModelData).toHaveBeenCalledTimes(0);
                    });

                it('when called, if recurringSchedule.Frequency is weekly, call this.weeklyComponent.getComponentModelData',() => {

                        comp.initializeObjects();
                        comp.recurringSchedule.Frequency = 'weekly';

                        comp.getComponentModelData();

                        expect(comp.monthlyComponent.getComponentModelData).toHaveBeenCalledTimes(0);
                        expect(comp.weeklyComponent.getComponentModelData).toHaveBeenCalledTimes(1);
                    });
            });

        describe('hasErrors method ',() => {
                it('when called and child objects are defined, and child object has errors, parent hasErrors is true', () => {
                    comp.initializeObjects();

                    comp.monthlyComponent = new MonthlyComponent(null);

                    spyOn(comp.monthlyComponent, 'hasErrors').and.returnValue(true);

                    let testHasErrors: boolean = comp.hasErrors();

                    expect(testHasErrors).toEqual(true);
                });
                it('when called and child objects are defined, and child object has errors, parent hasErrors is true', () => {
                    comp.initializeObjects();

                    comp.weeklyComponent = new WeeklyComponent(null);
                    comp.monthlyComponent = undefined;

                    spyOn(comp.weeklyComponent, 'hasErrors').and.returnValue(true);

                    let testHasErrors: boolean = comp.hasErrors();

                    expect(testHasErrors).toEqual(true);
                });
                it('when called and child objects are defined, and child object does not have errors, parent hasErrors is false', () => {
                    comp.initializeObjects();

                    comp.monthlyComponent = new MonthlyComponent(null);

                    spyOn(comp.monthlyComponent, 'hasErrors').and.returnValue(false);

                    let testHasErrors: boolean = comp.hasErrors();

                    expect(testHasErrors).toEqual(false);
                });
                it('when called and child objects are defined, and child object does not have errors, parent hasErrors is false', () => {
                    comp.initializeObjects();

                    comp.weeklyComponent = new WeeklyComponent(null);
                    comp.monthlyComponent = undefined;

                    spyOn(comp.weeklyComponent, 'hasErrors').and.returnValue(false);

                    let testHasErrors: boolean = comp.hasErrors();

                    expect(testHasErrors).toEqual(false);
                });
            });
});

// adding in a comment to get merge to work.