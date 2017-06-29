using System;
using FCSAmerica.Transact.Common.LocalConstants;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftRejectionServiceModel
    {
        public int RejectId { get; set; }
        public int DraftId { get; set; }
        public RejectReason RejectReason { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public string Account { get; set; }
        public decimal Amount { get; set; }
        public int? DraftNumber { get; set; }
        public string Bank => "FN";
        public string RejectType => "Reject Draft";
        public int CostCenter { get; set; }
        public string CustomerName { get; set; }
        public string PreparedBy { get; set; }
    }
}
