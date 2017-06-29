using FCSAmerica.ServiceFabric.Common.Authentication;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/users")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private readonly ISecurityContext _securityContext;

        public UsersController(ILogUtility logUtility, ISecurityContext securityContext)
        {
            _logUtility = logUtility;
            _securityContext = securityContext;
        }

        [HttpGet, Route("{loginName}")]
        public async Task<IHttpActionResult> GetUserSettings(string loginName)
        {
            //ToDo: Add unit-tests around this method once it's hooked up to the core service. 

            try
            {
                var userSetting = new UserSetting()
                {
                    RegionId = 1,
                    RegionName = "SouthEast"
                };

                return Ok(userSetting);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}
