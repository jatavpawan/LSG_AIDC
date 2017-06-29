using System;

namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WiresIn
    {
        public int WireInId { get; set; }
        public DateTime ReceivedDate { get; set; }
        public string BeneficiaryName { get; set; }
        public string BeneficiaryAccountNumber { get; set; }
        public string OriginatorToBeneficiary { get; set; }
        public decimal Amount { get; set; }
        public string CustomerName { get; set; }
        public string SendingBankName { get; set; }
        public string ByOrderOf { get; set; }
        public string Comments { get; set; }
    }
}
