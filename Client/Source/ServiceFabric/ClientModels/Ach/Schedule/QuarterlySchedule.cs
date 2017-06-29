using System;

namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class QuarterlySchedule
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool HasEndDate { get; set; }
        public int? EndAfterNPayments { get; set; }
    }
}
