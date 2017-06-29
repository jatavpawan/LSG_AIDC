using FCSAmerica.ServiceFabric.Web.Attributes;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/ach"), ApiAuthorize]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AchController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private ICoreAchServiceAgentsFacade _coreAchServiceAgentsFacade;

        public AchController(ILogUtility logUtility, ICoreAchServiceAgentsFacade coreAchServiceAgentsFacade)
        {
            _coreAchServiceAgentsFacade = coreAchServiceAgentsFacade;
            _logUtility = logUtility;
        }

        [HttpGet, Route("templates/{customerId:int}")]
        public async Task<IHttpActionResult> GetTemplates(int customerId)
        {
            try
            {
                var results = _coreAchServiceAgentsFacade.GetBankTemplates(customerId);

                if (results == null || !results.Any())
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(results.OrderBy(t => t.BankName).ThenBy(t => t.BankAccountType.Description).ThenBy(t => t.ExternalAccountNumber));
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("templates/{bankTemplateId:int}")]
        public async Task<IHttpActionResult> Delete(int bankTemplateId)
        {
            try
            {
                _coreAchServiceAgentsFacade.DeleteBankTemplate(bankTemplateId);
                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("templates")]
        public async Task<IHttpActionResult> InsertTemplate(BankTemplate newBankTemplate)
        {
            try
            {
                var newBankTemplateId = _coreAchServiceAgentsFacade.InsertBankTemplate(newBankTemplate);

                if (newBankTemplateId < 1)
                {
                    return StatusCode(HttpStatusCode.NoContent);
                }

                return Ok(newBankTemplateId);
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

        [HttpGet, Route("templates/aba/{abaNumber:int}")]
        public async Task<IHttpActionResult> GetAbaBankData(int abaNumber)
        {
            try
            {
                var results = _coreAchServiceAgentsFacade.GetAbaBankData(abaNumber.ToString());

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

        [HttpGet, Route("customer/{customerId:int}/approvers")]
        public async Task<IHttpActionResult> GetApprovers(int customerId)
        {
            try
            {
                //TODO: Need to call core service to get actual template data in the service agent project
                //ToDo: Add unit-tests around this method once it's hooked up to the core service. 
                var results = _coreAchServiceAgentsFacade.GetAchApprovers();

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("")]
        public async Task<IHttpActionResult> InsertAch(TransactionTemplate ach)
        {
            try
            {
                //TODO: Need to call core service to insert the template record

                return Ok(_coreAchServiceAgentsFacade.CreateAchTransaction(ach));
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("achTransactions/{customerId:int}")]
        public async Task<IHttpActionResult> GetAchTransactions(int customerId)
        {
            try
            {
                var transactions = _coreAchServiceAgentsFacade.GetAchTransactions(customerId);
                return Ok(transactions.OrderByDescending(x => x.AuditInfo?.CreatedOn));
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("achTransactions/{achId:int}")]
        public async Task<IHttpActionResult> DeleteAchTransaction(int achId)
        {
            try
            {
                _coreAchServiceAgentsFacade.DeleteAchTransaction(achId);

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("customer/{customerId:int}/rejects")]
        public async Task<IHttpActionResult> GetRejectAchData(int customerId)
        {
            try
            {
                var results = _coreAchServiceAgentsFacade.GetRejectAchData(customerId);

                if (results.Any())
                {
                    results = results.OrderBy(x => x.ExternalAccountNumber).ToList();
                }

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("rejections")]
        public async Task<IHttpActionResult> GetAchRejectionsData()
        {
            try
            {
                var results = _coreAchServiceAgentsFacade.GetAchRejectionsData();

                if (results.Any())
                {
                    results = results.OrderBy(x => x.Amount).ToList();
                }

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpPost, Route("reject")]
        public async Task<IHttpActionResult> RejectAch(AchTransaction achRejection)
        {
            try
            {
                _coreAchServiceAgentsFacade.RejectAch(achRejection);

                return Ok(true);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpDelete, Route("rejections/{achId:int}")]
        public async Task<IHttpActionResult> DeleteRejectAch(int achId)
        {
            try
            {
                _coreAchServiceAgentsFacade.DeleteAchRejections(achId);

                return Ok();
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}
