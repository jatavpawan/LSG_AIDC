using FCSAmerica.Transact.Client.Common.enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
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
    public partial class ServiceAgent : ICoreAchServiceAgent
    {
        public List<AchApprover> GetAchApprovers()
        {
            //TODO: Add Core call and mapping to get this data

            return CoreAchCacheFactory.GetAchApprovers();
        }

        public List<AchTransaction> GetAchTransactions(int customerId)
        {
            //TODO: Add Core call and mapping to get this data

            return CoreAchCacheFactory.GetCachedTransactions();
        }

        public List<AchTransaction> GetAchTransactions()
        {
            //TODO: Add Core call and mapping to get this data

            return CoreAchCacheFactory.GetCachedTransactions();
        }

        public void RejectAch(AchTransaction achRejection)
        {
            var requestUrl = "Rejects";

            var mappedReject = AchMappingHelper.MapRejectionClientModelToServiceModel(achRejection);

            var rejectId = ExecutePutOrPost<int, AchRejectionServiceModel>(requestUrl, _ecsSettings.CoreAchApi, Method.POST, mappedReject);

            //TODO: Replace with Core GetAchRejectTransactions call (when built)
            CoreAchCacheFactory.DeleteCachedAchRejectionTransaction(achRejection);
        }

        public List<AchTransaction> GetRejectionEligibleAchs(int customerId)
        {
            var achTransactions = GetAchTransactions(customerId).Where(ach => ach.Status == AchStatus.Active).ToList(); //we don't show rejected Achs here

            var results = new List<AchTransaction>();

            achTransactions.ForEach(x =>
            {
                var mappedObject = AchMappingHelper.MapRejectAchDataServiceModelToClientModel(x);

                results.Add(mappedObject);
            });

            return results;
        }

        public BankTemplate GetBankTemplatesById(int bankTemplateId)
        {
            if (bankTemplateId <= 0)
            {
                return null;
            }

            var requestUrl = $"banktemplates/{bankTemplateId}";

            var bankTemplates = ExecuteGet<BankTemplateServiceModel>(requestUrl, _ecsSettings.CoreAchApi);

            return AchMappingHelper.MapBankTemplateServiceModelToClientModel(bankTemplates);
        }
        public List<TransactionTemplate> GetTransactionTemplates(int customerId)
        {
            if (customerId == 0)
            {
                return null;
            }

            var requestUrl = $"transactiontemplates/customers/{customerId}?includeInactive=true";

            var coreTransactionTemplates = ExecuteGet<List<TransactionTemplateServiceModel>>(requestUrl, _ecsSettings.CoreAchApi);

            var accounts = GetAccountsByCustomerId(customerId);

            var transactionTemplates = new List<TransactionTemplate>();

            coreTransactionTemplates.ForEach(t =>
            {
                var transactionTemplate = AchMappingHelper.MapTransactionTemplateServiceModelToClientModel(t);
                transactionTemplate.HowToApply = CoreCodesMappingHelper.MapServiceTransactionTypeToHowToApply(t.TransactionType, GetHowToApplyList(), t.ExcessAmount.HasValue);
                transactionTemplate.Account = AccountMappingHelper.MapAccountServiceModelToTransactionTemplateAccountClientModel(t, accounts.FirstOrDefault(a => a.AccountId == t.AccountId));
                transactionTemplate.AuditInfo = AuditInfoMappingHelper.MapAuditInfo(t.CreatedByName, t.CreatedOn, t.UpdatedByName, t.UpdatedOn, t.ManuallyDeletedByName, t.ManuallyDeletedOn);
                transactionTemplate.BankTemplate = AchMappingHelper.MapTransactionTemplateBankTemplateServiceModelToClientModel(t);

                transactionTemplates.Add(transactionTemplate);
            });

            return transactionTemplates;
        }

        public int CreateTransactionTemplate(TransactionTemplate transactionTemplate)
        {
            if (transactionTemplate == null)
            {
                return -1;
            }

            var serviceTransactionTemplate = AchMappingHelper.MapTransactionTemplateClientToServiceModel(transactionTemplate);

            var requestUrl = $"TransactionTemplates";
            return ExecutePutOrPost<int, TransactionTemplateServiceModel>(requestUrl, _ecsSettings.CoreAchApi, Method.POST, serviceTransactionTemplate);
        }

        public void DeleteTransactionTemplate(int transactionTemplateId)
        {
            var requestUrl = $"TransactionTemplates/{transactionTemplateId}";

            ExecuteDelete(requestUrl, _ecsSettings.CoreAchApi);
        }

        public void DeleteAchRejections(int achId)
        {
            var requestUrl = $"Rejects/{achId}";

            ExecuteDelete(requestUrl, _ecsSettings.CoreAchApi);

            //TODO: Hook up to core library when written
            CoreAchCacheFactory.UpdateCachedAchToRemoveRejection(achId);
        }


        public List<AchTransaction> GetAchRejectionsData()
        {
            var achTransactions = GetAchTransactions(0).Where(item => item.Status == AchStatus.Rejected || item.IsDeletedRejection == true).ToList();
            var results = new List<AchTransaction>();

            achTransactions.ForEach(x =>
            {
                var OlderThan24Hours = (DateTime.Now - x.TransactionDate).TotalHours > 24;

                if (OlderThan24Hours == false)
                {
                    var mappedObject = AchMappingHelper.MapRejectAchDataServiceModelToClientModel(x);

                    var rejectReason = GetAchOlderThan24HoursRejectReasonCodes()
                        .FirstOrDefault(item => item.Id == mappedObject.RejectionReasonId);

                    if (rejectReason != null)
                    {
                        if (rejectReason.Description == "Other")
                        {
                            mappedObject.RejectReasonDescription = x.OtherNote;
                        }
                        else
                        {
                            mappedObject.RejectReasonDescription = rejectReason.Description;
                        }
                    }

                    results.Add(mappedObject);
                }
            });

            return results.ToList();
        }

        public List<StopPayment> GetAchStopPayments(int customerId)
        {
            if (customerId <= 0)
            {
                return null;
            }

            var requestUrl = $"StopPayments/customers/{customerId}";

            var stopPayments = ExecuteGet<List<AchStopPaymentServiceModel>>(requestUrl, _ecsSettings.CoreAchApi);

            return stopPayments?.Select(AchMappingHelper.MapStopPaymentServiceModelToClientModel).ToList();
        }

        public bool DeleteAchStopPayment(int stopPaymentId)
        {
            if (stopPaymentId <= 0)
            {
                return false;
            }

            var requestUrl = $"StopPayments/{stopPaymentId}";

            try
            {
                ExecuteDelete(requestUrl, _ecsSettings.CoreAchApi);
                return true;
            }
            catch (Exception e)
            {
                _logUtility.Error($"Error deleting ACH Stop Payment record: {e}");
                return false;
            }
        }

        public bool UpsertAchStopPayment(StopPayment stopPayment)
        {
            if (stopPayment == null)
            {
                return false;
            }

            var requestUrl = "StopPayments";

            try
            {
                var function = stopPayment.StopPaymentId == 0 ? Method.POST : Method.PUT;
                var stopPaymentRequest = AchMappingHelper.MapStopPaymentClientModelToServiceModel(stopPayment);
                var stopPaymentId = ExecutePutOrPost<int, AchStopPaymentServiceModel>(requestUrl, _ecsSettings.CoreAchApi, function, stopPaymentRequest);
                return stopPaymentId > 0;

            }
            catch (Exception e)
            {
                var function = stopPayment.StopPaymentId == 0 ? "inserting" : "updating";
                _logUtility.Error($"Error {function} ACH Stop Payment record: {e}");
                return false;
            }

        }
    }
}
