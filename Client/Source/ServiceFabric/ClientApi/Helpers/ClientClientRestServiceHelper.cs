using Newtonsoft.Json;
using RestSharp;
using System;
using System.Net;
using System.Web;

namespace FCSAmerica.Transact.Client.Api.Helpers
{
    public class ClientClientRestServiceHelper : IClientRestServiceHelper
    {
        //private SecurityContext _securityContext;

        public ClientClientRestServiceHelper(string url)
        {
            Url = url;
        }

        protected string Url { get; set; }

        private string Authorization { get; set; }

        private string FcsaAudit { get; set; }

        public virtual IRestClient GetClient(bool forceServiceToken = false, string partnerNameToUse = "")
        {
            //_securityContext = SecurityContext.GetInstance("Transact.UI", "FCSA");

            //Authorization = _securityContext.ServiceToken;
            //FcsaAudit = _securityContext.AuditInfo;

            var client = new RestClient(Url);

            //if (Authorization != null)
            //{
            //    //client.AddDefaultHeader("Authorization", Authorization);
            //}

            //if (FcsaAudit != null)
            //{
            //    //client.AddDefaultHeader("FCSA-Audit", FcsaAudit);
            //}

            return client;
        }

        public IRestRequest CreateRestRequest(string resource, Method method)
        {
            var request = new RestRequest(resource, method);
            request.AddHeader("Content-Type", "application/json");
            request.RequestFormat = DataFormat.Json;
            return request;
        }

        public T Execute<T>(IRestRequest request, bool forceServiceToken = false, string partnerNameToUse = "")
        {
            var response = ExecuteRequest(request, forceServiceToken, partnerNameToUse);

            return string.IsNullOrEmpty(response.Content) ? default(T) : JsonConvert.DeserializeObject<T>(response.Content);
        }

        public RestSharp.IRestResponse Execute<IRestResponse>(IRestRequest request)
        {
            var response = ExecuteRequest(request, false, "");

            return response;
        }

        public void Execute(IRestRequest request)
        {
            ExecuteRequest(request);
        }

        private static bool IsSuccessCode(HttpStatusCode code)
        {
            var intCode = (int)code;
            return intCode >= 200 && intCode < 300;
        }

        private IRestResponse ExecuteRequest(IRestRequest request, bool forceServiceToken = false, string partnerNameToUse = "")
        {
            var client = GetClient(forceServiceToken, partnerNameToUse);
            client.Timeout = 3600000; // wait one hour. 

            var response = client.Execute(request);

            if (response.ErrorException != null)
            {
                throw response.ErrorException;
            }

            if (!IsSuccessCode(response.StatusCode))
            {
                string absoluteUri;

                try
                {
                    absoluteUri = client.BuildUri(request).AbsoluteUri;
                }
                catch (Exception)
                {
                    absoluteUri = "Unknown Uri";
                }

                throw new HttpException((int)response.StatusCode, $"{absoluteUri} - {response.StatusDescription}");
            }

            return response;
        }
    }
}
