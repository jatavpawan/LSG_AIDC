using FCSAmerica.Transact.Client.Common.Enums;
using System;

namespace FCSAmerica.Transact.Client.Models.Drafts
{
    public class DraftTransaction
    {
        public int DraftId { get; set; }
        public string Account { get; set; }
        public string Purpose { get; set; }
        public decimal Amount { get; set; }
        public int? DraftNumber { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Bank { get; set; }
        public string CostCenter { get; set; }
        public string CustomerName { get; set; }
        public string PreparedBy { get; set; }
        public DraftStatus Status { get; set; }
        public AuditInfo AuditInfo { get; set; }
    }
}
