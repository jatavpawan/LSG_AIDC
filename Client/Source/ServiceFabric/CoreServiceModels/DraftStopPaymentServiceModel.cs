using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftStopPaymentServiceModel
    {
        public int StopPaymentId { get; set; }
        public int CustomerId { get; set; }
        public int AccountId { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public DateTime ExpirationDate { get; set; }
        public int BeginningDraftNumber { get; set; }
        public int? EndingDraftNumber { get; set; }
        public decimal? BeginningAmount { get; set; }
        public decimal? EndingAmount { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public DateTime CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedByName { get; set; }
        public DateTime UpdatedOn { get; set; }
        public bool IsActive => true;
    }
}