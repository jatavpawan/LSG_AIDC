using FCSAmerica.ServiceFabric.Common;
using FCSAmerica.ServiceFabric.Web.Controllers;
using FCSAmerica.Transact.ClientCommon;
using FCSAmerica.Transact.Common;
using System.Web.Http;
using System.Web.Http.Description;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/diagnostics"), ApiExplorerSettings(IgnoreApi = false)]
    public class DiagnosticsController : BaseDiagnosticController
    {
        public DiagnosticsController(ILogUtility logUtility, IEcsSettings ecsSetting, IHealthCheckUtility healthCheckUtility)
            : base(logUtility, (EcsSettings)ecsSetting, healthCheckUtility)
        {

        }
    }
}
