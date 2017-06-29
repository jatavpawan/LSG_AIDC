using FakeItEasy;
using FCSAmerica.Transact.Client.Api.Helpers;
using Nest;
using NUnit.Framework;
using System.Collections.Generic;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.ServiceAgents;

namespace FCSAmerica.Transact.Client.ApiTests
{
    [TestFixture]
    public class ElasticSearchServiceAgentTests
    {
        private ElasticSearchServiceAgent _elasticSearchServiceAgent;

        [SetUp]
        public void Initialize()
        {
            var fakeElasticSearchClient = A.Fake<IElasticClient>();
            _elasticSearchServiceAgent = A.Fake<ElasticSearchServiceAgent>(_ => _.CallsBaseMethods()
            .WithArgumentsForConstructor(() => new ElasticSearchServiceAgent(fakeElasticSearchClient)));
        }

        [Test]
        public void GivenSearch_WhenInvokedWithComma_ThenSearchByLastNameFirtsMustHaveBeenCalled()
        {
            const string testNameSearch = "Last, First";
            _elasticSearchServiceAgent.Search(testNameSearch);

            A.CallTo(() => _elasticSearchServiceAgent.SearchByLastNameFirst(A<string>._, A<int>._, A<int>._)).MustHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByGeneralText(A<string>._, A<int>._, A<int>._)).MustNotHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByNumber(A<int>._, A<int>._, A<int>._)).MustNotHaveHappened();

        }

        [Test]
        public void GivenSearch_WhenInvokedWithStringNotContainingComma_ThenSearchByGeneralTextMustHaveBeenCalled()
        {
            const string testNameSearch = "Test search string";
            _elasticSearchServiceAgent.Search(testNameSearch);

            A.CallTo(() => _elasticSearchServiceAgent.SearchByLastNameFirst(A<string>._, A<int>._, A<int>._)).MustNotHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByGeneralText(A<string>._, A<int>._, A<int>._)).MustHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByNumber(A<int>._, A<int>._, A<int>._)).MustNotHaveHappened();

        }

        [Test]
        public void GivenSearch_WhenInvokedWithANumber_ThenSearchByNumberMustHaveBeenCalled()
        {
            const string testNumberSearch = "1";
            _elasticSearchServiceAgent.Search(testNumberSearch);

            A.CallTo(() => _elasticSearchServiceAgent.SearchByLastNameFirst(A<string>._, A<int>._, A<int>._)).MustNotHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByGeneralText(A<string>._, A<int>._, A<int>._)).MustNotHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByNumber(A<int>._, A<int>._, A<int>._)).MustHaveHappened();

        }

        [Test]
        public void GivenGetByCustomerId_WhenInvokedWithANumber_ThenSearchByNumberMustHaveBeenCalled()
        {
            const string testNumberSearch = "1";
            _elasticSearchServiceAgent.Search(testNumberSearch);

            A.CallTo(() => _elasticSearchServiceAgent.SearchByLastNameFirst(A<string>._, A<int>._, A<int>._)).MustNotHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByGeneralText(A<string>._, A<int>._, A<int>._)).MustNotHaveHappened();
            A.CallTo(() => _elasticSearchServiceAgent.SearchByNumber(A<int>._, A<int>._, A<int>._)).MustHaveHappened();

        }

        [TestCase("", "City", "State", "City, State")]
        [TestCase("Address", "City", "State", "Address, City, State")]
        [TestCase("", "", "State", "State")]
        [TestCase(" ", "   ", "State", "State")]
        public void GivenSetDisplayAddressTestCases(string address, string city, string state, string expectedResult)
        {
            var customers = new List<Customer> {new Customer {Address = address, City = city, State = state}};


            _elasticSearchServiceAgent.SetDisplayAddress(customers);

            Assert.AreEqual(expectedResult, customers[0].DisplayAddress);
        }

        [TestCase(1, 1, 1)]
        [TestCase(1, 2, null)]
        public void GivenSetAccountNumberTestCases(int accountNumber, int searchQuery, int? expectedResult)
        {
            var actual = _elasticSearchServiceAgent.GetAccountNumber(accountNumber, searchQuery);

            Assert.AreEqual(expectedResult, actual);
        }
    }
}
