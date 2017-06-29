using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreBankServiceAgent
    {

        public Aba GetAbaBankInfo(string abaRoutingNumber)
        {
            if (string.IsNullOrWhiteSpace(abaRoutingNumber))
            {
                return null;
            }
            var requestUrl = $"aba/{abaRoutingNumber}";

            var result = ExecuteGet<AbaBankInfoServiceModel>(requestUrl, _ecsSettings.CoreBankApi);

            return AchMappingHelper.MapAbaBankServiceModelToClientModel(result);
        }
    }
}
