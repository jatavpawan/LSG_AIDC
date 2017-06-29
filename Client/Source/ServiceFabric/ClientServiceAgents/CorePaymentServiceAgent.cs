using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Payment;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceAgents.MockFactories;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICorePaymentServiceAgent
    {
        public List<StopPayment> GetStopPayments(int customerId)
        {
            return CorePaymentCacheFactory.GetCachedStopPayments();
        }

        public void DeleteStopPayment(int stopPaymentId)
        {
            CorePaymentCacheFactory.DeleteCachedStopPayment(stopPaymentId);
        }

        public int UpsertStopPayment(StopPayment stopPayment)
        {
            return CorePaymentCacheFactory.CreateAchTransaction(stopPayment);
        }
    }
}
