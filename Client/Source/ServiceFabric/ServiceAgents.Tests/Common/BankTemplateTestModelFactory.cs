using FCSAmerica.Transact.Client.Models;

namespace ClientBusinessLogic.Tests.Common
{
    public class BankTemplateTestModelFactory
    {
        public static BankTemplate CreateBankTemplate()
        {
            return new BankTemplate
            {
                BankTemplateId = 1,
                ExternalAccountNumber = "1",
                BankAccountType = CreateBankAccountType()
            };
        }

        public static GenericEnumMap CreateBankAccountType()
        {
            return new GenericEnumMap()
            {
                Id = 1,
                Description = "test description"
            };
        }
    }
}
