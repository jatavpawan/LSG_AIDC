import { Observable } from "rxjs";

import { Holiday } from '../../shared/models/holiday.model';

export class MockCentralCodesHolidayData {

    getCentralCodesHolidays(): Observable<Holiday[]> {

        let mockHolidayDates: Holiday[] = [];
        let mockHolidayDate: Holiday = new Holiday();

        mockHolidayDate.holidayDate = '07/04/2017';
        mockHolidayDate.holidayDescription = 'Fourth of July';
        mockHolidayDate.isNonprocessingDayFederal = true;

        mockHolidayDates.push(mockHolidayDate);

        mockHolidayDate.holidayDate = '12/25/2017';
        mockHolidayDate.holidayDescription = 'Christmas';
        mockHolidayDate.isNonprocessingDayFederal = true;

        return Observable.of(mockHolidayDates);
    }
}