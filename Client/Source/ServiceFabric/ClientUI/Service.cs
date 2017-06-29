// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------


using System.Fabric.Description;
using System.Linq;

namespace FCSAmerica.Transact.Client.UI.WebService
{
    using Microsoft.ServiceFabric.Services.Communication.Runtime;
    using Microsoft.ServiceFabric.Services.Runtime;
    using System.Collections.Generic;
    using System.Fabric;


    public class Service : StatelessService
    {
        public const string ServiceTypeName = "WebUIType";

        public Service(StatelessServiceContext serviceContext) : base(serviceContext)
        {
        }


        protected override IEnumerable<ServiceInstanceListener> CreateServiceInstanceListeners()
        {
            var endpoints = Context.CodePackageActivationContext.GetEndpoints();

#if DEBUG
            return endpoints.Where(endpoint => endpoint.Protocol == EndpointProtocol.Http || endpoint.Protocol == EndpointProtocol.Https)
                           .Select(endpoint => new ServiceInstanceListener(
                               serviceContext => new WebCommunicationListener("WebUI", serviceContext, endpoint.Name), endpoint.Name));
#else //HTTPS is not required on the cluster.  The load balanced URL is secure through the reverse proxy so there is no need to have HTTPS on the service itself.
            return endpoints.Where(endpoint => endpoint.Protocol == EndpointProtocol.Http)
                           .Select(endpoint => new ServiceInstanceListener(
                               serviceContext => new WebCommunicationListener("WebUI", serviceContext, endpoint.Name), endpoint.Name));
#endif
        }
    }
}