using RestSharp;

namespace FcsAmerica.Transact.RestServiceAgents
{
    public static class RestRequestFactory
    {
        public static RestRequest CreateRestRequest(string resource, Method method)
        {
            var request = new RestRequest(resource, method);
            request.AddHeader("Content-Type", "application/json");
            request.RequestFormat = DataFormat.Json;
            return request;
        }
    }
}