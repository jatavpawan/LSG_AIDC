using System;

namespace FCSAmerica.Transact.Client.Models
{
    public class DraftFileRow
    {
        public int DraftId { get; set; }
        public long? Account { get; set; }
        public decimal? Amount { get; set; }
        public int? DraftNumber { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Cif { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedOn { get; set; }
        public string BankIndicator { get; set; }
    }
}
