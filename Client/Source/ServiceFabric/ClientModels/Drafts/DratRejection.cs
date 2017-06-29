using System;
using FCSAmerica.Transact.Common.LocalConstants;

namespace FCSAmerica.Transact.Client.Models.Drafts
{    
    public class DraftRejection: DraftTransaction
    {
        public string RejectType => "Reject Draft";
        public RejectReason RejectReason { get; set; }
        public string RejectionReasonDescription => RejectReason.ToString();
        public string StatusDisplay => IsActive ? "Rejected" : "Deleted";
        public bool IsActive { get; set; }
        public bool? OlderThan24Hours => AuditInfo != null && (DateTime.Now - AuditInfo.UpdatedOn).TotalHours > 24;
        public string Description { get; set; }
        public new AuditInfo AuditInfo { get; set; }
    }
}
