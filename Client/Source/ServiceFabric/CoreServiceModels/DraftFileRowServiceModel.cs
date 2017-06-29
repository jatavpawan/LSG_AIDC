using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftFileRowServiceModel
    {
        public int DraftId { get; set; }
        public string Account { get; set; }
        public decimal Amount { get; set; }
        public DateTime TransactionDate { get; set; }
        public int? DraftNumber { get; set; }
        public string Cif { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
