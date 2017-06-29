using FCSAmerica.Transact.Client.Models;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreBankTemplateServiceAgent
    {
        List<BankTemplate> GetBankTemplates(int customerId);
        int InsertBankTemplate(BankTemplate bankTemplate);
        void DeleteBankTemplate(int bankTemplateId);
    }
}
