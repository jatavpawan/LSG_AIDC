using System;
using System.Web.Http;
using FCSAmerica.Transact.WebUI.App_Start;
using Microsoft.Practices.Unity.Mvc;
using System.Web.Mvc;
using System.Web.Routing;
using FCSAmerica.McGruff.Core;
using FCSAmerica.Transact.WebUI.Common;

namespace FCSAmerica.Transact.WebUI
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            DependencyResolver.SetResolver(new UnityDependencyResolver(UnityConfig.GetConfiguredContainer()));
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        }

        protected void Application_Error(Object sender, EventArgs e)
        {
            var ex = Server.GetLastError();
            var logger = new LogUtility();
            logger.Error(GetErrorMessage(ex));
        }

        private string GetErrorMessage(Exception ex)
        {
            var securityContext = new SecurityContext();
            return string.Format(
                "Unhandled exception occurred.\n\nRequest Url: {0}\nReferrer Url: {1}\nUser: {2}\n\nException: {3}",
                this.Request.Url,
                this.Request.UrlReferrer == null ? string.Empty : this.Request.UrlReferrer.ToString(),
                securityContext.AuditInfo.EmailAddress,
                ex);
        }
    }
}
