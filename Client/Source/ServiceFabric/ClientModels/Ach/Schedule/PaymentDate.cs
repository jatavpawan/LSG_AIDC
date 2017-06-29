using System;

namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class PaymentDate
    {
        public int PaymentDateId { get; set; }
        public DateTime? OneTimePaymentProcessingDate { get; set; }
        public DateTime? StartPaymentDate { get; set; }
        public DateTime? EndPaymentDate { get; set; }
        public int? TotalPaymentCount { get; set; }
    }
}
