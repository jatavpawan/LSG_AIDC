using FCSAmerica.ServiceFabric.Common.Authentication;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.ServiceAgents;
using FCSAmerica.Transact.Common;
using FCSAmerica.Transact.ServiceFabricWebApi.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using FCSAmerica.Transact.Client.Models.ElasticSearch;

namespace FCSAmerica.Transact.Client.Api.Controllers
{
    [ServiceRequestActionFilter, RoutePrefix("api/search")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SearchController : ApiController
    {
        private readonly ILogUtility _logUtility;
        private readonly ISecurityContext _securityContext;
        private readonly IElasticSearchServiceAgent _elasticSearchServiceAgent;


        public SearchController(ILogUtility logUtility, ISecurityContext securityContext, IElasticSearchServiceAgent elasticSearchServiceAgent)
        {
            _logUtility = logUtility;
            _securityContext = securityContext;
            _elasticSearchServiceAgent = elasticSearchServiceAgent;
        }

        [Route("")]
        [HttpGet]
        public ElasticSearchResult Get(string searchQuery, int from = 0, int to = 50)
        {
            try
            {
                var results = _elasticSearchServiceAgent.Search(searchQuery, from, to);

                return results;
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }

        [Route("customer/{customerId:int}")]
        [HttpGet]
        public Customer GetCustomer(int customerId)
        {
            try
            {
                return _elasticSearchServiceAgent.GetByCustomerId(customerId);
            }
            catch (Exception e)
            {
                throw ApiResponseHandler.Error(e, _logUtility);
            }
        }
    }
}