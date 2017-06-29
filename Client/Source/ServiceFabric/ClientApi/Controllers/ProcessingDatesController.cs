using FCSAmerica.ServiceFabric.Web.Attributes;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using FCSAmerica.Transact.Client.Models.Payment;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/processingDates"), ApiAuthorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProcessingDatesController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private ICoreProcessingDatesServiceAgentsFacade _coreProcessingDatesServiceAgentsFacade;
        public ProcessingDatesController(ILogUtility logUtility, ICoreProcessingDatesServiceAgentsFacade coreProcessingDatesServiceAgentsFacade)
        {
            _coreProcessingDatesServiceAgentsFacade = coreProcessingDatesServiceAgentsFacade;
            _logUtility = logUtility;
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> GetProcessingDates(PaymentSchedule schedule)
        {
            try
            {
                //TODO: Need to call core service to get dates

                var processingDates = _coreProcessingDatesServiceAgentsFacade.GetProcessingDates(schedule);

                return Ok(processingDates);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

    }
}
