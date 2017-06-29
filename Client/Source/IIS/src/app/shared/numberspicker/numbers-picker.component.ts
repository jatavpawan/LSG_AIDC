import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, Renderer } from '@angular/core';

export class CalendarDaysRow {
    description: number;
    isSelected: boolean;
}

@Component({
    selector: 'numbers-picker',
    templateUrl: 'numbers-picker.component.html',
    styleUrls: ['numbers-picker.component.scss']
})


export class NumbersPickerComponent implements OnInit {
    @Input() numbers: number;
    @Input() columnCount: number;
    @Input() selectedArrayOfNumbers: number[] = [];
    @Input() isReadOnly: boolean = false;
    @Output() onNumberSelected = new EventEmitter<number>();
    @Input() prepaymentRestriction: string;

    currentNumber: number = 1;
    rowCount: number = 0;
    rows: number[] = [];

    constructor(private ref: ChangeDetectorRef, private renderer: Renderer) {
    }

    ngOnInit(): void {        
        this.initialize();
        this.generateRowRange();
    }

    initialize() {

        if (!this.prepaymentRestriction) {
            this.prepaymentRestriction = '';
        }

        if (this.numbers === undefined) {
            this.numbers = 31;
        }

        if (this.columnCount === undefined) {
            this.columnCount = 7;
        }
    }

    generateRowRange() {
        this.rows = [];
        this.rowCount = Math.ceil(this.numbers / this.columnCount);

        for (let i = 1; i <= this.rowCount; i++) {
            this.rows.push(i);
        }
    }

    generateColumnRange() {
        this.ref.reattach();
        let columns: CalendarDaysRow[] = [];
        for (let i = 0; i < this.columnCount; i++) {
            if ((this.currentNumber) <= this.numbers) {
                let x: CalendarDaysRow = new CalendarDaysRow();
                x.description = this.currentNumber;
                x.isSelected = (this.selectedArrayOfNumbers.indexOf(this.currentNumber) > -1);
                columns.push(x);
                this.currentNumber++;
            }

        }
        this.ref.detach();
        return columns;
    }

    selectNumber(event: any, selectedNumber: CalendarDaysRow) {
        if ((this.isReadOnly === false && this.prepaymentRestriction !== '1') || (this.prepaymentRestriction === '1' && selectedNumber.description >= 15)) {
            this.toggleAttribute(event);
            selectedNumber.isSelected = !selectedNumber.isSelected;
            this.onNumberSelected.emit(selectedNumber.description);
        } 
    }

    private toggleAttribute(element: any) {
        let currentClass = element.target.getAttribute('class');
        let newClass: string;
        if (currentClass === 'calendar-day') {
            newClass = 'calendar-day-selected';
        } else {
            newClass = 'calendar-day';
        }
        this.renderer.setElementAttribute(element.target, 'class', newClass);
    }

    public setNumberPickerClass(calendarDayRow: CalendarDaysRow): string {
        let classDescription = calendarDayRow.isSelected ? 'calendar-day-selected' : 'calendar-day';
        if (this.prepaymentRestriction === '1' && calendarDayRow.description < 15) {
            classDescription = 'calendar-day-disabled';
        }

        return classDescription;
    }
}