export class WeekdayModel {
    public DayOfTheWeekNumber: number;
    public DayOfTheWeekString: string;
    constructor(_dayOfTheWeekNumber: number, _dayOfTheWeekString: string) {
        this.DayOfTheWeekNumber = _dayOfTheWeekNumber;
        this.DayOfTheWeekString = _dayOfTheWeekString;
    }
}