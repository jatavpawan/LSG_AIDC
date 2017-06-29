using System;
using System.Web;
using System.Web.Mvc;
using FCSAmerica.McGruff.Core;

namespace FCSAmerica.Transact.WebUI.Common
{
    [AttributeUsage(AttributeTargets.All)]
    public sealed class AppExceptionsAttribute : HandleErrorAttribute, IExceptionFilter
    {
        private readonly ILogUtility _logUtility;
        private readonly ISecurityContext _securityContext;

        public AppExceptionsAttribute(ILogUtility logUtility, ISecurityContext securityContext)
        {
            _logUtility = logUtility;
            _securityContext = securityContext;
        }

        public override void OnException(ExceptionContext filterContext)
        {
            if (filterContext == null)
            {
                throw new ArgumentNullException(nameof(filterContext));
            }

            if (filterContext.HttpContext.Request.Headers["X-Requested-With"] == "XMLHttpRequest")
            {
                filterContext.Result = new JsonResult
                {
                    JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                    Data = new
                    {
                        error = true,
                        message = filterContext.Exception.Message
                    }
                };
            }
            else
            {
                var controllerName = (string)filterContext.RouteData.Values["controller"];
                var actionName = (string)filterContext.RouteData.Values["action"];
                var model = new HandleErrorInfo(filterContext.Exception, controllerName, actionName);

                filterContext.Result = new ViewResult
                {
                    ViewName = "Error",
                    ViewData = new ViewDataDictionary<HandleErrorInfo>(model),
                    TempData = filterContext.Controller.TempData
                };
            }

            _logUtility.Error(GetErrorMessage(filterContext.Exception));

            filterContext.ExceptionHandled = true;
            filterContext.HttpContext.Response.Clear();
            filterContext.HttpContext.Response.StatusCode = 500;

            filterContext.HttpContext.Response.TrySkipIisCustomErrors = true;
        }

        private string GetErrorMessage(Exception ex)
        {
            return string.Format(
                "{0}.\n\nRequest Url: {1}\nReferrer Url: {2}\nUser: {3}\n\nException: {4}",
                "Application exception occurred.",
                HttpContext.Current.Request.Url,
                HttpContext.Current.Request.UrlReferrer == null
                    ? string.Empty
                    : HttpContext.Current.Request.UrlReferrer.ToString(),
                _securityContext.AuditInfo.EmailAddress,
                ex);
        }
    }
}
