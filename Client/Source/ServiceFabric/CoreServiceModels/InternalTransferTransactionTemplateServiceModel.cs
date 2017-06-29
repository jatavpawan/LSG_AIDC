using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.Common.LocalConstants;
using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class InternalTransferTransactionTemplateServiceModel
    {
        public int TransactionTemplateId { get; set; }

        public int ToCustomerId { get; set; }

        public long ToAccountId { get; set; }

        public int FromCustomerId { get; set; }

        public long FromAccountId { get; set; }

        public bool IsActive { get; set; }

        public ScheduleType ScheduleType { get; set; }

        public TransactionType? TransactionType { get; set; }

        public decimal Amount { get; set; }

        public decimal? ExcessAmount { get; set; }

        public TransactionType? ExcessAmountTransactionType { get; set; }

        public Common.Contracts.DayOfWeek[] DaysOfWeek { get; set; }

        public Common.Contracts.DayOfMonth[] DaysOfMonth { get; set; }

        public Common.Contracts.WeekOfMonth[] WeeksOfMonth { get; set; }

        public int? PaymentsEveryNPeriods { get; set; }

        public int? EndAfterNPayments { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Nickname { get; set; }

        public bool IsForm2279Complete { get; set; }

        public string CreatedBy { get; set; }

        public string CreatedByName { get; set; }

        public DateTime CreatedOn { get; set; }

        public string UpdatedBy { get; set; }

        public string UpdatedByName { get; set; }

        public DateTime UpdatedOn { get; set; }

        public string CreatedByApplication { get; set; }

        public string DeletedByApplication { get; set; }
        
        public FeeCode? OtherFeeCode { get; set; }
    }
}