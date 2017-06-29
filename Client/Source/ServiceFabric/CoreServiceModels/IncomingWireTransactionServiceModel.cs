using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class IncomingWireTransactionServiceModel
    {
        public int IncomingWireId { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime UpdatedOn { get; set; }
        public int IncomingWireStatusId { get; set; }
        public string IncomingWireStatusDescription { get; set; }
        public DateTime? PostedOn { get; set; }
        public int? OfficeId { get; set; }
        public int? LASAccountNumber { get; set; }
        public int? GLAccount { get; set; }
        public string GLSubledger { get; set; }
        public string Comments { get; set; }
        public string OfficeName { get; set; }
        public string OfficeCostCenter { get; set; }
    }
}
