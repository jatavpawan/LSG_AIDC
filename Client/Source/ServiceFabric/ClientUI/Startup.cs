// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

using System.Threading.Tasks;
using System.Web.Http;

namespace FCSAmerica.Transact.Client.UI
{
    using Microsoft.Owin;
    using Microsoft.Owin.FileSystems;
    using Microsoft.Owin.Security;
    using Microsoft.Owin.Security.Cookies;
    using Microsoft.Owin.Security.WsFederation;
    using Microsoft.Owin.StaticFiles;
    using Owin;

    public class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            PhysicalFileSystem physicalFileSystem = new PhysicalFileSystem(@".\wwwroot");

            FileServerOptions fileOptions = new FileServerOptions();

            fileOptions.EnableDefaultFiles = true;
            fileOptions.RequestPath = PathString.Empty;
            fileOptions.FileSystem = physicalFileSystem;
            fileOptions.DefaultFilesOptions.DefaultFileNames = new[] { "index.html" };
            fileOptions.StaticFileOptions.FileSystem = physicalFileSystem;
            fileOptions.StaticFileOptions.ServeUnknownFileTypes = true;

            appBuilder.UseFileServer(fileOptions);

            appBuilder.UseCookieAuthentication(
            new CookieAuthenticationOptions
            {
                AuthenticationType = CookieAuthenticationDefaults.AuthenticationType
            });

            appBuilder.UseWsFederationAuthentication(
            new WsFederationAuthenticationOptions
            {
                MetadataAddress = "https://devsts.fcsamerica.net/FederationMetadataRP/2007-06/FederationMetadata.xml",
                Wtrealm = "localhost:TransactSF",
                Notifications = new WsFederationAuthenticationNotifications
                {
                    RedirectToIdentityProvider = (context) =>
                    {
                        context.ProtocolMessage.Whr = "fcsamerica.com";
                        return Task.FromResult(0);
                    }
                }
            });

            appBuilder.SetDefaultSignInAsAuthenticationType(CookieAuthenticationDefaults.AuthenticationType);


            // Configure Web API for self-host. 
            HttpConfiguration config = new HttpConfiguration();

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //config.EnableSwagger(c => c.SingleApiVersion("v2", "TranactCore Service Fabric - Drafts"))
            //    .EnableSwaggerUi();

            //UnityConfig.RegisterComponents(config);

            appBuilder.UseWebApi(config);
        }
    }
}