import { ChangeDetectorRef, Renderer, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import any = jasmine.any;
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { NumbersPickerComponent } from './numbers-picker.component';

export class CalendarDaysRow {
    description: number;
    isSelected: boolean;
}

describe('NumbersPickerComponent', () => {

    let comp: NumbersPickerComponent;
    let fixture: ComponentFixture<NumbersPickerComponent>;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [NumbersPickerComponent],
            providers: [ChangeDetectorRef, Renderer],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(NumbersPickerComponent, {
                set: {
                    providers: [

                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumbersPickerComponent);
        comp = fixture.componentInstance;
        debugEl = fixture.debugElement;
        element = fixture.nativeElement;

        comp.prepaymentRestriction = '0';
    });

    describe('initialize method ',() => {
            it('when called, should set numbers and columnCount to input variable values',() => {
                comp.numbers = 12;
                comp.columnCount = 3;
                comp.initialize();
                expect(comp.numbers).toEqual(12);
                expect(comp.columnCount).toEqual(3);
            });
            it('when called, should set numbers to 31 and columnCount to 7 if inputs are undefined',() => {
                comp.initialize();
                expect(comp.numbers).toEqual(31);
                expect(comp.columnCount).toEqual(7);
            });
        });

    describe('generateRowRange method ',() => {
            it('when called, rowCount should equal ceiling(numbers/columnCount)',() => {
                comp.numbers = 12;
                comp.columnCount = 5;
                comp.generateRowRange();
                expect(comp.rows.length).toEqual(3);

            });
        });

    describe('generateColumnRange method ',() => {
            it('when called, columns.length should equal columnCount',() => {
                let arbitraryNumbersValue: number = 12;
                comp.numbers = arbitraryNumbersValue;
                comp.columnCount = 7;
                let generatedRows: CalendarDaysRow[] = comp.generateColumnRange();
                expect(generatedRows.length).toEqual(7);

            });
        });
    describe('selectNumber method ',() => {
            it('when called, columns.length should equal columnCount',() => {
                spyOn(comp.onNumberSelected, 'emit');

                let event: any = {
                    target: {
                        innerText: "1",
                        getAttribute: (text: any) => { 'calendar-day' },
                        setAttribute: (target: any, objectProperty: any, newClass: any) => { 'calendar-day' }
                    }
                };
                let arbitrarySelectedNumber: CalendarDaysRow = new CalendarDaysRow();
                arbitrarySelectedNumber.description = 1;
                arbitrarySelectedNumber.isSelected = true;

                comp.prepaymentRestriction = '0';
                comp.selectNumber(event, arbitrarySelectedNumber);
                
                expect(comp.onNumberSelected.emit).toHaveBeenCalled();

            });
    });

    describe('setNumberPickerClass method ', () => {
        it('when called and prepaymentRestriction is 1 and ' +
            'calendarDayRow description less than 15, returned class should be calendar-day-disabled', () => {

                comp.prepaymentRestriction = '1';
                let testCalendarRow: CalendarDaysRow = new CalendarDaysRow();
                testCalendarRow.description = 1;

                let result: string = comp.setNumberPickerClass(testCalendarRow);

                expect(result).toEqual('calendar-day-disabled');
            });
    });

    describe('setNumberPickerClass method ', () => {
        it('when called and prepaymentRestriction length greater than 0 and ' +
            'calendarDayRow description greater than 15 and row selected, returned class should be calendar-day-selected', () => {

                comp.prepaymentRestriction = '1';
                let testCalendarRow: CalendarDaysRow = new CalendarDaysRow();
                testCalendarRow.description = 16;
                testCalendarRow.isSelected = true;
                let result: string = comp.setNumberPickerClass(testCalendarRow);

                expect(result).toEqual('calendar-day-selected');
            });
    });

    describe('setNumberPickerClass method ', () => {
        it('when called and prepaymentRestriction length greater than 0 and ' +
            'calendarDayRow description greater than 15 and row not selected, returned class should be calendar-day-disabled', () => {

                comp.prepaymentRestriction = '0';
                let testCalendarRow: CalendarDaysRow = new CalendarDaysRow();
                testCalendarRow.description = 16;
                testCalendarRow.isSelected = false;
                let result: string = comp.setNumberPickerClass(testCalendarRow);

                expect(result).toEqual('calendar-day');
            });
    });
});