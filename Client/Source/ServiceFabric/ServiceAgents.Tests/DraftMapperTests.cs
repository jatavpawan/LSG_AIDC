using ClientBusinessLogic.Tests.Common;
using FCSAmerica.Transact.ServiceAgents.Common;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace ClientBusinessLogic.Tests
{
    [TestClass]
    public class DraftMapperTests
    {
        [TestMethod]
        public void GivenDraftRejectionClientModel_WhenMapDraftRejectionToDraftRejectionServiceModelCalled_ReturnMappedDraftRejectionServiceModel()
        {
            var input = DraftTestModelFactory.CreateDraftRejection();
            var result = DraftMappingHelper.MapDraftRejectionToDraftRejectionServiceModel(input);
            var expected = DraftTestModelFactory.CreateDraftRejectionServiceModel();

            Assert.AreEqual(expected.DraftId, result.DraftId);
            Assert.AreEqual(expected.Description, result.Description);
            Assert.AreEqual(expected.RejectReason, result.RejectReason);
            Assert.AreEqual(expected.IsActive, result.IsActive);
        }

        [TestMethod]
        public void GivenDraftRejectionServiceModel_WhenMapRejectionClientModelToServiceModelCalled_ReturnMappedDraftRejectionClientModel()
        {
            var input = DraftTestModelFactory.CreateDraftRejectionServiceModel();
            var result = DraftMappingHelper.MapDraftRejectionServiceModelToDraftRejection(input);
            var expected = DraftTestModelFactory.CreateDraftRejection();

            Assert.AreEqual(expected.DraftId, result.DraftId);
            Assert.AreEqual(expected.Account, result.Account);
            Assert.AreEqual(expected.Bank, result.Bank);
            Assert.AreEqual(expected.CostCenter, result.CostCenter);
            Assert.AreEqual(expected.CustomerName, result.CustomerName);
            Assert.AreEqual(expected.Amount, result.Amount);
            Assert.AreEqual(expected.DraftNumber, result.DraftNumber);
            Assert.AreEqual(expected.PreparedBy, result.PreparedBy);
            Assert.AreEqual(expected.AuditInfo.CreatedBy, result.AuditInfo.CreatedBy);
            Assert.AreEqual(expected.AuditInfo.CreatedOn, result.AuditInfo.CreatedOn);
            Assert.AreEqual(expected.AuditInfo.UpdatedBy, result.AuditInfo.UpdatedBy);
            Assert.AreEqual(expected.AuditInfo.UpdatedOn, result.AuditInfo.UpdatedOn);
            Assert.AreEqual(expected.Description, result.Description);
            Assert.AreEqual(expected.RejectReason, result.RejectReason);
            Assert.AreEqual(expected.IsActive, result.IsActive);
        }

        [TestMethod]
        public void GivenDraftTransactionServiceModel_WhenMapDraftTransactionServiceModelToDraftTransactionCalled_ReturnMappedDraftTransaction()
        {
            var input = DraftTestModelFactory.CreateDraftTransactionServiceModel();
            var result = DraftMappingHelper.MapDraftTransactionServiceModelToDraftTransaction(input);

            Assert.AreEqual(input.DraftId, result.DraftId);
            Assert.AreEqual(input.Account, result.Account);
            Assert.AreEqual(input.Amount, result.Amount);
            Assert.AreEqual(input.DraftNumber, result.DraftNumber);
            Assert.AreEqual(input.TransactionDate, result.TransactionDate);
        }

        [TestMethod]
        public void GivenDraftSearchServiceModel_WhenMapSearchClientModelToServiceModelCalled_ReturnMappedDraftSearchClientModel()
        {
            var input = DraftTestModelFactory.CreateDraftSearch();
            var expected = DraftMappingHelper.MapSearchObjectClientModelToServiceModel(input);

            Assert.AreEqual(expected.Cif, input.Cif);
            Assert.AreEqual(expected.AccountNumber, input.AccountNumber);
            Assert.AreEqual(expected.FromDraftNumber, input.FromDraftNumber);
            Assert.AreEqual(expected.ToDraftNumber, input.ToDraftNumber);
            Assert.AreEqual(expected.DraftNumberList, input.DraftNumberList);
            Assert.AreEqual(expected.FromAmount, input.FromAmount);
            Assert.AreEqual(expected.ToAmount, input.ToAmount);
            Assert.AreEqual(expected.FromDate, input.FromDate);
            Assert.AreEqual(expected.ToDate, input.ToDate);
            Assert.AreEqual(expected.CustomerId, input.CustomerId);
        }

        [TestMethod]
        public void GivenDraft_WhenMapDraftToEditDraftServiceModelCalled_ReturnMappedEditDraftServiceModel()
        {
            var input = DraftTestModelFactory.CreateDraft();
            var result = DraftMappingHelper.MapDraftToEditDraftServiceModel(input);

            Assert.AreEqual(input.DraftId, result.DraftId);
            Assert.AreEqual(input.Account.AccountNumber, result.AccountNumber);
            Assert.AreEqual(input.Amount, result.Amount);
            Assert.AreEqual(input.DraftNumber, result.DraftNumber);
        }
    }
}