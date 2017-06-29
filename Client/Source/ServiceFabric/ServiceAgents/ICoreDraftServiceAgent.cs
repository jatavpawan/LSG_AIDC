using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Drafts;
using FCSAmerica.Transact.Client.Models.Payment;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface ICoreDraftServiceAgent
    {
        List<CounterDraft> GetCounterDrafts(int customerId);
        bool DeleteCounterDraft(int counterDraftId);
        bool InsertCounterDraft(CounterDraft newCounterDraft);
        List<Draft> GetGeneralDrafts(DraftSearch searchObject);
        bool DeleteDraft(int draftId);
        bool UpdateDraft(Draft editedDraft);
        List<StopPayment> GetDraftStopPayments(int customerId);
        bool DeleteDraftStopPayment(int stopPaymentId);
        bool UpsertDraftStopPayment(StopPayment stopPayment);
        List<DraftTransaction> GetDraftTransactions(int customerId);
        void RejectDraftTransaction(DraftRejection draftRejection);
        List<DraftRejection> GetDraftRejections();
        void DeleteDraftRejection(int draftId);
        List<DraftImage> GetDraftImages(string draftIds);
    }
}
