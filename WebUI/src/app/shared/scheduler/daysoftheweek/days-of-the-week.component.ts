import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DaysOfTheWeek } from '../../../shared/models/days-of-the-week.model';
import { WeekdayModel } from '../../../shared/models/week-day.model';
import { ProcessingDateService } from '../../../core/services/processing-date.service';
import { Holiday } from '../../../shared/models/holiday.model';
import {CentralCodesDataService} from '../../../core/services/central-codes-data.service';

@Component({
    selector: 'days-of-the-week-component',
    templateUrl: 'days-of-the-week.component.html',
    styleUrls: ['days-of-the-week.component.scss']
})

export class DaysOfTheWeekComponent implements OnInit {

    @Output() onPayOnIndexChange = new EventEmitter<number[]>();
    @Output() onPayOnWeekdayChange = new EventEmitter<WeekdayModel>();

    @Input() daysOfTheWeek: DaysOfTheWeek;
    @Input() isReadOnly: boolean = false;
    payOnIndexRequired: boolean;
    weekdaySelectionRequired: boolean;
    processingDateService: ProcessingDateService;


    constructor(private centralCodesHolidayDataService: CentralCodesDataService) {
    }

    ngOnInit(): void {
        this.initializeDaysOfTheWeekModel();
    }

    public initializeDaysOfTheWeekModel() {
        if (!this.daysOfTheWeek || !this.daysOfTheWeek.PayOnIndex) {
            this.daysOfTheWeek = new DaysOfTheWeek();
            this.daysOfTheWeek.PayOnIndex = [];
        } else {
            this.payOnIndexRequired = false;
            this.weekdaySelectionRequired = false;
        }
        this.centralCodesHolidayDataService.getCentralCodesHolidays()
            .subscribe((ret: Holiday[]) => {
                if (ret && ret.length > 0) {
                    this.processingDateService = new ProcessingDateService(ret);
                }
            },
            (err: any) => {
                //TODO: Add new growler message
            });
    }

    daySelectedToggle(selection: number) {
        if (this.isReadOnly === false) {
            this.payOnIndexRequired = false;

            let index = +this.daysOfTheWeek.PayOnIndex.indexOf(+selection);

            if (index > -1) {
                this.daysOfTheWeek.PayOnIndex.splice(index, 1);
            } else {
                this.daysOfTheWeek.PayOnIndex.push(+selection);
            }
            this.onPayOnIndexChange.emit(this.daysOfTheWeek.PayOnIndex);
        }
    }

    setDayOfTheWeek(selection: number) {
        if (this.isReadOnly === false) {
            this.weekdaySelectionRequired = false;
            this.daysOfTheWeek.PayOnWeekday = this.processingDateService.getWeekDayByIndex(+selection);

            this.onPayOnWeekdayChange.emit(this.daysOfTheWeek.PayOnWeekday);
        }
    }

    getComponentModelData() {
        return this.daysOfTheWeek;
    }

    hasErrors() {
        let hasErrors = false;
        if (!this.daysOfTheWeek.PayOnIndex || this.daysOfTheWeek.PayOnIndex.length < 1) {
            this.payOnIndexRequired = true;
            hasErrors = true;
        }

        if (this.daysOfTheWeek.PayOnWeekday === undefined) {
            this.weekdaySelectionRequired = true;
        }

        return hasErrors;
    }

    isChecked(value: number) {
        let ret: boolean = false;
        if (this.daysOfTheWeek.PayOnIndex && (this.daysOfTheWeek.PayOnIndex.indexOf(value) > -1)) {
            ret = true;
        }
        return ret;
    }
}