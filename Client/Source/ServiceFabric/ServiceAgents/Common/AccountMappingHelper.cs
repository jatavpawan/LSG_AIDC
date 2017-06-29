using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class AccountMappingHelper
    {
        public static Account MapAccountServiceModelToTransactionTemplateAccountClientModel(TransactionTemplateServiceModel transactionTemplate, Account account)
        {
            if (transactionTemplate == null)
            {
                return null;
            }
            return new Account
            {
                AccountId = transactionTemplate.AccountId,
                AccountNumber = transactionTemplate.LASAccountNumber,
                AccountAlias = transactionTemplate.LASAccountNumber,
                PrePayRestriction = account?.PrePayRestriction,
                ScheduledPaymentAmount = account?.ScheduledPaymentAmount,
                //TODO: Map this to the correct field when available from Core call
                Purpose = "Budget"
            };
        }

        internal static Account MapAccountServiceModelToClientModel(Account account)
        {
            if (account == null)
            {
                return null;
            }

            return new Account
            {
                AccountId = account.AccountId,
                AccountNumber = account.AccountNumber
            };
        }
    }
}
