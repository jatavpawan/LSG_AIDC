using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreFeesServiceAgent
    {
        FeeTypeServiceModel GetFeeType(FeeType feeType);
    }
}