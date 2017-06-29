using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreAccountsServiceAgentsFacade
    {
        List<Account> GetAccountsByCustomerId(int customerId);
        List<Account> GetCounterDraftEligibleAccounts(int customerId);
        List<GenericEnumMap> GetGLAccountsBySearchString(string searchString);
    }
}