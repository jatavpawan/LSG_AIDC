import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MyDatePickerModule } from 'mydatepicker';

import { SchedulerComponent } from './scheduler/scheduler.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

import { RecurringComponent } from './scheduler/recurring/recurring.component';
import { WeeklyComponent } from './scheduler/weekly/weekly.component';
import { MonthlyComponent } from './scheduler/monthly/monthly.component';
import { DaysOfTheWeekComponent } from './scheduler/daysoftheweek/days-of-the-week.component';
import { NumbersPickerComponent } from './numberspicker/numbers-picker.component';
import { DataTableModule, MultiSelectModule, SliderModule, DropdownModule, ChipsModule, DialogModule, AutoCompleteModule, InputSwitchModule } from 'primeng/primeng';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { StatusTypeFormatPipe } from './pipes/status-type-format.pipe';
import { AccountNumberFormatPipe } from './pipes/account-number-format.pipe';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { YesNoFormatPipe } from './pipes/yes-no-format.pipe';
import { TitleCasePipe } from './pipes/title-case.pipe';
import { ExpandCollapseDirective } from './directives/expand-collapse.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { DownloadCsvService } from './export/downLoadCsv.service';
import { TabViewModule } from 'primeng/primeng';
import { CustomerResults } from "./customer-results/customer-results.component";
import { AnnualComponent } from './scheduler/annual/annual.component';
import { QuarterlyComponent } from './scheduler/quarterly/quarterly.component';
import { InvalidFormMessageComponent } from "./forms/invalid-form-message/invalid-form-message.component";
import { InvalidControlMessageComponent } from "./forms/invalid-control-message/invalid-control-message.component";
import { FormGroupValidationComponent } from "./forms/form-group-validation/form-group-validation.component";
import { AccordionModule } from 'primeng/primeng';
import { SearchInputComponent } from "../core/search/search-input.component";
import { FieldsetModule } from "primeng/components/fieldset/fieldset";

@NgModule(({
    declarations: [
        SchedulerComponent,
        DatepickerComponent,
        RecurringComponent,
        WeeklyComponent,
        MonthlyComponent,
        DaysOfTheWeekComponent,
        NumbersPickerComponent,
        DateFormatPipe,
        CurrencyFormatPipe,
        StatusTypeFormatPipe,
        AccountNumberFormatPipe,
        PhoneFormatPipe,
        YesNoFormatPipe,
        TitleCasePipe,
        ExpandCollapseDirective,
        AutofocusDirective,
        CustomerResults,
        AnnualComponent,
        SearchInputComponent,
        QuarterlyComponent,
        InvalidFormMessageComponent,
        InvalidControlMessageComponent,
        FormGroupValidationComponent
    ],
    imports: [FormsModule, CommonModule, MyDatePickerModule, DataTableModule,
        MultiSelectModule,
        CurrencyMaskModule,
        DropdownModule,
        ChipsModule, DialogModule, AutoCompleteModule, InputSwitchModule, BootstrapModalModule, TabViewModule, AccordionModule, FieldsetModule],
    exports: [
        FormsModule,
        CommonModule,
        SchedulerComponent,
        DatepickerComponent,
        DataTableModule,
        MultiSelectModule,
        SliderModule,
        DropdownModule,
        ChipsModule,
        DialogModule,
        AutoCompleteModule,
        InputSwitchModule,
        NumbersPickerComponent,
        DateFormatPipe,
        CurrencyFormatPipe,
        StatusTypeFormatPipe,
        AccountNumberFormatPipe,
        PhoneFormatPipe,
        YesNoFormatPipe,
        TitleCasePipe,
        ExpandCollapseDirective,
        AutofocusDirective,
        DaysOfTheWeekComponent,
        RecurringComponent,
        MonthlyComponent,
        WeeklyComponent,
        CurrencyMaskModule,
        TabViewModule,
        CustomerResults,
        AnnualComponent,
        QuarterlyComponent,
        AccordionModule,
        SearchInputComponent,
        InvalidFormMessageComponent,
        InvalidControlMessageComponent,
        FormGroupValidationComponent,
        FieldsetModule
    ],
    providers: [DownloadCsvService],
    entryComponents: [SchedulerComponent]
}))
export class SharedModule {
}
