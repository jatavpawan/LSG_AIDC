using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceAgents;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreFeeServiceAgentsFacade : ICoreFeeServiceAgentsFacade
    {
        private readonly ICoreFeesServiceAgent _feesServiceAgent;

        public CoreFeeServiceAgentsFacade(ICoreFeesServiceAgent feesServiceAgent)
        {
            _feesServiceAgent = feesServiceAgent;
        }
        public decimal GetFeeAmount(int stopPaymentTypeId)
        {
            if (stopPaymentTypeId == (int)StopPaymentType.Draft)
            {
                return _feesServiceAgent.GetFeeType(FeeType.DraftStopPayment).Amount;
            }
            if (stopPaymentTypeId == (int)StopPaymentType.ACH)
            {
                return _feesServiceAgent.GetFeeType(FeeType.AchStopPayment).Amount;
            }
            return 0M;
        }
    }
}