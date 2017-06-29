using FCSAmerica.ServiceFabric.Common;
using Microsoft.Practices.Unity;
using Microsoft.ServiceFabric.Services.Runtime;
using System;
using System.Diagnostics;
using System.Threading;
using FCSAmerica.Transact.Common;

namespace FCSAmerica.Transact.Client.Api
{
    internal static class Program
    {
        /// <summary>
        /// This is the entry point of the service host process.
        /// </summary>
        private static void Main()
        {
            try
            {
                // The ServiceManifest.XML file defines one or more service type names.
                // Registering a service maps a service type name to a .NET type.
                // When Service Fabric creates an instance of this service type,
                // an instance of the class is created in this host process.

                ServiceRuntime.RegisterServiceAsync("ServiceFabricWebApiType",
                    context =>
                    {
                        try
                        {
                            var unityContainer = UnityConfig.GetStartupContainer();
                            var logUtility = unityContainer.Resolve<ILogUtility>();
                            var healthCheckUtility = unityContainer.Resolve<IHealthCheckUtility>();

                            return new ClientApi(context, healthCheckUtility, logUtility);
                        }
                        catch (Exception ex)
                        {
                            ServiceEventSource.Current.ServiceHostInitializationFailed(ex.ToString());
                            throw;
                        }
                    }).GetAwaiter().GetResult();

                ServiceEventSource.Current.ServiceTypeRegistered(Process.GetCurrentProcess().Id, typeof(ClientApi).Name);

                // Prevents this host process from terminating so services keeps running. 
                Thread.Sleep(Timeout.Infinite);
            }
            catch (Exception e)
            {
                ServiceEventSource.Current.ServiceHostInitializationFailed(e.ToString());
                throw;
            }
        }
    }
}
