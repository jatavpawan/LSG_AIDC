using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceAgents.MockFactories;
using FCSAmerica.Transact.ServiceModels;
using System.Collections.Generic;
using System.Linq;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreAccountsServiceAgent
    {
        private static List<CoreGLAccountServiceModel> _coreGLAccounts;
        private static List<GLAccount> _glAccounts;
        private static List<GenericEnumMap> _enumMappedGLAccounts;

        public List<Account> GetAccountsByCustomerId(int customerId)
        {
            return CoreAccountsCacheFactory.GetAccountsByCustomerId(customerId);
        }

        public List<Account> GetCounterDraftEligibleAccounts(int customerId)
        {
            return CoreAccountsCacheFactory.GetCounterDraftEligibleAccounts(customerId);
        }

        public List<GLAccount> GetGLAccounts()
        {
            var requestUrl = "GLAccounts";

            if (_coreGLAccounts == null || !_coreGLAccounts.Any())
            {
                _coreGLAccounts = ExecuteGet<List<CoreGLAccountServiceModel>>(requestUrl, _ecsSettings.CoreWiresApi);

                _glAccounts = new List<GLAccount>();

                if (_coreGLAccounts != null && _coreGLAccounts.Any())
                {
                    _coreGLAccounts.ForEach(coreGLAccount =>
                    {
                        var wireInClient = GLAccountMappingHelper.MapGLAccountServiceModelToClient(coreGLAccount);
                        _glAccounts.Add(wireInClient);
                    });
                }
            }

            return _glAccounts;

        }

        public List<GenericEnumMap> GetGLAccountsBySearchString(string searchString)
        {
            var glAccountsFiltered = GetGLAccounts();

            if (!string.IsNullOrWhiteSpace(searchString))
            {
                glAccountsFiltered = GetGLAccounts().Where(x => x.GLAccountNumber.ToLower().StartsWith(searchString.ToLower()) || x.Description.ToLower().StartsWith(searchString.ToLower()) || x.GLAccountNumber + " - " + x.Description == searchString).ToList();
            }

            _enumMappedGLAccounts = new List<GenericEnumMap>();

            if (glAccountsFiltered.Any())
            {
                glAccountsFiltered.ForEach(o =>
                {
                    _enumMappedGLAccounts.Add(new GenericEnumMap
                    {
                        Id = o.GLAccountId,
                        Description = o.GLAccountNumber + " - " + o.Description
                    });
                });

            }

            return _enumMappedGLAccounts;
        }
    }
}
