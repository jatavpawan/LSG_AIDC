using RestSharp;

namespace FCSAmerica.Transact.Client.Api.Helpers
{
    public interface IClientRestServiceHelper
    {
        IRestClient GetClient(bool forceServiceToken = false, string partnerNameToUse = "");

        IRestRequest CreateRestRequest(string resource, Method method);

        T Execute<T>(IRestRequest request, bool forceServiceToken = false, string partnerNameToUse = "");

        RestSharp.IRestResponse Execute<IRestResponse>(IRestRequest request);

        void Execute(IRestRequest request);
    }
}