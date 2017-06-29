using FcsAmerica.Transact.RestServiceAgents;
using FCSAmerica.Transact.RestServiceAgents.Models;
using RestSharp;

namespace FCSAmerica.Transact.RestServiceAgents
{
    public class CentralCodesServiceAgent
    {
        public HolidayRootObject GetHolidays(string centralCodesApiRoot)
        {
            var requestUrl = string.Format("holiday/codes", false);
            var centralCodesSvcHelper = RestServiceHelperFactory.CreateRestSharpHelper(centralCodesApiRoot);
            var request = RestRequestFactory.CreateRestRequest(requestUrl, Method.GET);
            var holidays = centralCodesSvcHelper.Execute<HolidayRootObject>(request, true, string.Empty);

            return holidays;
        }
    }
}
