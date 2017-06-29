using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models.Payment;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICorePaymentServiceAgent
    {
        List<StopPayment> GetStopPayments(int customerId);
        void DeleteStopPayment(int stopPaymentId);
        int UpsertStopPayment(StopPayment stopPayment);
    }
}