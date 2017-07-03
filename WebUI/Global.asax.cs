using System;
using System.Web.Http;
using FCSAmerica.Transact.WebUI.App_Start;
using Microsoft.Practices.Unity.Mvc;
using System.Web.Mvc;
using System.Web.Routing;
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
        }
    }
}
