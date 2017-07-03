using System.Web.Mvc;
using System.Web.Routing;

namespace FCSAmerica.Transact.WebUI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();

            routes.MapRoute(
                "CatchAll",
                "{*catchall}",
                new
                {
                    Controller = "Home",
                    Action = "Index"
                });
        }
    }
}
