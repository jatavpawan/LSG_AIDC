using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreAchServiceAgentsFacade : ICoreAchServiceAgentsFacade
    {
        private readonly ICoreAchServiceAgent _achServiceAgent;
        private readonly ICoreBankServiceAgent _bankServiceAgent;
        private readonly ICoreBankTemplateServiceAgent _bankTemplateServiceAgent;

        public CoreAchServiceAgentsFacade(ICoreAchServiceAgent achServiceAgent, ICoreBankServiceAgent bankServiceAgent, ICoreBankTemplateServiceAgent bankTemplateServiceAgent)
        {
            _achServiceAgent = achServiceAgent;
            _bankServiceAgent = bankServiceAgent;
            _bankTemplateServiceAgent = bankTemplateServiceAgent;
        }

        public List<BankTemplate> GetBankTemplates(int customerId)
        {
            return _bankTemplateServiceAgent.GetBankTemplates(customerId);
        }

        public Aba GetAbaBankData(string abaNumber)
        {
            return _bankServiceAgent.GetAbaBankInfo(abaNumber);
        }

        public int InsertBankTemplate(BankTemplate bankTemplate)
        {
            return _bankTemplateServiceAgent.InsertBankTemplate(bankTemplate);
        }

        public void DeleteBankTemplate(int bankTemplateId)
        {
            _bankTemplateServiceAgent.DeleteBankTemplate(bankTemplateId);
        }

        public List<AchApprover> GetAchApprovers()
        {
            return _achServiceAgent.GetAchApprovers();
        }

        public List<AchTransaction> GetRejectAchData(int customerId)
        {
            return _achServiceAgent.GetRejectionEligibleAchs(customerId);
        }

        public void RejectAch(AchTransaction achRejection)
        {
            _achServiceAgent.RejectAch(achRejection);
        }



        public List<TransactionTemplate> GetAchTransactions(int customerId)
        {
            return _achServiceAgent.GetTransactionTemplates(customerId);
        }

        public int CreateAchTransaction(TransactionTemplate transactionTemplate)
        {
            return _achServiceAgent.CreateTransactionTemplate(transactionTemplate);
        }

        public void DeleteAchTransaction(int achId)
        {
            _achServiceAgent.DeleteTransactionTemplate(achId);
        }

        public List<AchTransaction> GetAchRejectionsData()
        {
            return _achServiceAgent.GetAchRejectionsData();
        }

        public void DeleteAchRejections(int achId)
        {
            _achServiceAgent.DeleteAchRejections(achId);
        }
    }
}
