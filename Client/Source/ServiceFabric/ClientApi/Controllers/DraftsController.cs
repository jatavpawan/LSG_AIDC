using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Drafts;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/drafts")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DraftsController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private ICoreDraftServiceAgentsFacade _coreDraftServiceAgentsFacade;

        public DraftsController(ILogUtility logUtility, ICoreDraftServiceAgentsFacade coreDraftServiceAgentsFacade)
        {
            _coreDraftServiceAgentsFacade = coreDraftServiceAgentsFacade;
            _logUtility = logUtility;
        }

        [HttpGet, Route("counterdrafts/customer/{customerId:int}")]
        public async Task<IHttpActionResult> GetCounterDrafts(int customerId)
        {
            try
            {
                var results = _coreDraftServiceAgentsFacade.GetCounterDrafts(customerId);
                if (results == null || !results.Any())
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(results.OrderBy(_ => _.CustomerId).ThenBy(_ => _.LASAccountNumber).ThenByDescending(_ => _.AuditInfo.CreatedOn));
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("counterdrafts/{counterDraftId:int}")]
        public async Task<IHttpActionResult> Delete(int counterDraftId)
        {
            try
            {
                _coreDraftServiceAgentsFacade.Delete(counterDraftId);

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("counterdrafts")]
        public async Task<IHttpActionResult> InsertCounterDraft(CounterDraft newCounterDraft)
        {
            try
            {
                var result = _coreDraftServiceAgentsFacade.InsertCounterDraft(newCounterDraft);

                if (result)
                {
                    return Ok();
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("draftSearch")]
        public async Task<IHttpActionResult> GetGeneralDrafts(DraftSearch searchObject)
        {
            try
            {
                var drafts = _coreDraftServiceAgentsFacade.GetGeneralDrafts(searchObject).ToList();

                if (!drafts.Any())
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(drafts);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("globalSearch/{draftId:int}")]
        public async Task<IHttpActionResult> DeleteDraft(int draftId)
        {
            try
            {
                _coreDraftServiceAgentsFacade.DeleteDraft(draftId);

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("globalSearch")]
        public async Task<IHttpActionResult> UpdateDraft(Draft draft)
        {
            try
            {
                _coreDraftServiceAgentsFacade.UpdateDraft(draft);

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("draftImages/{draftIds}")]
        public async Task<IHttpActionResult> GetDraftImage(string draftIds)
        {
            try
            {
                //draftIds need to be a comma delimited string of draftIds
                var draftImage = _coreDraftServiceAgentsFacade.GetDraftImages(draftIds);
                return Ok(draftImage);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("drafttransactions/{customerId:int}")]
        public async Task<IHttpActionResult> GetDraftTransactions(int customerId)
        {
            try
            {
                var draftTransactions = _coreDraftServiceAgentsFacade.GetDraftTransactions(customerId);
                return Ok(draftTransactions);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("rejectdraft")]
        public async Task<IHttpActionResult> RejectDraftTransaction(DraftRejection draftRejection)
        {
            try
            {
                _coreDraftServiceAgentsFacade.RejectDraftTransaction(draftRejection);

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("draftrejections")]
        public async Task<IHttpActionResult> GetDraftRejections()
        {
            try
            {
                var draftRejections = _coreDraftServiceAgentsFacade.GetDraftRejections();
                return Ok(draftRejections);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("draftrejections/{draftId:int}")]
        public async Task<IHttpActionResult> DeleteDraftRejection(int draftId)
        {
            try
            {
                _coreDraftServiceAgentsFacade.DeleteDraftRejection(draftId);
                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}
