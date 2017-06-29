using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Drafts;
using FCSAmerica.Transact.ServiceAgents;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgentsFacade
{
    public class CoreDraftServiceAgentsFacade : ICoreDraftServiceAgentsFacade
    {
        private readonly ICoreDraftServiceAgent _draftServiceAgent;

        public CoreDraftServiceAgentsFacade(ICoreDraftServiceAgent draftServiceAgent)
        {
            _draftServiceAgent = draftServiceAgent;
        }
        public List<CounterDraft> GetCounterDrafts(int customerId)
        {
            return _draftServiceAgent.GetCounterDrafts(customerId);
        }
        public void Delete(int counterDraftId)
        {
            _draftServiceAgent.DeleteCounterDraft(counterDraftId);
        }
        public bool InsertCounterDraft(CounterDraft newCounterDraft)
        {
            return _draftServiceAgent.InsertCounterDraft(newCounterDraft);
        }
        public List<Draft> GetGeneralDrafts(DraftSearch searchObject)
        {
            return _draftServiceAgent.GetGeneralDrafts(searchObject);
        }
        public bool DeleteDraft(int draftId)
        {
            return _draftServiceAgent.DeleteDraft(draftId);
        }
        public bool UpdateDraft(Draft editedDraft)
        {
            return _draftServiceAgent.UpdateDraft(editedDraft);
        }
        public List<DraftImage> GetDraftImages(string draftIds)
        {
            return _draftServiceAgent.GetDraftImages(draftIds);
        }
        public List<DraftTransaction> GetDraftTransactions(int customerId)
        {
            return _draftServiceAgent.GetDraftTransactions(customerId);
        }
        public void RejectDraftTransaction(DraftRejection draftRejection)
        {
            _draftServiceAgent.RejectDraftTransaction(draftRejection);
        }
        public List<DraftRejection> GetDraftRejections()
        {
            return _draftServiceAgent.GetDraftRejections();
        }
        public void DeleteDraftRejection(int draftId)
        {
            _draftServiceAgent.DeleteDraftRejection(draftId);
        }
    }
}
