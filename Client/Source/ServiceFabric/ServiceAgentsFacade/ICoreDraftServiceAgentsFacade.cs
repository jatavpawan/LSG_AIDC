using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Drafts;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public interface ICoreDraftServiceAgentsFacade
    {
        List<CounterDraft> GetCounterDrafts(int customerId);
        void Delete(int counterDraftId);
        bool InsertCounterDraft(CounterDraft newCounterDraft);
        List<Draft> GetGeneralDrafts(DraftSearch searchObject);
        bool DeleteDraft(int draftId);
        bool UpdateDraft(Draft editedDraft);
        List<DraftTransaction> GetDraftTransactions(int customerId);
        void RejectDraftTransaction(DraftRejection draftRejection);
        List<DraftRejection> GetDraftRejections();
        void DeleteDraftRejection(int draftId);
        List<DraftImage> GetDraftImages(string draftIds);
    }
}
