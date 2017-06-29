using System;
using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models.InternalTransfers;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;
using RestSharp;
using System.Linq;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreInternalTransferServiceAgent
    {
        public bool IsForm2279Required(int fromCustomerId, long fromAccountId, int toCustomerId, long toAccountId, ScheduleType scheduleType)
        {
            var requestUrl = $"TransactionTemplates/form2279Required/{fromCustomerId}/{fromAccountId}/{toCustomerId}/{toAccountId}/{scheduleType}";

            var result = ExecuteGet<bool>(requestUrl, _ecsSettings.CoreInternalTransferApi);

            return result;
        }

        public int InsertTransactionTemplate(TransferTemplate template)
        {
            if (template == null)
            {
                return -1;
            }

            var serviceTemplate = InternalTransferMappingHelper.MapInternalTransferTransactionTemplateClientModelToServiceModel(template);

            var requestUrl = $"TransactionTemplates";

            return ExecutePutOrPost<int, InternalTransferTransactionTemplateServiceModel>(requestUrl,
                _ecsSettings.CoreInternalTransferApi, Method.POST, serviceTemplate);
        }

        public List<TransferTemplate> GetTransfersByCustomer(int customerId)
        {
            var requestUrl = $"TransactionTemplates/customers/{customerId}";

            var templates = ExecuteGet<List<InternalTransferTransactionTemplateServiceModel>>(requestUrl, _ecsSettings.CoreInternalTransferApi);
            var customers = GetCustomersForTransferTemplates(templates);
            
            var result = templates.Select(t => MapServiceModelToClientModel(t, customers)).ToList();

            return result;
        }
        public void DeleteTransfer(int transferId)
        {
            var requestUrl = $"TransactionTemplates/{transferId}";

            ExecuteDelete(requestUrl, _ecsSettings.CoreInternalTransferApi);
            
        }

        private TransferTemplate MapServiceModelToClientModel(InternalTransferTransactionTemplateServiceModel serviceModel, List<Client.Models.Customer> customers)
        {
            var fromCustomer = customers.FirstOrDefault(c => c.Id == serviceModel.FromCustomerId);
            var toCustomer = customers.FirstOrDefault(c => c.Id == serviceModel.ToCustomerId);
            var fromAccount = fromCustomer?.AccountNumbers.FirstOrDefault(a => a.AccountId == serviceModel.FromAccountId);
            var toAccount = toCustomer?.AccountNumbers.FirstOrDefault(a => a.AccountId == serviceModel.ToAccountId);
            var howToApplyList = GetHowToApplyList();
            var otherFeeList = GetOtherFees();

            var transactionTemplate = InternalTransferMappingHelper.MapInternalTransferTransactionTemplateServiceModelToClientModel(serviceModel, fromCustomer, toCustomer, fromAccount, toAccount, howToApplyList, otherFeeList);

            if (serviceModel.ScheduleType != ScheduleType.OneTime)
            {
                transactionTemplate.Schedule.NextPaymentDates = GetProcessingDates(transactionTemplate.Schedule);
            }
                
            return transactionTemplate;
        }

        private List<Client.Models.Customer> GetCustomersForTransferTemplates(List<InternalTransferTransactionTemplateServiceModel> templates)
        {
            var fromCustomerIds = templates.Select(t => t.FromCustomerId);
            var toCustomerIds = templates.Select(t => t.ToCustomerId);
            var uniqueCustomerIds = fromCustomerIds.Concat(toCustomerIds).Distinct();
            var customers = uniqueCustomerIds.Select(GetByCustomerId).Where(c => c != null).ToList();

            return customers;
        }

    }
}