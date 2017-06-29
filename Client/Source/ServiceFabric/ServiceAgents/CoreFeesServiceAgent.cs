using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreFeesServiceAgent
    {
        public FeeTypeServiceModel GetFeeType(FeeType feeType)
        {
            if (feeType == FeeType.None)
            {
                return null;
            }

            var requestUrl = $"FeeTypes/{feeType}";

            return ExecuteGet<FeeTypeServiceModel>(requestUrl, _ecsSettings.CoreFeeApi);
        }
    }
}

