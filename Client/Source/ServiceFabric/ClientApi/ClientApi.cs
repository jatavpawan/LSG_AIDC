using FCSAmerica.ServiceFabric.Common;
using FCSAmerica.ServiceFabric.Web;
using FCSAmerica.ServiceFabric.Web.Communication;
using FCSAmerica.Transact.Common;
using Microsoft.ServiceFabric.Services.Communication.Runtime;
using System.Collections.Generic;
using System.Fabric;
using System.Fabric.Description;
using System.Linq;

namespace FCSAmerica.Transact.Client.Api
{
    /// <summary>
    /// The FabricRuntime creates an instance of this class for each service type instance. 
    /// </summary>
    internal sealed class ClientApi : BaseStatelessService
    {
        public ClientApi(StatelessServiceContext context, IHealthCheckUtility healthCheckUtility, ILogUtility logUtility)
            : base(context, healthCheckUtility, logUtility)
        { }

        /// <summary>
        /// Optional override to create listeners (like tcp, http) for this service instance.
        /// </summary>
        /// <returns>The collection of listeners.</returns>
        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            var endpoints = Context.CodePackageActivationContext.GetEndpoints();

#if DEBUG
            return endpoints.Where(endpoint => endpoint.Protocol == EndpointProtocol.Http || endpoint.Protocol == EndpointProtocol.Https)
                           .Select(endpoint => new ServiceInstanceListener(
                               serviceContext => new OwinCommunicationListener(Startup.ConfigureApp, serviceContext, endpoint.Name), endpoint.Name));
#else //HTTPS is not required on the cluster.  The load balanced URL is secure through the reverse proxy so there is no need to have HTTPS on the service itself.
            return endpoints.Where(endpoint => endpoint.Protocol == EndpointProtocol.Http)
                           .Select(endpoint => new ServiceInstanceListener(
                               serviceContext => new OwinCommunicationListener(Startup.ConfigureApp, serviceContext, endpoint.Name), endpoint.Name));
#endif

        }
    }
}
