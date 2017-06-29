using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;
using System.Threading.Tasks;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Client.Models.Payment;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class PaymentServiceAgentsFacade : IPaymentServiceAgentsFacade
    {
        private readonly ICorePaymentServiceAgent _paymentServiceAgent;

        public PaymentServiceAgentsFacade(ICorePaymentServiceAgent corePaymentServiceAgent)
        {
            _paymentServiceAgent = corePaymentServiceAgent;
        }

        public List<StopPayment> GetStopPayments(int customerId)
        {
            return _paymentServiceAgent.GetStopPayments(customerId);
        }

        public void DeleteStopPayment(int stopPaymentId)
        {
            _paymentServiceAgent.DeleteStopPayment(stopPaymentId);
        }

        public int UpsertStopPayment(StopPayment stopPayment)
        {
            return _paymentServiceAgent.UpsertStopPayment(stopPayment);
        }
    }
}
