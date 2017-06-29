using FCSAmerica.Transact.Common.Contracts;
using FCSAmerica.Transact.Common.LocalConstants;
using System;
using DayOfWeek = FCSAmerica.Transact.Common.Contracts.DayOfWeek;

namespace FCSAmerica.Transact.ServiceModels
{
    public class ServiceScheduleModel
    {
        public ScheduleType ScheduleType { get; set; }
        public DateTime? FirstPaymentDate { get; set; }
        public DateTime? EndPaymentDate { get; set; }
        public int? EndAfterNPayments { get; set; }
        public int? PaymentsEveryNPeriods { get; set; }
        public DayOfMonth[] DaysOfMonth { get; set; }
        public WeekOfMonth[] WeeksOfMonth { get; set; }
        public DayOfWeek[] DaysOfWeek { get; set; }
    }
}
