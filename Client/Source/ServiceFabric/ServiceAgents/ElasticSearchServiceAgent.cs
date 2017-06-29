
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Deals;
using FCSAmerica.Transact.Client.Models.ElasticSearch;
using FCSAmerica.Transact.Client.Models.Facilities;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FCSAmerica.Transact.ServiceAgents
{
    public partial class ServiceAgent : IElasticSearchServiceAgent
    {
        public ElasticSearchResult Search(string searchQuery, int from = 0, int to = 50)
        {
            List<CustomerInformation> results = null;

            int searchInt;

            if (!int.TryParse(searchQuery, out searchInt))
            {
                if (searchQuery.Contains(","))
                {
                    results = SearchByLastNameFirst(searchQuery);
                }
                else
                {
                    results = SearchByGeneralText(searchQuery);
                }
            }
            else
            {
                results = SearchByNumber(searchInt);
            }

            return new ElasticSearchResult
            {
                Customers = results.GroupBy(c => c.CustomerId).Select(ExtractCustomer).OrderBy(_ => _.DisplayNameReverse).ThenBy(_ => _.Cif).ThenBy(_ => _.OfficeName).ToList(),
                Accounts = results.Where(a => a.AccountId.HasValue).GroupBy(c => c.AccountId).Select(ExtractAccount).ToList(),
                Deals = results.Where(c => c.DealPid != null).GroupBy(c => c.DealPid).Select(ExtractDeal).ToList(),
                Facilities = results.Where(f => f.FacilityPid != null).GroupBy(f => f.FacilityPid).Select(ExtractFacility).ToList()
            };
        }

        public IPingResponse PingElasticService()
        {
            var pingRequest = new PingRequest();

            var elasticClient = GetElasticClient();
            var pingResponse = elasticClient.Ping(pingRequest);

            return pingResponse;
        }

        internal virtual List<CustomerInformation> SearchByLastNameFirst(string searchQuery)
        {
            var multiQuery = searchQuery.Split(',');
            var firstName = multiQuery[1].Trim();
            var lastName = multiQuery[0].Trim();

            var elasticClient = GetElasticClient();
            var searchResultsFullNames = elasticClient.Search<CustomerInformation>(s => s
                .AllTypes()
                .Size(999)
                .Query(qry => qry
                    .MultiMatch(mm => mm
                        .Type(TextQueryType.CrossFields)
                        .Operator(Operator.And)
                        .Fields(f => f
                                    .Field(p => p.LastName, 2))
                        .Analyzer("standard")
                        .Query(lastName)
                    )
                ));

            var results = searchResultsFullNames.Documents.Where(x => x.FirstName.ToLower().StartsWith(firstName.ToLower())).ToList();

            return results;
        }

        internal virtual List<CustomerInformation> SearchByGeneralText(string searchQuery)
        {
            var elasticClient = GetElasticClient();
            var searchResultsFirstNames = elasticClient.Search<CustomerInformation>(s => s
                .AllTypes()
                .Size(999)
                .Query(qry => qry
                    .MultiMatch(mm => mm
                        .Type(TextQueryType.PhrasePrefix)
                        .Operator(Operator.And)
                        .Fields(f => f
                            .Field(p => p.OfficeName)
                            .Field(p => p.EntityName)
                            .Field(p => p.FirstName)
                            .Field(p => p.LastName, 2)
                            .Field(p => p.DealName)
                            .Field(p => p.FacilityName)
                            .Field(p => p.DealPid)
                            .Field(p => p.FacilityPid))
                        .Analyzer("standard")
                        .Query(searchQuery)
                    )
                ));

            return searchResultsFirstNames.Documents.ToList();
        }

        internal virtual List<CustomerInformation> SearchByNumber(int searchQuery)
        {
            var elasticClient = GetElasticClient();
            var searchResultsNumbers = elasticClient.Search<CustomerInformation>(s => s
                .AllTypes()
                .Size(999)
                .Query(qry => qry
                    .MultiMatch(mm => mm
                        .Type(TextQueryType.CrossFields)
                        .Operator(Operator.And)
                        .Fields(f => f
                            .Field(p => p.LasAccountNumber)
                            .Field(p => p.Cif)
                            .Field(p => p.Fcn))
                        .Analyzer("standard")
                        .Query(searchQuery.ToString())
                    )
                ));

            return searchResultsNumbers.Documents.ToList();
        }

        public Customer GetByCustomerId(int customerId)
        {
            var elasticClient = GetElasticClient();
            var searchResultsNumbers = elasticClient.Search<CustomerInformation>(s => s
                .AllTypes()
                .Size(999)
                .Query(qry => qry
                    .MultiMatch(mm => mm
                        .Type(TextQueryType.CrossFields)
                        .Operator(Operator.And)
                        .Fields(f => f
                            .Field(p => p.CustomerId))
                        .Analyzer("standard")
                        .Query(customerId.ToString())
                    )
                ));

            var customer = searchResultsNumbers.Documents
                .GroupBy(x => x.CustomerId)
                .Select(ExtractCustomer)
                .FirstOrDefault(c => c.Id == customerId);

            return customer;
        }

        private Facility ExtractFacility(IGrouping<string, CustomerInformation> groups)
        {
            var firstFacility = groups.FirstOrDefault();
            if (firstFacility == null)
            {
                return null;
            }

            return new Facility
            {
                FacilityPid = firstFacility.FacilityPid,
                FacilityName = firstFacility.FacilityName,
                Fcn = firstFacility.Fcn,
                RelationshipTypeDesc = firstFacility.FacilityRelationshipTypeDesc,
                Association = firstFacility.FacilityAssociation,
                AvailableToDraw = firstFacility.FacilityAvailableToDraw,
                CommitmentTypeDesc = firstFacility.FacilityCommitmentTypeDesc,
                OutstandingPrincipalBalance = firstFacility.FacilityOutstandingPrincipalBalance,
                PrimaryCustomerName = firstFacility.FacilityPrimaryCustomerName
            };
        }

        private Deal ExtractDeal(IGrouping<string, CustomerInformation> groups)
        {
            var firstDeal = groups.FirstOrDefault();
            if (firstDeal == null)
            {
                return null;
            }

            return new Deal
            {
                DealPid = firstDeal.DealPid,
                DealName = firstDeal.DealName,
                HostBank = firstDeal.DealHostBank,
                RelationshipTypeDesc = firstDeal.DealRelationshipTypeDesc,
                HostBankNetCurrentCommitment = firstDeal.DealHostBankNetCurrentCommitment,
                FcsAmericaNetHold = firstDeal.DealFcsAmericaNetHold
            };
        }

        private AccountDetail ExtractAccount(IGrouping<long?, CustomerInformation> groups)
        {
            var firstAccount = groups.FirstOrDefault();
            if (firstAccount == null)
            {
                return null;
            }

            return new AccountDetail
            {
                AccountId = firstAccount.AccountId ?? 0,
                AccountNumber = firstAccount.LasAccountNumber,
                AccountDescription = firstAccount.AccountDescription,
                ProductTypeDescription = firstAccount.ProductTypeDescription,
                LoanLiabilityBalance = firstAccount.LoanLiabilityBalance,
                CommitmentFcsAvailableAmount = firstAccount.CommitmentFcsAvailableAmount != null ? decimal.Parse(firstAccount.CommitmentFcsAvailableAmount.ToString()) : 0,
                MaturityDate = firstAccount.MaturityDate,
                CurrentDueDate = firstAccount.CurrentDueDate,
                PastDueDate = firstAccount.PastDueDate,
                PastDueAmount = firstAccount.PastDueAmount,
                CurrentBilledAmount = firstAccount.CurrentBilledAmount != null ? decimal.Parse(firstAccount.CurrentBilledAmount.ToString()) : 0,
                AccruedInterest = firstAccount.AccruedInterest,
                LastRenewalDate = firstAccount.LastRenewalDate,
                FeeAmount = firstAccount.FeeAmount,
                LateChargeAmount = firstAccount.LateChargeAmount,
                PrePayRestriction = firstAccount.PrePayRestriction,
                InterestRate = firstAccount.InterestRate,
                PerDiem = firstAccount.PerDiem,
                InterestPaidToDate = firstAccount.InterestPaidToDate,
                InterestPaidEarnedLastYear = firstAccount.InterestPaidEarnedLastYear,
                InterestReportedIrsAmount = firstAccount.InterestReportedIrsAmount,
                FinalRiskRating = firstAccount.FinalRiskRating,
            };
        }

        private Customer ExtractCustomer(IGrouping<int, CustomerInformation> groups)
        {
            var accounts = groups.Select(i => new Account
            {
                AccountId = i.AccountId ?? 0,
                AccountNumber = i.LasAccountNumber
            }).Distinct();

            var firstCustomer = groups.FirstOrDefault();
            if (firstCustomer == null)
            {
                return null;
            }

            return new Customer
            {
                AccountNumbers = accounts.ToArray(),
                FirstName = firstCustomer.FirstName,
                LastName = firstCustomer.LastName,
                EntityName = firstCustomer.EntityName,
                DisplayName = firstCustomer.DisplayName,
                UserName = firstCustomer.UserName,
                Id = firstCustomer.CustomerId,
                Cif = firstCustomer.Cif,
                Email = firstCustomer.Email,
                Address = firstCustomer.Address,
                City = firstCustomer.City,
                State = firstCustomer.State,
                PostalCode = firstCustomer.PostalCode,
                PhoneNumber = firstCustomer.PhoneNumber,
                OfficeCode = firstCustomer.OfficeCode,
                OfficeName = firstCustomer.OfficeName,
                DisplayNameReverse = firstCustomer.DisplayNameReverse,
                DisplayAddress = $"{firstCustomer.Address}, {firstCustomer.City}, {firstCustomer.State}"
            };
        }

        private ElasticClient GetElasticClient()
        {
            var settings = new ConnectionSettings(new Uri(_ecsSettings.ElasticSearchServer));
            settings.DefaultIndex(_ecsSettings.ElasticSearchIndex);

            var elasticClient = new ElasticClient(settings);

            return elasticClient;
        }
    }
}
