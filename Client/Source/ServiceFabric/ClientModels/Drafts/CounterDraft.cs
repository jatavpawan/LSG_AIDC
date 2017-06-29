namespace FCSAmerica.Transact.Client.Models
{
    public class CounterDraft
    {
        public int CounterDraftId { get; set; }
        public int CustomerId { get; set; }
        public long LASAccountNumber { get; set; }
        public int BeginningDraftNumber { get; set; }
        public int EndingDraftNumber { get; set; }
        public bool IsActive { get; set; }
        public AuditInfo AuditInfo { get; set; }
        public Office Office { get; set; }
        public string PreparedBy { get; set; }
        public string StatusDescription => IsActive ? "Active" : "Deleted";
    }
}
