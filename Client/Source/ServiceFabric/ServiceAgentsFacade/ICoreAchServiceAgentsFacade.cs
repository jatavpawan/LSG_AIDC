using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreAchServiceAgentsFacade
    {
        List<BankTemplate> GetBankTemplates(int customerId);
        Aba GetAbaBankData(string abaNumber);
        int InsertBankTemplate(BankTemplate bankTemplate);
        void DeleteBankTemplate(int bankTemplateId);
        List<AchApprover> GetAchApprovers();
        List<AchTransaction> GetRejectAchData(int customerId);
        void RejectAch(AchTransaction achRejection);
        List<TransactionTemplate> GetAchTransactions(int customerId);
        int CreateAchTransaction(TransactionTemplate transactionTemplate);
        void DeleteAchTransaction(int achId);
        List<AchTransaction> GetAchRejectionsData();
        void DeleteAchRejections(int achId);
    }
}