using FCSAmerica.McGruff.Core;
using Newtonsoft.Json;
using RestSharp;
using System;
using System.Net;
using System.Web;

namespace FCSAmerica.Transact.RestServiceAgents
{
    public class RestServiceHelper
    {
        private ISecurityContext _securityContext;

        public RestServiceHelper(string url)
        {
            Url = url;
        }

        protected string Url { get; set; }

        public string Authorization { get; set; }

        private string FcsaAudit { get; set; }

        public virtual IRestClient GetClient(bool forceServiceToken, string partnerNameToUse)
        {
            _securityContext = new SecurityContext();

            if (!forceServiceToken)
            {
                if (_securityContext.UserToken != null)
                {
                    if (!String.IsNullOrEmpty(_securityContext.UserToken.ToString()))
                    {
                        Authorization = _securityContext.UserToken.ToString();
                    }
                }
            }

            if (string.IsNullOrEmpty(Authorization))
            {
                Authorization = _securityContext.ServiceToken.ToString();
            }

            FcsaAudit = !string.IsNullOrEmpty(partnerNameToUse) ? _securityContext.ServiceToken.AuditInfo(partnerNameToUse).ToString() : _securityContext.AuditInfo.ToString();

            var client = new RestClient(Url);

            if (Authorization != null)
            {
                client.AddDefaultHeader("Authorization", Authorization);
            }

            if (FcsaAudit != null)
            {
                client.AddDefaultHeader("FCSA-Audit", FcsaAudit);
            }

            return client;
        }

        public T Execute<T>(RestRequest request, bool forceServiceToken, string partnerNameToUse)
        {
            var response = ExecuteRequest(request, forceServiceToken, partnerNameToUse);

            return string.IsNullOrEmpty(response.Content) ? default(T) : JsonConvert.DeserializeObject<T>(response.Content);
        }

        public T Execute<T>(RestRequest request)
        {
            return Execute<T>(request, false, String.Empty);
        }

        public void Execute(RestRequest request)
        {
            ExecuteRequest(request);
        }

        public IRestResponse Execute(RestRequest request, bool forceServiceToken, string partnerNameToUse)
        {
            return ExecuteRequest(request, forceServiceToken, partnerNameToUse);
        }

        private static bool IsSuccessCode(HttpStatusCode code)
        {
            var intCode = (int)code;
            return intCode >= 200 && intCode < 300;
        }

        public byte[] ExecuteDownloadRequest(RestRequest request, bool forceServiceToken = false,
            string partnerNameToUse = "")
        {
            var client = GetClient(forceServiceToken, partnerNameToUse);
            client.Timeout = 3600000; // wait one hour. 

            var response = client.DownloadData(request);

            if (response == null)
            {
                throw new Exception("No Download Available");
            }

            return response;
        }

        private IRestResponse ExecuteRequest(RestRequest request, bool forceServiceToken = false, string partnerNameToUse = "")
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

                throw new HttpException((int)response.StatusCode, string.Format("{0} - {1}", absoluteUri, response.StatusDescription));
            }

            return response;
        }
    }
}
