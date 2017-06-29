using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class AccountServiceModel
    {
        public long AccountId { get; set; }
        public int? NoteNumber { get; set; }
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
        public int? AccountNumber { get; set; }
        public int? AccountAlias { get; set; }
        public int OfficeId { get; set; }
        public decimal ScheduledPaymentAmount { get; set; }
    }
}
