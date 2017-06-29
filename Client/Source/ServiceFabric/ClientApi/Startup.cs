using FCSAmerica.ServiceFabric.Common.Authentication;
using FCSAmerica.ServiceFabric.Web.Middleware;
using Owin;
using Swashbuckle.Application;
using System.Configuration;
using System.Web.Http;
using Unity.WebApi;

namespace FCSAmerica.Transact.Client.Api
{
    public static class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public static void ConfigureApp(IAppBuilder appBuilder)
        {
            // Configure Web API for self-host. 
            var config = new HttpConfiguration();
            config.EnableCors();

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { action = "get", id = RouteParameter.Optional }
            );

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.EnableSwagger(c => c.SingleApiVersion("v2", "TranactCore Service Fabric - ClientApi"))
                .EnableSwaggerUi();

            var container = UnityConfig.GetContainer();
            config.DependencyResolver = new UnityDependencyResolver(container);
            config.EnsureInitialized();
            var middlewareInfo = new MiddlewareInfo(ConfigurationManager.AppSettings["EnterpriseLoggingTraceSourceName"]);
            var claimsMapperInfo = new ClaimsMapperInfo(ConfigurationManager.AppSettings["ServiceFabricHost"],
                ConfigurationManager.AppSettings["SigningCertificate"],
                ConfigurationManager.AppSettings["IssuerName"],
                ConfigurationManager.AppSettings["ClaimsMapperUri"],
                ConfigurationManager.AppSettings["ApplicationName"],
                ConfigurationManager.AppSettings["RelyingParty"]);

            appBuilder.Use<OwinContextMiddleware>(middlewareInfo);
            appBuilder.Use<SecurityContextMiddleware>(middlewareInfo, claimsMapperInfo);
            appBuilder.Use<LoggingMiddleware>(middlewareInfo, container);

            appBuilder.UseWebApi(config);
        }
    }
}
