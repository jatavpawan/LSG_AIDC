using FCSAmerica.Transact.Common.Constants;

namespace FCSAmerica.Transact.ServiceModels
{
    public class IncomingWireTransactionDetailServiceModel
    {
        public int IncomingWireTransactionDetailId { get; set; }

        public decimal Amount { get; set; }

        public int? OfficeId { get; set; }

        public int? AccountId { get; set; }

        public TransactionType? TransactionType { get; set; }

        public TransactionStatus TransactionStatus { get; set; }

        public FeeCode? FeeCode { get; set; }

        public int? GLAccountId { get; set; }

        public string GLSubledger { get; set; }

        public string Description { get; set; }
    }
}
