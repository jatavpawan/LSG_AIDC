using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreAccountsServiceAgentsFacade : ICoreAccountsServiceAgentsFacade
    {
        private readonly ICoreAccountsServiceAgent _coreAccountsServiceAgent;

        public CoreAccountsServiceAgentsFacade(ICoreAccountsServiceAgent coreAccountsServiceAgent)
        {
            _coreAccountsServiceAgent = coreAccountsServiceAgent;
        }

        public List<Account> GetAccountsByCustomerId(int customerId)
        {
            return _coreAccountsServiceAgent.GetAccountsByCustomerId(customerId);
        }

        public List<Account> GetCounterDraftEligibleAccounts(int customerId)
        {
            return _coreAccountsServiceAgent.GetCounterDraftEligibleAccounts(customerId);
        }

        public List<GenericEnumMap> GetGLAccountsBySearchString(string searchString)
        {
            return _coreAccountsServiceAgent.GetGLAccountsBySearchString(searchString);
        }
    }
}
