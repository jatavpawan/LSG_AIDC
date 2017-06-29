using System.Collections.Generic;
using System.Threading.Tasks;
using FCSAmerica.Transact.Client.Models.Payment;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface IPaymentServiceAgentsFacade
    {
        List<StopPayment> GetStopPayments(int customerId);
        void DeleteStopPayment(int stopPaymentId);
        int UpsertStopPayment(StopPayment stopPayment);
    }
}