using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.Common.Contracts;
using FCSAmerica.Transact.Common.LocalConstants;
using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class TransactionTemplateServiceModel
    {
        public int TransactionTemplateId { get; set; }

        public int CustomerId { get; set; }

        public long AccountId { get; set; }

        public TransactionDirection TransactionDirection { get; set; }

        public int BankTemplateId { get; set; }

        public string CreatedByApplication { get; set; }

        public PaymentType? PaymentType { get; set; }

        public TransactionType? TransactionType { get; set; }

        public int CreatedByCustomerId { get; set; }

        public string NickName { get; set; }

        public decimal Amount { get; set; }

        public decimal? ExcessAmount { get; set; }

        public TransactionType? ExcessAmountTransactionType { get; set; }

        public DateTime? NextTransactionDate { get; set; }

        public string Addenda { get; set; }

        public int? ApproverEmployeeId { get; set; }

        public DateTime? ApprovedOn { get; set; }

        public bool IsActive { get; set; }

        public string DeletedByApplication { get; set; }

        public ScheduleType? ScheduleType { get; set; }

        public int? PaymentsEveryNPeriods { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public int? EndAfterNPayments { get; set; }

        public Common.Contracts.DayOfWeek[] DaysOfWeek { get; set; }

        public DayOfMonth[] DaysOfMonth { get; set; }

        public WeekOfMonth[] WeeksOfMonth { get; set; }
        public long LASAccountNumber { get; set; }

        public string BankName { get; set; }

        public BankAccountType BankAccountType { get; set; }

        public string ExternalAccountNumber { get; set; }

        public AuthorizationType AuthorizationType { get; set; }

        public string ApproverEmployeeName { get; set; }

        public string CreatedByName { get; set; }

        public DateTime CreatedOn { get; set; }

        public string UpdatedByName { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string ManuallyDeletedByName { get; set; }

        public DateTime? ManuallyDeletedOn { get; set; }
        
        public FeeCode? OtherFeeCode { get; set; }
    }
}
