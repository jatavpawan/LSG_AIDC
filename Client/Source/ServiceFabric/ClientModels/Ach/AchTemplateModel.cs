using FCSAmerica.Transact.Client.Common.enums;

namespace FCSAmerica.Transact.Client.Models
{
    public class AchTemplateModel
    {
        public int AchTemplateId { get; set; }
        public int AbaNumber { get; set; }
        public string BankName { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public AccountType AccountType { get; set; }
        public long AccountNumber { get; set; }
        public string VerbalIdentifier { get; set; }

        public AchStatus Status { get; set; }

        public AuditInfo AuditInfo { get; set; }
    }
}