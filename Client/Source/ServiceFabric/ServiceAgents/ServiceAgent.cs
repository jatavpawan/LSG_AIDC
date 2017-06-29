using FCSAmerica.CentralCodes;
using FCSAmerica.Common.Library.RestServiceHelper;
using FCSAmerica.ServiceFabric.Common.Authentication;
using FCSAmerica.Transact.ClientCommon;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.Common.Helpers;
using RestSharp;
using System;
using System.Configuration;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent
    {
        private readonly IRestServiceHelperFactory _restServiceHelperFactory;
        private readonly ISecurityContext _securityContext;
        private readonly string _applicationName;
        private readonly IEcsSettings _ecsSettings;
        private readonly ILogUtility _logUtility;
        private readonly IEnumHelper _enumHelper;
        private readonly ICodesManager _codesManager;

        public ServiceAgent(IRestServiceHelperFactory restServiceHelperFactory, ISecurityContext securityContext, IEcsSettings ecsSettings, ILogUtility logUtility, IEnumHelper enumHelper, ICodesManager codesManager)
        {
            _ecsSettings = ecsSettings;
            _logUtility = logUtility;
            _enumHelper = enumHelper;
            _codesManager = codesManager;
            _restServiceHelperFactory = restServiceHelperFactory;
            _securityContext = securityContext;
            _applicationName = ConfigurationManager.AppSettings["ApplicationName"];
        }

        public T ExecuteGet<T>(string requestUrl, string coreApiUri, bool forceServiceToken = false)
        {
            var svcHelper = _restServiceHelperFactory.CreateRestSharpHelper(coreApiUri);
            var request = svcHelper.CreateRestRequest(requestUrl, Method.GET);
            if (!forceServiceToken)
            {
                request.AddHeader("Authorization", _securityContext.UserToken.Current);
                request.AddHeader("FCSA-Audit", _securityContext.AuditInfo.ToString());
            }

            return svcHelper.Execute<T>(request, _applicationName, forceServiceToken);
        }


        public T ExecutePutOrPost<T, TK>(string requestUrl, string coreApiUri, Method method, TK body)
        {
            try
            {
                var svcHelper = _restServiceHelperFactory.CreateRestSharpHelper(coreApiUri);
                var request = svcHelper.CreateRestRequest(requestUrl, method);
                request.AddHeader("Authorization", _securityContext.UserToken.Current);
                request.AddHeader("FCSA-Audit", _securityContext.AuditInfo.ToString());

                if (body != null && (method == Method.POST || method == Method.PUT))
                {
                    request.AddBody(body);
                }

                var results = svcHelper.Execute<T>(request, _applicationName);
                return results;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ExecuteDelete(string requestUrl, string coreApiUri)
        {
            var svcHelper = _restServiceHelperFactory.CreateRestSharpHelper(coreApiUri);
            var request = svcHelper.CreateRestRequest(requestUrl, Method.DELETE);
            request.AddHeader("Authorization", _securityContext.UserToken.Current);
            request.AddHeader("FCSA-Audit", _securityContext.AuditInfo.ToString());

            svcHelper.Execute(request, _applicationName);
        }
    }
}
