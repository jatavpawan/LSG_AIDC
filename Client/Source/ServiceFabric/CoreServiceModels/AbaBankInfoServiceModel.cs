namespace FCSAmerica.Transact.ServiceModels
{
    public class AbaBankInfoServiceModel
    {
        public string AbaRoutingNumber { get; set; }

        public string NewRoutingNumber { get; set; }

        public string BankName { get; set; }

        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string PostalCode { get; set; }

        public string PostalCodePlus4 { get; set; }

        public string AreaCode { get; set; }

        public string Prefix { get; set; }

        public string Suffix { get; set; }
    }
}
