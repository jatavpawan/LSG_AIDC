namespace FCSAmerica.Transact.Client.Models.Wires
{
    public class WireInBeneficiary
    {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string ReferenceForBeneficiary { get; set; }
        public string BeneficiaryBank { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string OriginatorToBeneficiaryLine1 { get; set; }
        public string OriginatorToBeneficiaryLine2 { get; set; }
        public string OriginatorToBeneficiaryLine3 { get; set; }
        public string OriginatorToBeneficiaryLine4 { get; set; }
        public string BeneficiaryBankOtherLine1 { get; set; }
        public string BeneficiaryBankOtherLine2 { get; set; }
    }
}
