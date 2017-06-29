using System.Collections.Generic;
using System.Threading.Tasks;
using FCSAmerica.Transact.Client.Models.Payment;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICorePaymentServiceAgentsFacade
    {
        List<StopPayment> GetStopPayments(int customerId);
        bool DeleteStopPayment(int stopPaymentId, int stopPaymentTypeId);
        bool UpsertStopPayment(StopPayment stopPayment);
    }
}