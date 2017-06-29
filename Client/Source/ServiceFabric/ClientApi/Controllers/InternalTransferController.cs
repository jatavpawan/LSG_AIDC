using FCSAmerica.ServiceFabric.Web.Attributes;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/internaltransfer"), ApiAuthorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class InternalTransferController : ApiController
    {
        private readonly ICoreInternalTransferServiceAgentsFacade _coreInternalTransferServiceAgentsFacade;
        private readonly ILogUtility _logUtility;

        public InternalTransferController(ICoreInternalTransferServiceAgentsFacade coreInternalTransferServiceAgentsFacade, ILogUtility logUtility)
        {
            _coreInternalTransferServiceAgentsFacade = coreInternalTransferServiceAgentsFacade;
            _logUtility = logUtility;
        }

        [HttpGet, Route("{customerId}")]
        public IHttpActionResult GetInternalTransfersForCustomer(int customerId)
        {
            try
            {
                var transfers = _coreInternalTransferServiceAgentsFacade.GetTransfersByCustomer(customerId);
                return Ok(transfers);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("form2279Required/{fromCustomerId}/{fromAccountId}/{toCustomerId}/{toAccountId}/{scheduleType}")]
        public IHttpActionResult IsForm2279Required(int fromCustomerId, long fromAccountId, int toCustomerId, long toAccountId, ScheduleType scheduleType)
        {
            try
            {
                var isFormRequired = _coreInternalTransferServiceAgentsFacade.IsForm2279Required(fromCustomerId, fromAccountId, toCustomerId, toAccountId, scheduleType);
                return Ok(isFormRequired);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("templates")]
        public IHttpActionResult InsertTransactionTemplate([FromBody] Models.InternalTransfers.TransferTemplate template)
        {
            try
            {
                var templateId = _coreInternalTransferServiceAgentsFacade.InsertTransactionTemplate(template);
                return Ok(templateId);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("templates/{transferId}")]
        public IHttpActionResult DeleteTransactionTemplate(int transferId)
        {
            try
            {
                _coreInternalTransferServiceAgentsFacade.DeleteTransfer(transferId);
                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}