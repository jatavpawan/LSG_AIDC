using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using System;

namespace FCSAmerica.Transact.Client.Models.InternalTransfers
{
    public class TransferTemplate
    {
        public int TransactionId { get; set; }
        public Customer FromCustomer { get; set; }
        public Account FromAccount { get; set; }
        public Customer ToCustomer { get; set; }
        public Account ToAccount { get; set; }
        public string Nickname { get; set; }
        public GenericEnumMap HowToApply { get; set; }
        public decimal Amount { get; set; }
        public decimal? ExcessAmount { get; set; }
        public AuditInfo AuditInfo { get; set; }
        public PaymentSchedule Schedule { get; set; }
        public bool IsActive { get; set; }
        public bool IsForm2279Complete { get; set; }
        public DateTime? StartDate { get; set; }
        public string ScheduleType { get; set; }
        public string FromDisplay { get; set; }
        public string ToDisplay { get; set; }
        public GenericEnumMap OtherFeeCode { get; set; }
    }
}