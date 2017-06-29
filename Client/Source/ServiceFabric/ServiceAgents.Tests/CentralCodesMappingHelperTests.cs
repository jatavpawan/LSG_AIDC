using ClientBusinessLogic.Tests.Common;
using FCSAmerica.Transact.ServiceAgents.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;

namespace ClientBusinessLogic.Tests
{
    [TestClass]
    public class CentralCodesMappingHelperTests
    {
        [TestMethod]
        public void GivenAchRejectionClientModel_WhenMapRejectionClientModelToServiceModelCalled_ReturnMappedAchRejectionServiceModel()
        {
            var input = HolidayTestModelFactory.CreateFakeHolidayRootObjectServiceModel();
            var expected = HolidayTestModelFactory.CreateFakeHolidayList();
            var result = CentralCodesMappingHelper.MapHolidayRootObjectServiceModelToClientModel(input);

            Assert.AreEqual(JsonConvert.SerializeObject(expected), JsonConvert.SerializeObject(result));
        }
    }
}
