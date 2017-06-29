using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace ClientBusinessLogic.Tests
{
    namespace FCSAmerica.Transact.ServiceAgents.Tests
    {
        [TestClass]
        public class CoreCodesMappingHelperTests
        {
            private DateTime _currentDate;

            [TestInitialize]
            public void Initialize()
            {
                LoadFakeRepoData();
            }

            private void LoadFakeRepoData()
            {
                _currentDate = DateTime.Parse("04/28/2017");

            }
        }
    }
}
