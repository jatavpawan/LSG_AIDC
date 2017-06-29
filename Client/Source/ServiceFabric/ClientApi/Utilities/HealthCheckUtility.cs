using FCSAmerica.Common.Library.RestServiceHelper;
using FCSAmerica.ServiceFabric.Common;
using FCSAmerica.Transact.Client.Api.Helpers;
using FCSAmerica.Transact.ServiceAgents;
using FCSAmerica.Transact.ClientCommon;
using FCSAmerica.Transact.Common;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Fabric.Health;
using System.Net;
using System.Threading;

namespace FCSAmerica.Transact.Client.Api.Utilities
{
    public class HealthCheckUtility : IHealthCheckUtility
    {
        private readonly IEcsSettings _ecsSettings;
        private readonly ILogUtility _logUtility;
        private readonly IElasticSearchServiceAgent _elasticSearchServiceAgent;
        private readonly IRestServiceHelperFactory _restServiceHelperFactory;

        public HealthCheckUtility(IEcsSettings ecsSettings, IClientRestServiceHelperFactory clientRestHelperFactory, ILogUtility logUtility, IElasticSearchServiceAgent elasticSearchServiceAgent, IRestServiceHelperFactory restServiceHelperFactory)
        {
            _restServiceHelperFactory = restServiceHelperFactory;
            _ecsSettings = ecsSettings;
            _logUtility = logUtility;
            _elasticSearchServiceAgent = elasticSearchServiceAgent;
        }

        public IEnumerable<HealthCheckResponse> PerformAllHealthChecks(CancellationToken cancellationToken)
        {
            var healthCheckResponse = new List<HealthCheckResponse>();

            var applicationName = ConfigurationManager.AppSettings["ApplicationName"];

            //Service Fabric Api Call
            // I am commenting this out for an immediate solution so that ED can get going with his tests, 
            // This needs to be refactored, the latest update to Nuget package for Common requires refactoring the LoggingUtility.

            try
            {
                var restClient = _restServiceHelperFactory.CreateRestSharpHelper(_ecsSettings.CoreAchApi);
                var request = restClient.CreateRestRequest(_ecsSettings.CoreDiagnosticStatusResource, Method.GET);

                var response = restClient.Execute(request, applicationName);

                if (response != null)
                {
                    var coreAchApi = new HealthCheckResponse
                    {
                        HealthCheckType = "Core ACH Api Call",
                        Message = "Checks if Core ACH api is alive.",
                        Status = IsSuccessCode(response.StatusCode)
                    };
                    healthCheckResponse.Add(coreAchApi);
                }
                else
                {
                    healthCheckResponse.Add(
                        new HealthCheckResponse()
                        {
                            HealthCheckType = "Core ACH Api Call",
                            Message = $"Cannot Start Core ACH Api application: {_ecsSettings.CoreAchApi} returned null",
                            Status = HealthState.Error
                        });
                }
            }
            catch (Exception ex)
            {
                healthCheckResponse.Add(
                    new HealthCheckResponse()
                    {
                        HealthCheckType = "Core ACH Api Call",
                        Message = $"Cannot Start Core ACH Api application: {_ecsSettings.CoreAchApi}. Failed with exception: {ex}",
                        Status = HealthState.Error
                    });

                _logUtility.Error($"Cannot Start Core ACH Api application: {_ecsSettings.CoreAchApi}. Failed with exception: {ex}");
            }

            try
            {
                var restClient = _restServiceHelperFactory.CreateRestSharpHelper(_ecsSettings.CoreBankApi);
                var request = restClient.CreateRestRequest($"{_ecsSettings.CoreDiagnosticStatusResource}", Method.GET);

                var response = restClient.Execute(request, applicationName);

                if (response != null)
                {
                    var coreAchApi = new HealthCheckResponse
                    {
                        HealthCheckType = "Core Bank Api Call",
                        Message = "Checks if Core Bank api is alive.",
                        Status = IsSuccessCode(response.StatusCode)
                    };
                    healthCheckResponse.Add(coreAchApi);
                }
                else
                {
                    healthCheckResponse.Add(
                        new HealthCheckResponse()
                        {
                            HealthCheckType = "Core Bank Api Call",
                            Message =
                                $"Cannot Start Core Bank Api application: {_ecsSettings.CoreBankApi} returned null",
                            Status = HealthState.Error
                        });
                }
            }
            catch (Exception ex)
            {
                healthCheckResponse.Add(
                    new HealthCheckResponse()
                    {
                        HealthCheckType = "Core Bank Api Call",
                        Message = $"Cannot Start Core Bank Api application: {_ecsSettings.CoreBankApi}. Failed with exception: {ex}",
                        Status = HealthState.Error
                    });

                _logUtility.Error($"Cannot Start Core Bank Api application: {_ecsSettings.CoreBankApi}. Failed with exception: {ex}");
            }

            try
            {
                var restClient = _restServiceHelperFactory.CreateRestSharpHelper(_ecsSettings.CoreCodesApi);
                var request = restClient.CreateRestRequest($"{_ecsSettings.CoreDiagnosticStatusResource}", Method.GET);

                var response = restClient.Execute(request, applicationName);

                if (response != null)
                {
                    var coreAchApi = new HealthCheckResponse
                    {
                        HealthCheckType = "Core Codes Api Call",
                        Message = "Checks if Core Codes api is alive.",
                        Status = IsSuccessCode(response.StatusCode)
                    };
                    healthCheckResponse.Add(coreAchApi);
                }
                else
                {
                    healthCheckResponse.Add(
                        new HealthCheckResponse()
                        {
                            HealthCheckType = "Core Codes Api Call",
                            Message =
                                $"Cannot Start Core Codes Api application: {_ecsSettings.CoreCodesApi} returned null",
                            Status = HealthState.Error
                        });
                }
            }
            catch (Exception ex)
            {
                healthCheckResponse.Add(
                    new HealthCheckResponse()
                    {
                        HealthCheckType = "Core Codes Api Call",
                        Message = $"Cannot Start Core Codes Api application: {_ecsSettings.CoreCodesApi}. Failed with exception: {ex}",
                        Status = HealthState.Error
                    });

                _logUtility.Error($"Cannot Start Core Codes Api application: {_ecsSettings.CoreCodesApi}. Failed with exception: {ex}");
            }

            //Elastic Search Api Call
            var elasticResponse = _elasticSearchServiceAgent.PingElasticService();

            if (elasticResponse.IsValid)
            {
                var elasticSearchServiceApiCheck = new HealthCheckResponse
                {
                    HealthCheckType = "Elastic Search Api Call",
                    Message = "Checks if Elastic Search api is alive.",
                    Status = HealthState.Ok,
                };

                healthCheckResponse.Add(elasticSearchServiceApiCheck);
            }
            else
            {
                healthCheckResponse.Add(
                    new HealthCheckResponse()
                    {
                        HealthCheckType = "Elastic Search Api Call",
                        Message = $"Cannot Ping Elastic Service: {_ecsSettings.ElasticSearchServer}. Failed with exception: {elasticResponse.OriginalException?.Message}",
                        Status = HealthState.Error
                    });

                _logUtility.Error($"Cannot Ping Elastic Service: {_ecsSettings.ElasticSearchServer}. Failed with exception: {elasticResponse.OriginalException?.Message}");
            }

            //Another service call

            return healthCheckResponse;
        }

        private HealthState IsSuccessCode(HttpStatusCode code)
        {
            var intCode = (int)code;
            return (intCode >= 200 && intCode < 300 ? HealthState.Ok : HealthState.Error);
        }
    }
}
