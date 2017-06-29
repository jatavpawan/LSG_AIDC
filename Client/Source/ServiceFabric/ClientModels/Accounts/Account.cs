using System;

namespace FCSAmerica.Transact.Client.Models.Accounts
{
    public class Account
    {
        public long AccountId { get; set; }
        public string AccountDescription { get; set; }
        public string PrePayRestriction { get; set; }
        public decimal CurrentBilledAmount { get; set; }
        public decimal CommitmentFcsAvailableAmount { get; set; }
        public decimal CurrentBilledPrincipal { get; set; }
        public DateTime? MaturityDate { get; set; }
        public int? AccountLiabilityCode { get; set; }
        public string AccountLiabilityCodeDescription { get; set; }
        public decimal InterestAmount { get; set; }
        public decimal NextDueAmount { get; set; }
        public long? AccountNumber { get; set; }
        public long? AccountAlias { get; set; }
        public Office Office { get; set; }
        public decimal? ScheduledPaymentAmount { get; set; }
        public string Purpose { get; set; }

    }
}
