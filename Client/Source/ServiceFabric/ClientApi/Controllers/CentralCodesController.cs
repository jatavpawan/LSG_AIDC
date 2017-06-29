using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/centralcodes")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CentralCodesController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private ICoreCodesServiceAgentsFacade _coreCodesServiceAgentsFacade;

        public CentralCodesController(ILogUtility logUtility, ICoreCodesServiceAgentsFacade coreCodesServiceAgentsFacade)
        {
            _logUtility = logUtility;
            _coreCodesServiceAgentsFacade = coreCodesServiceAgentsFacade;
        }

        [HttpGet, Route("offices")]
        public async Task<IHttpActionResult> GetOffices()
        {
            //ToDo: Add unit-tests around this method once it's hooked up to the core service. 

            try
            {
                var offices = _coreCodesServiceAgentsFacade.GetOffices().OrderBy(x => x.OfficeName);

                return Ok(offices);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("offices/costcenter")]
        public async Task<IHttpActionResult> GetOfficesBySearchString(string searchString = "")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchString))
                {
                    searchString = "";
                }

                var offices = _coreCodesServiceAgentsFacade.GetOfficesBySearchString(searchString);

                return Ok(offices);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("howtoapplylist")]
        public async Task<IHttpActionResult> GetHowToApplyList()
        {
            try
            {
                var offices = _coreCodesServiceAgentsFacade.GetHowToApplyList().OrderBy(x => x.Description);

                return Ok(offices);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("otherFees")]
        public async Task<IHttpActionResult> GetOtherFees()
        {
            try
            {
                var options = _coreCodesServiceAgentsFacade.GetOtherFees().OrderBy(x => x.Description);

                return Ok(options);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("rejectreasons/ach/in")]
        public async Task<IHttpActionResult> GetAchInRejectReasonCodes()
        {
            try
            {
                var results = _coreCodesServiceAgentsFacade.GetAchInRejectionReasonCodes();

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("rejectreasons/ach/out")]
        public async Task<IHttpActionResult> GetAchOutRejectReasonCodes()
        {
            try
            {
                var results = _coreCodesServiceAgentsFacade.GetAchOutRejectionReasonCodes();

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("rejectreasons/ach/olderthantwentyfourhours")]
        public async Task<IHttpActionResult> GetAchOlderThan24HoursRejectReasonCodes()
        {
            try
            {
                var results = _coreCodesServiceAgentsFacade.GetAchOlderThan24HoursRejectReasonCodes();

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("rejectreasons/draft")]
        public async Task<IHttpActionResult> GetDraftRejectReasonCodes()
        {
            try
            {
                var results = _coreCodesServiceAgentsFacade.GetDraftRejectionReasonCodes();

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("accounttypes")]
        public async Task<IHttpActionResult> GetAccountTypes()
        {
            try
            {
                var accountTypes = _coreCodesServiceAgentsFacade.GetBankAccountTypes();

                return Ok(accountTypes);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("holidays")]
        public async Task<IHttpActionResult> GetHolidays()
        {
            try
            {
                var results = _coreCodesServiceAgentsFacade.GetHolidays();

                return Ok(results);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}
