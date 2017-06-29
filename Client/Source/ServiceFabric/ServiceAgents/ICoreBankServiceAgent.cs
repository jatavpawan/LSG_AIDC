using FCSAmerica.Transact.Client.Models;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreBankServiceAgent
    {
        Aba GetAbaBankInfo(string abaRoutingNumber);
    }
}