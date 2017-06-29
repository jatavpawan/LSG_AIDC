namespace FCSAmerica.Transact.Client.Models
{
    public class BankTemplate
    {
        public int BankTemplateId { get; set; }
        public string AbaRoutingNumber { get; set; }
        public string BankName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public GenericEnumMap BankAccountType { get; set; }
        public int CustomerId { get; set; }
        public string ExternalAccountNumber { get; set; }
        public string Purpose { get; set; }
        public string VerbalIdentifier { get; set; }
        public bool IsActive { get; set; }
        public AuditInfo AuditInfo { get; set; }
        public bool IsCustomerAccountHolder { get; set; }
        public string AccountHolderName { get; set; }
    }
}