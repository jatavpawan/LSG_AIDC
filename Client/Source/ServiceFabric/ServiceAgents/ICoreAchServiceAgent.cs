using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Client.Models.Payment;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreAchServiceAgent
    {
        List<AchApprover> GetAchApprovers();
        void RejectAch(AchTransaction achRejection);
        List<TransactionTemplate> GetTransactionTemplates(int customerId);
        List<AchTransaction> GetAchTransactions(int customerId);
        List<AchTransaction> GetAchTransactions();
        BankTemplate GetBankTemplatesById(int bankTemplateId);
        List<AchTransaction> GetRejectionEligibleAchs(int customerId);
        int CreateTransactionTemplate(TransactionTemplate transactionTemplate);
        void DeleteTransactionTemplate(int transactionTemplateId);
        List<AchTransaction> GetAchRejectionsData();
        void DeleteAchRejections(int achId);
        List<StopPayment> GetAchStopPayments(int customerId);
        bool DeleteAchStopPayment(int stopPaymentId);
        bool UpsertAchStopPayment(StopPayment stopPayment);
    }
}