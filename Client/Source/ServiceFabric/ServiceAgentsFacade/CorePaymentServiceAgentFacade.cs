using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;
using System.Linq;
using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models.Payment;
using FCSAmerica.Transact.Common.LocalConstants;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CorePaymentServiceAgentsFacade : ICorePaymentServiceAgentsFacade
    {
        private readonly ICoreAchServiceAgent _achServiceAgent;
        private readonly ICoreDraftServiceAgent _draftServiceAgent;

        public CorePaymentServiceAgentsFacade(ICoreAchServiceAgent achServiceAgent, ICoreDraftServiceAgent draftServiceAgent)
        {
            _achServiceAgent = achServiceAgent;
            _draftServiceAgent = draftServiceAgent;
        }

        public List<StopPayment> GetStopPayments(int customerId)
        {
            var result = new List<StopPayment>();
            var drafts = _draftServiceAgent.GetDraftStopPayments(customerId);
            if (drafts != null)
            {
                result.AddRange(drafts);
            }
            var achs = _achServiceAgent.GetAchStopPayments(customerId);
            if (achs != null)
            {
                result.AddRange(achs);
            }
            return result.OrderBy(x => x.ExpirationDate).ToList();
        }

        public bool DeleteStopPayment(int stopPaymentId, int stopPaymentTypeId)
        {
            if (stopPaymentTypeId == (int)StopPaymentType.Draft)
            {
                return _draftServiceAgent.DeleteDraftStopPayment(stopPaymentId);
            }
            if (stopPaymentTypeId == (int)StopPaymentType.ACH)
            {
                return _achServiceAgent.DeleteAchStopPayment(stopPaymentId);
            }
            return false;
        }

        public bool UpsertStopPayment(StopPayment stopPayment)
        {
            if (stopPayment.StopPaymentType == StopPaymentType.Draft)
            {
                return _draftServiceAgent.UpsertDraftStopPayment(stopPayment);
            }

            return _achServiceAgent.UpsertAchStopPayment(stopPayment);
        }
    }
}
