// ------------------------------------------------------------
//  Copyright (c) Microsoft Corporation.  All rights reserved.
//  Licensed under the MIT License (MIT). See License.txt in the repo root for license information.
// ------------------------------------------------------------

using System.Security.Claims;

namespace FCSAmerica.Transact.Client.UI
{
    using System;
    using System.Fabric;
    using System.Fabric.Description;
    using System.Globalization;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.Owin.Hosting;
    using Microsoft.ServiceFabric.Services.Communication.Runtime;

    public class WebCommunicationListener : ICommunicationListener
    {
        private readonly string appRoot;
        private readonly ServiceContext serviceInitializationParameters;
        private string listeningAddress;
        private string publishAddress;
        private readonly string endpointName;
        // OWIN server handle.
        private IDisposable webApp;

        public WebCommunicationListener(string appRoot, ServiceContext serviceInitializationParameters, string endpointName)
        {
            this.appRoot = appRoot;
            this.serviceInitializationParameters = serviceInitializationParameters;
            this.endpointName = endpointName;
        }

        public Task<string> OpenAsync(CancellationToken cancellationToken)
        {
            ServiceEventSource.Current.Message("Initialize");

            EndpointResourceDescription serviceEndpoint = this.serviceInitializationParameters.CodePackageActivationContext.GetEndpoint(this.endpointName);
            int port = serviceEndpoint.Port;
            string protocol = "http";

            switch (serviceEndpoint.Protocol)
            {
                case EndpointProtocol.Https:
                    protocol = "https";
                    break;
                case EndpointProtocol.Tcp:
                    protocol = "tcp";
                    break;
            }

            this.listeningAddress = string.Format(
                CultureInfo.InvariantCulture,
                protocol + "://+:{0}/{1}",
                port,
                string.IsNullOrWhiteSpace(this.appRoot)
                    ? string.Empty
                    : this.appRoot.TrimEnd('/') + '/');

            this.publishAddress = this.listeningAddress.Replace("+", FabricRuntime.GetNodeContext().IPAddressOrFQDN);

            ServiceEventSource.Current.Message("Starting web server on {0}", this.listeningAddress);

            this.webApp = WebApp.Start<Startup>(this.listeningAddress);

            return Task.FromResult(this.publishAddress);
        }

        public Task CloseAsync(CancellationToken cancellationToken)
        {
            this.StopAll();
            return Task.FromResult(true);
        }

        public void Abort()
        {
            this.StopAll();
        }

        /// <summary>
        /// Stops, cancels, and disposes everything.
        /// </summary>
        private void StopAll()
        {
            try
            {
                if (this.webApp != null)
                {
                    ServiceEventSource.Current.Message("Stopping web server.");
                    this.webApp.Dispose();
                }
            }
            catch (ObjectDisposedException)
            {
            }
        }
    }
}