using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models.Accounts;
using System;

namespace FCSAmerica.Transact.Client.Models.Payment
{
    public class StopPayment
    {
        public int StopPaymentId { get; set; }
        public Account Account { get; set; }
        public ACHStopPayment ACHStopPayment { get; set; }
        public DraftStopPayment DraftStopPayment { get; set; }
        public bool IsRegionalAccount { get; set; }
        public int CustomerId { get; set; }
        public StopPaymentType StopPaymentType { get; set; }
        public string Description { get; set; }
        public DateTime ExpirationDate { get; set; }
        public string UserName { get; set; }
        public AuditInfo AuditInfo { get; set; }
        public string StopPaymentTypeDisplay => StopPaymentType.ToString();
    }
}
