namespace FCSAmerica.Transact.ServiceModels
{
    public class BankTemplateServiceModel
    {
        public int BankTemplateId { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public string UpdatedBy { get; set; }
        public string UpdatedOn { get; set; }
        public string AbaRoutingNumber { get; set; }
        public int BankAccountTypeId { get; set; }
        public int CustomerId { get; set; }
        public string ExternalAccountNumber { get; set; }
        public bool IsActive { get; set; }
        public bool IsCustomerAccountHolder { get; set; }
        public string AccountHolderName { get; set; }
    }
}
