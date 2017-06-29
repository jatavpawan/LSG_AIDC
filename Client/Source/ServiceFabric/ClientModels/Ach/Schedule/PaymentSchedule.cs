using System;
using System.Collections.Generic;

namespace FCSAmerica.Transact.Client.Models.Ach.Schedule
{
    public class PaymentSchedule
    {
        public string Frequency { get; set; }
        public DateTime? OneTimePaymentDate { get; set; }
        public RecurringPayment RecurringSchedule { get; set; }
        public DateTime? FirstPaymentDate { get; set; }
        public DateTime? EndPaymentDate { get; set; }
        public List<string> NextPaymentDates { get; set; }
    }
}
