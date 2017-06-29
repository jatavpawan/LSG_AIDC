using FCSAmerica.ServiceFabric.Web.Attributes;
using FCSAmerica.Transact.Client.Models.Wires;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/wires"), ApiAuthorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class WiresController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private readonly ICoreWiresServiceAgentFacade _coreWiresServiceAgentFacade;

        public WiresController(ILogUtility logUtility, ICoreWiresServiceAgentFacade coreWiresServiceAgentFacade)
        {
            _coreWiresServiceAgentFacade = coreWiresServiceAgentFacade;
            _logUtility = logUtility;
        }

        [HttpGet, Route("in")]
        public async Task<IHttpActionResult> GetWiresIn(string officeIds = "")
        {
            try
            {
                var results = _coreWiresServiceAgentFacade.GetWiresIn(officeIds);

                if (results == null || !results.Any())
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(results.OrderBy(t => t.ReceivedDate));
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPut, Route("in")]
        public async Task<IHttpActionResult> PutWiresInAssignment(WiresInAssignment request)
        {
            try
            {
                var newWiresInAssignmentId = _coreWiresServiceAgentFacade.AssignWiresIn(request);

                if (newWiresInAssignmentId < 1)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(newWiresInAssignmentId);
            }
            catch (Exception e)
            {
                if (e is HttpException)
                {
                    if (((HttpException)e).GetHttpCode() == 409)
                        return Conflict();
                }
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPut]
        [Route("in/{id}/unassign")]
        public async Task<IHttpActionResult> UnassignOfficeId([FromUri]int id, [FromBody]WiresInUnassignment request)
        {
            try
            {
                _coreWiresServiceAgentFacade.UnassignWiresIn(id, request);
                return Ok();
            }
            catch (Exception e)
            {
                if (e is HttpException)
                {
                    if (((HttpException)e).GetHttpCode() == 409)
                        return Conflict();
                }
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("in/{id}")]
        public async Task<IHttpActionResult> GetTransactionByIncomingWireId(int id)
        {
            try
            {
                WireInDetails results = _coreWiresServiceAgentFacade.GetIncomingWireTransactionDetailsById(id);

                if (results == null)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("in/{id}/allocate")]
        public async Task<IHttpActionResult> PostWireInAllocation([FromUri]int id, [FromBody]List<WireInAllocation> wireInAllocations)
        {
            try
            {
                _coreWiresServiceAgentFacade.AllocateWiresIn(id, wireInAllocations);
                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}
