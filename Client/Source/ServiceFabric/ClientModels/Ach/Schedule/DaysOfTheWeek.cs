namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class DaysOfTheWeek
    {       
        public WeekDay PayOnWeekday { get; set; }
        public int[] PayOnIndex { get; set; }
    }
}
