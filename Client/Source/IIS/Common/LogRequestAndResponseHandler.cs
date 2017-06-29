using FCSAmerica.McGruff.Core;
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace FCSAmerica.Transact.WebUI.Common
{
    public class LogRequestAndResponseHandler : DelegatingHandler
    {
        private readonly ILogUtility _logUtility;

        public LogRequestAndResponseHandler(ILogUtility logUtility)
        {
            _logUtility = logUtility;
        }

        protected override async Task<HttpResponseMessage> SendAsync(
            HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var securityContext = new SecurityContext();
            _logUtility.SetCorrelationUniqueId(Guid.NewGuid().ToString());

            // log request body
            string requestBody = await request.Content.ReadAsStringAsync();

            _logUtility.Info($"FCSAmerica.Transact.WebUI Request: {securityContext.AuditInfo.EmailAddress} {request.Method} {request.RequestUri} {requestBody}");

            // let other handlers process the request
            var result = await base.SendAsync(request, cancellationToken);

            if (result.Content != null)
            {
                // once response body is ready, log it
                var responseBody = await result.Content.ReadAsStringAsync();

                _logUtility.Info($"FCSAmerica.Transact.WebUI Response: {securityContext.AuditInfo.EmailAddress} {result.StatusCode} {responseBody}");
            }

            return result;
        }
    }
}
