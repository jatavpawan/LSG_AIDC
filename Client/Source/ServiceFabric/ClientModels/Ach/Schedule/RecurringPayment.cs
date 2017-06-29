namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class RecurringPayment
    {
        public string Frequency { get; set; }
        public WeeklySchedule WeeklySchedule { get; set; }
        public MonthlySchedule MonthlySchedule { get; set; }
        public QuarterlySchedule QuarterlySchedule { get; set; }
        public AnnualSchedule AnnualSchedule { get; set; }
    }
}
