using FCSAmerica.Transact.Client.Common.enums;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Common.LocalConstants;
using System;
using FCSAmerica.Transact.Common.Constants;

namespace FCSAmerica.Transact.Client.Models
{
    public class TransactionTemplate
    {
        public int AchId { get; set; }
        //TODO: hook up customerId to UI
        public int CustomerId { get; set; }
        public Account Account { get; set; }
        public decimal Amount { get; set; }
        public decimal? ExcessAmount { get; set; }
        public string Addenda { get; set; }
        public BankTemplate BankTemplate { get; set; }
        public string Nickname { get; set; }
        public AchApprover AchApprover { get; set; }
        public GenericEnumMap TransactionDirection { get; set; }
        public string TransactionDirectionDisplay => TransactionDirection.Description;
        public AchStatus Status { get; set; }
        public string StatusDescription => Status == AchStatus.Active ? "Active" : "Deleted";
        public string FrequencyDisplay => Schedule.Frequency == "once" ? "One Time" : "Recurring";
        public AuditInfo AuditInfo { get; set; }
        public PaymentSchedule Schedule { get; set; }
        public DateTime TransactionDate { get; set; }
        public GenericEnumMap HowToApply { get; set; }
        public AuthorizationType AuthorizationType { get; set; }
        public string OtherNote { get; set; }
        public int? RejectionReasonId { get; set; }
        public bool? IsDeletedRejection { get; set; }
        public GenericEnumMap OtherFeeCode { get; set; }
    }
}
