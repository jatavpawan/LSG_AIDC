using System;

namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WireInDetails
    {
        public int IncomingWireId { get; set; }
        public DateTime DateReceived { get; set; }
        public decimal Amount { get; set; }
        public string Office { get; set; }
        public string Comments { get; set; }
        public WireInSender WireInSender { get; set; }
        public WireInBeneficiary WireInBeneficiary { get; set; }
        public WireInOther WireInOther { get; set; }
    }
}
