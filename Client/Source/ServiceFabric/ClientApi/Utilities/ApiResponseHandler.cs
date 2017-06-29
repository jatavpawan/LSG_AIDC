using FCSAmerica.Transact.Common;
using System;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FCSAmerica.Transact.ServiceFabricWebApi.Utilities
{
    public class ApiResponseHandler
    {
        public static HttpResponseException Error(Exception e, ILogUtility logUtility)
        {
            var contextMessage = string.Empty;
            if (HttpContext.Current != null)
            {
                contextMessage = $"{HttpContext.Current.Request.HttpMethod} {HttpContext.Current.Request.Url}";
            }
            logUtility.Error($"InternalServerError {contextMessage} - {e}");
            var message = new HttpResponseMessage(HttpStatusCode.InternalServerError)
            {
                ReasonPhrase = e.Message.Replace("\n", " ").Replace("\r", "")
            };

            return new HttpResponseException(message);
        }
    }
}
