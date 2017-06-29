using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/accounts")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class AccountsController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private readonly ICoreAccountsServiceAgentsFacade _coreAccountsServiceAgentsFacade;

        public AccountsController(ILogUtility logUtility, ICoreAccountsServiceAgentsFacade coreAccountsServiceAgentsFacade)
        {
            _coreAccountsServiceAgentsFacade = coreAccountsServiceAgentsFacade;
            _logUtility = logUtility;
        }

        [HttpGet, Route("customer/{customerId:int}")]
        public async Task<IHttpActionResult> GetByCustomerId(int customerId)
        {
            //ToDo: Add unit-tests around this method once it's hooked up to the core service. 

            try
            {
                var accounts = _coreAccountsServiceAgentsFacade.GetAccountsByCustomerId(customerId);

                return Ok(accounts);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("counterdraft/eligible/customer/{customerId:int}")]
        public async Task<IHttpActionResult> GetCounterDraftEligibleAccounts(int customerId)
        {
            // TODO: Wire-up to the core services;
            // This method needs to return acccounts of type (operating, budget loans, anything with an open commitment - excluding CHL accounts for this customer)

            //ToDo: Add unit-tests around this method once it's hooked up to the core service. 
            try
            {
                var accounts = _coreAccountsServiceAgentsFacade.GetCounterDraftEligibleAccounts(customerId);

                return Ok(accounts);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [HttpGet, Route("glaccount")]
        public async Task<IHttpActionResult> GetGLAccountsBySearchString(string searchString = "")
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchString))
                {
                    searchString = "";
                }

                var accounts = _coreAccountsServiceAgentsFacade.GetGLAccountsBySearchString(searchString);

                return Ok(accounts);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}
