using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreAccountsServiceAgent
    {
        List<Account> GetAccountsByCustomerId(int customerId);
        List<Account> GetCounterDraftEligibleAccounts(int customerId);
        List<GLAccount> GetGLAccounts();
        List<GenericEnumMap> GetGLAccountsBySearchString(string searchString);
    }
}