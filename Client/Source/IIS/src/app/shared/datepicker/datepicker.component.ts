import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as moment from 'moment';

import { IMyOptions, IMyDateModel, IMyDate } from 'mydatepicker';

@Component({
    selector: 'datepicker-component',
    templateUrl: 'datepicker.component.html',
    styleUrls: ['datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {
    public minDate: Date = new Date();

    //selectedDate: Date;

    @Output() onDateSelected = new EventEmitter<string>();
    @Input() parentDate: string;
    @Input() selectedDate: Date;
    @Input() isReadOnly: boolean = false;
    @Input() datePickerOptions: IMyOptions;
    private currentSetDate: any;

    private myDatePickerOptions: IMyOptions;

    public constructor() {
        this.minDate = new Date();

    }

    onDateChanged(event: IMyDateModel) {
        if(this.isReadOnly === false){
        this.onDateSelected.emit(event.formatted);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes["parentDate"]) {
            let change: SimpleChange = changes['parentDate'];

            this.setDateField(change.currentValue);
        }
    }

    ngOnInit(): void {
        if (this.datePickerOptions) {
            this.myDatePickerOptions = this.datePickerOptions;
        } else {
            this.myDatePickerOptions = {
                // other options...
                dateFormat: 'mm/dd/yyyy',
                disableDays: [],
                disableWeekends: false,
                todayBtnTxt: 'Today',
                firstDayOfWeek: 'su',
                sunHighlight: true,
                height: '2.125rem',
                inline: false,
                selectionTxtFontSize: '.875rem',
                componentDisabled: this.isReadOnly

            };
        }
    }

    setDateField(newDate: string): any {
        if (newDate) {
            let momentDate = moment(newDate);
            this.currentSetDate = { date: { year: momentDate.year(), month: momentDate.month() + 1, day: momentDate.date() } }            
        } else {
            this.currentSetDate = '';
        }
    }
}