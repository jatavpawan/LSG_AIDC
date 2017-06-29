using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;
using RestSharp;
using System;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICoreBankTemplateServiceAgent
    {
        public List<BankTemplate> GetBankTemplates(int customerId)
        {
            if (customerId == 0)
            {
                return null;
            }
            var requestUrl = $"banktemplates/customers/{customerId}?includeInactive=true";

            var bankTemplates = ExecuteGet<List<BankTemplateServiceModel>>(requestUrl, _ecsSettings.CoreAchApi);

            var results = new List<BankTemplate>();

            bankTemplates.ForEach(x =>
            {
                var abaData = GetAbaBankInfo(x.AbaRoutingNumber);
                var mapped = AchMappingHelper.MapBankTemplateServiceModelToClientModel(x);

                mapped.BankAccountType = GetBankAccountType(x.BankAccountTypeId);
                mapped.AuditInfo = new AuditInfo
                {
                    CreatedOn = DateTime.Parse(x.CreatedOn),
                    CreatedBy = x.CreatedBy,
                    UpdatedOn = DateTime.Parse(x.UpdatedOn),
                    UpdatedBy = x.UpdatedBy
                };
                mapped.BankName = abaData?.Name;
                mapped.City = abaData?.City;
                mapped.State = abaData?.State;

                results.Add(mapped);
            });

            return results;
        }


        public int InsertBankTemplate(BankTemplate bankTemplate)
        {
            if (bankTemplate == null)
            {
                return -1;
            }

            var serviceBankTemplate = AchMappingHelper.MapBankTemplateClientModelToServiceModel(bankTemplate);

            var requestUrl = $"banktemplates";
            return ExecutePutOrPost<int, BankTemplateServiceModel>(requestUrl, _ecsSettings.CoreAchApi, Method.POST, serviceBankTemplate);
        }

        public void DeleteBankTemplate(int bankTemplateId)
        {
            if (bankTemplateId <= 0)
            {
                return;
            }
            var requestUrl = $"banktemplates/{bankTemplateId}";

            ExecuteDelete(requestUrl, _ecsSettings.CoreAchApi);

        }
    }
}
