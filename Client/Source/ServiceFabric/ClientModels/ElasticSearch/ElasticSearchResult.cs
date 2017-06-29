using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Deals;
using FCSAmerica.Transact.Client.Models.Facilities;

namespace FCSAmerica.Transact.Client.Models.ElasticSearch
{
    public class ElasticSearchResult
    {
        public List<Customer> Customers { get; set; }
        public List<AccountDetail> Accounts { get; set; }
        public List<Deal> Deals { get; set; }
        public List<Facility> Facilities { get; set; }
    }
}
