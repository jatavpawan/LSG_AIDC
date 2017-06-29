using System;

namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class WeeklySchedule
    {
        public WeekDay[] RecurBy { get; set; }
        public bool PayEveryWeek { get; set; }
        public int? PayEveryNWeeks { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool HasEndDate { get; set; }
        public int? EndPaymentsAfterNWeeks { get; set; }
    }
}
