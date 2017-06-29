using FCSAmerica.ServiceFabric.Common.Authentication;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceAgentsFacade;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [RoutePrefix("api/dropdownoptions")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DropDownOptionsLookupController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private readonly ISecurityContext _securityContext;
        private readonly ICoreCodesServiceAgentsFacade _coreCodesServiceAgentsFacade;

        public DropDownOptionsLookupController(ILogUtility logUtility, ICoreCodesServiceAgentsFacade coreCodesManager)
        {
            _coreCodesServiceAgentsFacade = coreCodesManager;
            _logUtility = logUtility;
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
    }
}