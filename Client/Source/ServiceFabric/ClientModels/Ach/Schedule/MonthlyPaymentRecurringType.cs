namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class MonthlyPaymentRecurringType
    {
        public int MonthlyPaymentRecurringTypeId { get; set; }
        public int[] CalendarDays { get; set; }

        public DaysOfTheWeek[] DaysOfTheWeeks { get; set; }

        public string Description { get; set; }
    }
}