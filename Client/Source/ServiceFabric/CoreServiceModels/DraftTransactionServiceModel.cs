using System;
using FCSAmerica.Transact.Common.LocalConstants;

namespace FCSAmerica.Transact.ServiceModels
{
    public class DraftTransactionServiceModel
    {
        public int DraftId { get; set; }
        public string Account { get; set; }
        public decimal Amount { get; set; }
        public int? DraftNumber { get; set; }
        public DateTime TransactionDate { get; set; }
    }
}
