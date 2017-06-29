using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.ElasticSearch;
using Nest;

namespace FCSAmerica.Transact.ServiceAgents
{
    public interface IElasticSearchServiceAgent
    {
        ElasticSearchResult Search(string searchQuery, int from = 0, int to = 50);

        Customer GetByCustomerId(int customerId);

        IPingResponse PingElasticService();
    }
}
