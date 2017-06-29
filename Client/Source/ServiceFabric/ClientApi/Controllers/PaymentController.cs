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

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/payment"), ApiAuthorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PaymentController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private ICorePaymentServiceAgentsFacade _corePaymentServiceAgentsFacade;
        private ICoreFeeServiceAgentsFacade _coreFeeServiceAgentsFacade;

        public PaymentController(ILogUtility logUtility, ICorePaymentServiceAgentsFacade corePaymentServiceAgentsFacade, ICoreFeeServiceAgentsFacade coreFeeServiceAgentsFacade)
        {
            _corePaymentServiceAgentsFacade = corePaymentServiceAgentsFacade;
            _coreFeeServiceAgentsFacade = coreFeeServiceAgentsFacade;
            _logUtility = logUtility;
        }

        [HttpGet, Route("{customerId:int}")]
        public IHttpActionResult GetPayments(int customerId)
        {
            try
            {
                var results = _corePaymentServiceAgentsFacade.GetStopPayments(customerId);

                if (results == null || !results.Any())
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(results.OrderBy(t => t.ExpirationDate));
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route]
        public IHttpActionResult UpdatePayment(StopPayment stopPayment)
        {
            try
            {
                var results = _corePaymentServiceAgentsFacade.UpsertStopPayment(stopPayment);

                if (!results)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("{stopPaymentId:int}/{stopPaymentTypeId:int}")]
        public IHttpActionResult DeletePayment(int stopPaymentId, int stopPaymentTypeId)
        {
            try
            {
                var results = _corePaymentServiceAgentsFacade.DeleteStopPayment(stopPaymentId, stopPaymentTypeId);

                if (!results)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("feeamount/{stopPaymentTypeId:int}")]
        public IHttpActionResult GetFeeAmount(int stopPaymentTypeId)
        {
            try
            {
                var results = _coreFeeServiceAgentsFacade.GetFeeAmount(stopPaymentTypeId);

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

    }
}
