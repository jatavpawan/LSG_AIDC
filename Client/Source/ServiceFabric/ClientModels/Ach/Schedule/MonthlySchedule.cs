using System;

namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class MonthlySchedule
    {
        public string RecurBy { get; set; }
        public int[] CalendarDays { get; set; }
        public bool PayEveryMonth { get; set; }
        public int? PayEveryNMonths { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool HasEndDate { get; set; }
        public int? EndPaymentsAfterNMonths { get; set; }
        public DaysOfTheWeek DaysOfTheWeek { get; set; }
    }
}
