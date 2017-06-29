using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class GLAccountMappingHelper
    {
        public static GLAccount MapGLAccountServiceModelToClient(CoreGLAccountServiceModel coreGlAccount)
        {
            return new GLAccount
            {
                GLAccountId = coreGlAccount.GLAccountId,
                Description = coreGlAccount.Description,
                GLAccountNumber = coreGlAccount.GLAccountNumber
            };
        }
    }
}
