import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import any = jasmine.any;
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DaysOfTheWeekComponent } from './days-of-the-week.component';
import { WeekdayModel } from '../../../shared/models/week-day.model';
import { MockCentralCodesHolidayData } from '../../../tests/mocks/mock-central-codes-holiday-data';
import {CentralCodesDataService} from '../../../core/services/central-codes-data.service';
describe('DaysOfTheWeekComponent', () => {

    let comp: DaysOfTheWeekComponent;
    let fixture: ComponentFixture<DaysOfTheWeekComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [DaysOfTheWeekComponent],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(DaysOfTheWeekComponent, {
                set: {
                    providers: [
                        { provide: CentralCodesDataService, useClass: MockCentralCodesHolidayData }
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DaysOfTheWeekComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;
    });

    describe('daySelectedToggle method ',() => {
            it('when called with existing item, remove item from PayOnIndex',() => {

                comp.initializeDaysOfTheWeekModel();
                comp.daysOfTheWeek.PayOnIndex.push(1);
                comp.daysOfTheWeek.PayOnIndex.push(2);
                comp.daysOfTheWeek.PayOnIndex.push(3);

                comp.daySelectedToggle(2);
                expect(comp.daysOfTheWeek.PayOnIndex.length).toEqual(2);
            });

            it('when called with nonexisting item, add item to PayOnIndex',() => {;

                comp.initializeDaysOfTheWeekModel();
                comp.daysOfTheWeek.PayOnIndex.push(1);
                comp.daysOfTheWeek.PayOnIndex.push(2);
                comp.daysOfTheWeek.PayOnIndex.push(3);

                comp.daySelectedToggle(4);
                expect(comp.daysOfTheWeek.PayOnIndex.length).toEqual(4);
            });
        });

    describe('setDayOfTheWeek method ', () => {
            it('when called, ensure weekdaySelectionRequired = false',() => {                
                comp.initializeDaysOfTheWeekModel();

                comp.setDayOfTheWeek(4);
                expect(comp.weekdaySelectionRequired).toEqual(false);
            });
        });

    describe('hasErrors method ', () => {
            it('when called and objects not defined, return true',() => {
                comp.initializeDaysOfTheWeekModel();
                let testHasErrors: boolean = comp.hasErrors();

                expect(testHasErrors).toEqual(true);
                expect(comp.payOnIndexRequired).toEqual(true);
                expect(comp.weekdaySelectionRequired).toEqual(true);
            });

            it('when called and objects are defined, return true',() => {
                comp.initializeDaysOfTheWeekModel();
                comp.daysOfTheWeek.PayOnIndex.push(1);
                comp.daysOfTheWeek.PayOnWeekday = new WeekdayModel(2, "Tuesday");
                let testHasErrors: boolean = comp.hasErrors();

                expect(testHasErrors).toEqual(false);
                expect(comp.payOnIndexRequired).toBeUndefined();
                expect(comp.weekdaySelectionRequired).toBeUndefined();
            });
        });
});

//adding in a comment to get the merge to work. 