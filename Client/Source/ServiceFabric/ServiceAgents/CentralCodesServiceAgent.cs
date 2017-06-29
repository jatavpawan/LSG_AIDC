using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;
using System.Collections.Generic;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : ICentralCodesServiceAgent
    {
        public List<Holiday> GetHolidays()
        {
            var requestUrl = "holiday/codes";

            var result = ExecuteGet<HolidayRootObjectServiceModel>(requestUrl, _ecsSettings.CentralCodesApi, true);

            var holidays = CentralCodesMappingHelper.MapHolidayRootObjectServiceModelToClientModel(result);

            return holidays;
        }
    }
}
