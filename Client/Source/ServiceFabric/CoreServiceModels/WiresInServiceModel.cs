using System;

namespace FCSAmerica.Transact.ServiceModels
{
    public class WiresInServiceModel
    {
        public int IncomingWireId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string BeneficiaryName { get; set; }
        public string CustomerName { get; set; }
        public string BeneficiaryAccountNumber { get; set; }
        public string OriginatorToBeneficiary { get; set; }
        public decimal Amount { get; set; }
        public string ByOrderOf { get; set; }
        public string SenderName { get; set; }
        public string Comments { get; set; }
    }
}
