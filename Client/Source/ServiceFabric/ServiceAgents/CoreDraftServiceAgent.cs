using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Drafts;
using FCSAmerica.Transact.Client.Models.Payment;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceAgents.MockFactories;
using FCSAmerica.Transact.ServiceModels;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FCSAmerica.Transact.ServiceAgents
{

    public partial class ServiceAgent : ICoreDraftServiceAgent
    {
        public List<CounterDraft> GetCounterDrafts(int customerId)
        {
            var requestUrl = "counterdraft/" + customerId;
            var offices = GetOffices();
            var counterDrafts = ExecuteGet<List<CounterDraftServiceModel>>(requestUrl, _ecsSettings.CoreDraftApi);
            return counterDrafts.Select(x => DraftMappingHelper.MapCounterDraftServiceModelToClientModel(x, offices)).ToList();
        }
        public bool DeleteCounterDraft(int counterDraftId)
        {
            if (counterDraftId <= 0)
            {
                return false;
            }

            var requestUrl = $"counterdraft/{counterDraftId}";

            try
            {
                ExecuteDelete(requestUrl, _ecsSettings.CoreDraftApi);
                return true;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error deleting Counter Draft with DraftId {counterDraftId}: {e}");
                return false;
            }
        }
        public bool InsertCounterDraft(CounterDraft newCounterDraft)
        {
            if (newCounterDraft == null)
            {
                return false;
            }

            var requestUrl = "counterdraft";

            try
            {
                var mappedCounterDraft = DraftMappingHelper.MapCounterDraftClientModelToServiceModel(newCounterDraft);

                var counterDraftId = ExecutePutOrPost<int, CounterDraftServiceModel>(requestUrl, _ecsSettings.CoreDraftApi, Method.POST, mappedCounterDraft);
                return counterDraftId > 0;

            }
            catch (Exception e)
            {
                _logUtility.Error($"Error inserting Counter Draft record: {e}");
                return false;
            }
        }
        public List<Draft> GetGeneralDrafts(DraftSearch searchObject)
        {
            if (searchObject == null)
            {
                return null;
            }

            var draftList = new List<Draft>();

            try
            {
                var requestUrl = "draft";

                var mappedSearchObject = DraftMappingHelper.MapSearchObjectClientModelToServiceModel(searchObject);

                var draftFiles = ExecutePutOrPost<List<DraftFileRow>, DraftSearchServiceModel>(requestUrl, _ecsSettings.CoreDraftApi, Method.POST, mappedSearchObject);

                draftFiles.ForEach(draft =>
                {
                    draftList.Add(new Draft
                    {
                        Account = new Account
                        {
                            AccountNumber = draft.Account
                        },
                        Amount = draft.Amount,
                        AuditInfo = new AuditInfo
                        {
                            CreatedOn = draft.CreatedOn
                        },
                        Bank = new Bank
                        {
                            BankName = draft.BankIndicator
                        },
                        Cif = !string.IsNullOrEmpty(draft.Cif) ? int.Parse(draft.Cif) : 0,
                        Date = draft.CreatedOn,
                        DraftId = draft.DraftId,
                        DraftNumber = draft.DraftNumber ?? 0,
                        Status = DraftStatus.Active
                    });
                });

                return draftList;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error getting draft search record: {e}");
                return null;
            }
        }
        public bool DeleteDraft(int draftId)
        {
            if (draftId <= 0)
            {
                return false;
            }

            var requestUrl = $"draft/{draftId}";

            try
            {
                ExecuteDelete(requestUrl, _ecsSettings.CoreDraftApi);
                return true;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error deleting Draft with DraftId {draftId}: {e}");
                return false;
            }

        }
        public bool UpdateDraft(Draft editedDraft)
        {
            if (editedDraft == null || editedDraft.DraftId <= 0)
            {
                return false;
            }

            var requestUrl = $"draft/editDraft";

            try
            {
                var draftFile = DraftMappingHelper.MapDraftToEditDraftServiceModel(editedDraft);
                var ret = ExecutePutOrPost<int, EditDraftServiceModel>(requestUrl, _ecsSettings.CoreDraftApi, Method.POST, draftFile);
                return ret > 0;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error deleting Draft with DraftId {editedDraft.DraftId}: {e}");
                return false;
            }
        }
        public List<StopPayment> GetDraftStopPayments(int customerId)
        {
            if (customerId <= 0)
            {
                return null;
            }

            var requestUrl = $"StopPayments/customers/{customerId}";

            var stopPayments = ExecuteGet<List<DraftStopPaymentServiceModel>>(requestUrl, _ecsSettings.CoreDraftApi);

            return stopPayments?.Select(DraftMappingHelper.MapStopPaymentServiceModelToClientModel).ToList();
        }
        public bool DeleteDraftStopPayment(int stopPaymentId)
        {
            if (stopPaymentId <= 0)
            {
                return false;
            }

            var requestUrl = $"StopPayments/{stopPaymentId}";

            try
            {
                ExecuteDelete(requestUrl, _ecsSettings.CoreDraftApi);
                return true;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error deleting Draft Stop Payment record: {e}");
                return false;
            }
        }
        public bool UpsertDraftStopPayment(StopPayment stopPayment)
        {
            if (stopPayment == null)
            {
                return false;
            }

            var requestUrl = "StopPayments";

            try
            {
                var function = stopPayment.StopPaymentId == 0 ? Method.POST : Method.PUT;
                var stopPaymentRequest = DraftMappingHelper.MapStopPaymentClientModelToServiceModel(stopPayment);
                var stopPaymentId = ExecutePutOrPost<int, DraftStopPaymentServiceModel>(requestUrl, _ecsSettings.CoreDraftApi, function, stopPaymentRequest);
                return stopPaymentId > 0;

            }
            catch (Exception e)
            {
                var function = stopPayment.StopPaymentId == 0 ? "inserting" : "updating";
                _logUtility.Error($"Error {function} Draft Stop Payment record: {e}");
                return false;
            }

        }
        public List<DraftTransaction> GetDraftTransactions(int customerId)
        {
            try
            {
                var requestUrl = $"draft/{customerId}";

                var results = ExecuteGet<List<DraftTransactionServiceModel>>(requestUrl, _ecsSettings.CoreDraftApi);

                var draftTransaction = new List<DraftTransaction>();
                foreach (var draftTransactionServiceModel in results)
                {
                    draftTransaction.Add(
                        DraftMappingHelper.MapDraftTransactionServiceModelToDraftTransaction(draftTransactionServiceModel));
                }

                return draftTransaction;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error getting Draft transactions: {e}");
                return null;
            }
        }
        public List<DraftRejection> GetDraftRejections()
        {
            try
            {
                var requestUrl = "rejectdraft";

                var results = ExecuteGet<List<DraftRejectionServiceModel>>(requestUrl, _ecsSettings.CoreDraftApi);

                var draftRejections = new List<DraftRejection>();
                foreach (var draftRejectionServiceModel in results)
                {
                    draftRejections.Add(DraftMappingHelper.MapDraftRejectionServiceModelToDraftRejection(draftRejectionServiceModel));
                }

                return draftRejections;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error getting Draft rejections: {e}");
                return null;
            }
        }
        public void RejectDraftTransaction(DraftRejection draftRejection)
        {
            if (draftRejection != null)
            {
                try
                {
                    var requestUrl = "rejectdraft";

                    var mappedReject = DraftMappingHelper.MapDraftRejectionToDraftRejectionServiceModel(draftRejection);

                    ExecutePutOrPost<int, DraftRejectionServiceModel>(requestUrl, _ecsSettings.CoreDraftApi,
                        Method.POST,
                        mappedReject);
                }
                catch (Exception e)
                {
                    _logUtility.Error($"Error rejecting Draft: {e}");
                }
            }
        }
        public void DeleteDraftRejection(int draftId)
        {
            if (draftId > 0)
            {
                try
                {
                    var requestUrl = "rejectdraft";

                    ExecuteDelete($"{requestUrl}/{draftId}", _ecsSettings.CoreDraftApi);
                }
                catch (Exception e)
                {
                    _logUtility.Error($"Error deleting Draft rejection: {e}");
                }
            }
        }
        public List<DraftImage> GetDraftImages(string draftIds)
        {
            try
            {
                var requestUrl = $"draft/images/{draftIds}";

                var result = ExecuteGet<List<DraftImageServiceModel>>(requestUrl, _ecsSettings.CoreDraftApi);
                var itemImages = new List<DraftImage>();
                if (result.Any())
                {
                    foreach (var item in result)
                    {
                        itemImages.Add(DraftMappingHelper.MapItemImageServiceModelToClientModel(item));
                    }

                }

                return itemImages;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error getting Item Images: {e}");
                return null;
            }
        }
    }
}
