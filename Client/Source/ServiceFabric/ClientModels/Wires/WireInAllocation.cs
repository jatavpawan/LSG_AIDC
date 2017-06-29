using FCSAmerica.Transact.Client.Models.Accounts;

namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WireInAllocation
    {
        public decimal Amount { get; set; }
        public Account Account { get; set; }
        public GenericEnumMap TransactionType { get; set; }
        public GenericEnumMap Feecode { get; set; }
        public GenericEnumMap GLAccountId { get; set; }
        public string GLSubledger { get; set; }
        public string Description { get; set; }
    }
}
