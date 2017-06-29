using FCSAmerica.Transact.Client.Common;
using FCSAmerica.Transact.Client.Common.enums;
using FCSAmerica.Transact.Client.Models.Ach.Schedule;
using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.Common.Contracts;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceAgents.Common;
using FCSAmerica.Transact.ServiceModels;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Linq;
using DayOfWeek = FCSAmerica.Transact.Common.Contracts.DayOfWeek;

namespace FCSAmerica.Transact.ServiceAgents.Tests
{
    [TestClass]
    public class AchMapperTests
    {
        [TestInitialize]
        public void Initialize()
        {
            LoadFakeRepoData();
        }

        private void LoadFakeRepoData()
        {
        }

        [TestMethod]
        public void
            GivenAchRejectionClientModel_WhenMapRejectionClientModelToServiceModelCalled_ReturnMappedAchRejectionServiceModel()
        {
            var input = AchTestModelFactory.CreateFakeAchRejection();
            var result = AchMappingHelper.MapRejectionClientModelToServiceModel(input);

            var expected = AchTestModelFactory.CreateFakeAchRejectionServiceModel();

            Assert.AreEqual(expected.RejectId, result.RejectId);

            Assert.AreEqual(expected.AchId, result.AchId);
            Assert.AreEqual(expected.RejectReason, result.RejectReason);
            Assert.AreEqual(expected.Description, result.Description);

            Assert.AreEqual(expected.IsFormComplete, result.IsFormComplete);
        }

        [TestMethod]
        public void
            GivenBankTemplateServiceModel_WhenMapBankTemplateServiceModelToClientModelCalled_ReturnMappedBankTemplateClientModel()
        {
            var input = AchTestModelFactory.CreateFakeBankTemplateServiceModel();
            var result = AchMappingHelper.MapBankTemplateServiceModelToClientModel(input);

            var expected = AchTestModelFactory.CreateFakeBankTemplate();

            Assert.AreEqual(expected.BankTemplateId, result.BankTemplateId);
            Assert.AreEqual(expected.AbaRoutingNumber, result.AbaRoutingNumber);
            Assert.AreEqual(expected.CustomerId, result.CustomerId);
            Assert.AreEqual(expected.ExternalAccountNumber, result.ExternalAccountNumber);
            Assert.AreEqual(expected.IsActive, result.IsActive);
        }

        [TestMethod]
        public void GivenBankTemplateClientModel_WhenMapBankTemplateClientModelToServiceModelCalled_ReturnMappedBankTemplateServiceModel()
        {
            var input = AchTestModelFactory.CreateFakeBankTemplate();
            var result = AchMappingHelper.MapBankTemplateClientModelToServiceModel(input);

            var expected = AchTestModelFactory.CreateFakeBankTemplateServiceModel();

            Assert.AreEqual(expected.AbaRoutingNumber, result.AbaRoutingNumber);
            Assert.AreEqual(expected.CustomerId, result.CustomerId);
            Assert.AreEqual(expected.ExternalAccountNumber, result.ExternalAccountNumber);
            Assert.AreEqual(expected.IsActive, result.IsActive);
        }

        [TestMethod]
        public void
            GivenBankTemplateClientModelAndAbaBankInfoServiceModel_WhenMapBankTemplateClientModelAbaDataCalled_UpdatesBankTemplateClientModel()
        {
            var bankTemplateInput = AchTestModelFactory.CreateFakeBankTemplate();
            var abaBankInfoInput = AchTestModelFactory.CreateFakeAbaBankInfoServiceModel();

            AchMappingHelper.MapBankTemplateClientModelAbaData(bankTemplateInput, abaBankInfoInput);

            Assert.AreEqual(abaBankInfoInput.BankName, bankTemplateInput.BankName);
            Assert.AreEqual(abaBankInfoInput.City, bankTemplateInput.City);
            Assert.AreEqual(abaBankInfoInput.State, bankTemplateInput.State);
        }

        [TestMethod]
        public void
            GivenBankTemplateClientModelAndBankAccountTypeServiceModel_WhenMapBankTemplateClientModelBankAccountTypeCalled_UpdatesBankTemplateClientModel()
        {
            var bankTemplateInput = AchTestModelFactory.CreateFakeBankTemplate();
            var bankAccountTypeInput = AchTestModelFactory.CreateFakeBankAccountTypeServiceModel();

            AchMappingHelper.MapBankTemplateClientModelBankAccountType(bankTemplateInput, bankAccountTypeInput);

            Assert.AreEqual(bankAccountTypeInput.BankAccountTypeId,
                bankTemplateInput.BankAccountType.Id);
            Assert.AreEqual(bankAccountTypeInput.Name, bankTemplateInput.BankAccountType.Description);

        }

        [TestMethod]
        public void
            GivenBankTemplateClientModelAndAuditInfoClientModel_WhenMapBankTemplateAuditInfoCalled_UpdatesBankTemplateClientModel()
        {
            var bankTemplateInput = AchTestModelFactory.CreateFakeBankTemplate();
            var auditInfoInput = AchTestModelFactory.CreateFakeAuditInfo();

            AchMappingHelper.MapBankTemplateAuditInfo(bankTemplateInput, auditInfoInput);

            Assert.AreEqual(auditInfoInput.CreatedOn, bankTemplateInput.AuditInfo.CreatedOn);
            Assert.AreEqual(auditInfoInput.UpdatedOn, bankTemplateInput.AuditInfo.UpdatedOn);
            Assert.AreEqual(auditInfoInput.DeletedOn, bankTemplateInput.AuditInfo.DeletedOn);

            Assert.AreEqual(auditInfoInput.CreatedBy, bankTemplateInput.AuditInfo.CreatedBy);
            Assert.AreEqual(auditInfoInput.UpdatedBy, bankTemplateInput.AuditInfo.UpdatedBy);
            Assert.AreEqual(auditInfoInput.DeletedBy, bankTemplateInput.AuditInfo.DeletedBy);
        }

        [TestMethod]
        public void GivenAbaBankInfoServiceModel_WhenMapAbaBankServiceModelToClientModelCalled_ReturnsAbaClientModel()
        {
            var expected = AchTestModelFactory.CreateFakeAba();
            var abaBankInfoInput = AchTestModelFactory.CreateFakeAbaBankInfoServiceModel();

            AchMappingHelper.MapAbaBankServiceModelToClientModel(abaBankInfoInput);

            Assert.AreEqual(expected.Name, abaBankInfoInput.BankName);
            Assert.AreEqual(expected.City, abaBankInfoInput.City);
            Assert.AreEqual(expected.State, abaBankInfoInput.State);
            Assert.AreEqual(expected.AbaNumber, abaBankInfoInput.AbaRoutingNumber);
        }

        [TestMethod]
        public void
            GivenAchTransactionClientModel_WhenMapRejectAchDataServiceModelToClientModelCalled_ReturnMappedAchRejectionClientModel()
        {
            var achTransaction = AchTestModelFactory.CreateFakeAchTransaction();

            var result = AchMappingHelper.MapRejectAchDataServiceModelToClientModel(achTransaction);

            Assert.AreEqual(result.Amount, achTransaction.Amount);
            Assert.AreEqual(result.TransactionDate, achTransaction.TransactionDate);
            Assert.AreEqual(result.OtherNote, achTransaction.OtherNote);
            Assert.AreEqual(result.Form2269, false);
            Assert.AreEqual(result.AchId, achTransaction.AchId);
            Assert.AreEqual(result.RejectionReasonId, 0);
            Assert.AreEqual((TransactionDirection)result.TransactionDirection.Id, TransactionDirection.In);

        }

        [TestMethod]
        public void
            GivenAchApproverServiceModel_WhenMapApproverServiceModelToClientModelCalled_ReturnsAchApproverClientModel()
        {
            var achApprover = AchTestModelFactory.CreateFakeAchApproverServiceModel();

            var result = AchMappingHelper.MapApproverServiceModelToClientModel(achApprover);

            Assert.AreEqual(achApprover.ApproverId, result.AchApproverId);
            Assert.AreEqual(achApprover.Name, result.Name);
        }

        [TestMethod]
        public void GivenNull_WhenMapRejectAchDataServiceModelToClientModelCalled_ReturnNull()
        {
            var result = AchMappingHelper.MapRejectAchDataServiceModelToClientModel(null);

            Assert.IsNull(result);
        }

        [TestMethod]
        public void GivenTransactionTemplateServiceModel_WhenMapTransactionTemplateServiceModelToClientModelCalled_ReturnsTransactionTemplate()
        {
            var testData = AchTestModelFactory.CreateTransactionTemplateServiceModel();

            var result = AchMappingHelper.MapTransactionTemplateServiceModelToClientModel(testData);

            Assert.AreEqual(testData.TransactionTemplateId, result.AchId);
            Assert.AreEqual(testData.ApproverEmployeeId, result.AchApprover.AchApproverId);
            Assert.AreEqual(testData.Addenda, result.Addenda);
            Assert.AreEqual(testData.Amount, result.Amount);
            Assert.AreEqual(testData.ExcessAmount, result.ExcessAmount);
            Assert.AreEqual((int)testData.TransactionType, result.HowToApply.Id);
            Assert.AreEqual(testData.TransactionDirection, (TransactionDirection)result.TransactionDirection.Id);
            Assert.AreEqual(testData.NickName, result.Nickname);
            Assert.IsTrue(result.Status == AchStatus.Active);
            Assert.IsTrue(result.Schedule.Frequency == Constants.ScheduleFrequencyOnce);
            Assert.IsTrue(result.Schedule.OneTimePaymentDate == new DateTime(2017, 01, 01));
        }

        [TestMethod]
        public void GivenNull_WhenMapTransactionTemplateServiceModelToClientModelCalled_ReturnNull()
        {
            var result = AchMappingHelper.MapTransactionTemplateServiceModelToClientModel(null);

            Assert.IsNull(result);
        }

        [TestMethod]
        public void
            GivenTransactionTemplateServiceModel_WhenMapTransactionTemplateBankTemplateServiceModelToClientModelCalled_ReturnsBankTemplate()
        {
            var testData = AchTestModelFactory.CreateTransactionTemplateServiceModel();

            var result = AchMappingHelper.MapTransactionTemplateBankTemplateServiceModelToClientModel(testData);

            Assert.AreEqual(testData.BankTemplateId, result.BankTemplateId);
            Assert.AreEqual(testData.ExternalAccountNumber, result.ExternalAccountNumber);
            Assert.AreEqual((int)testData.BankAccountType, result.BankAccountType.Id);
            Assert.AreEqual(testData.BankAccountType.ToString(), result.BankAccountType.Description);
        }

        [TestMethod]
        public void GivenNull_WhenMapTransactionTemplateBankTemplateServiceModelToClientModelCalled_ReturnNull()
        {
            var result = AchMappingHelper.MapTransactionTemplateBankTemplateServiceModelToClientModel(null);

            Assert.IsNull(result);
        }

        [TestMethod]
        public void
            GivenTransactionTemplate_WhenMapTransactionTemplateClientToServiceModelCalled_TransactionTemplateServiceModel()
        {
            var testData = AchTestModelFactory.CreateTransactionTemplate();

            var result = AchMappingHelper.MapTransactionTemplateClientToServiceModel(testData);

            Assert.AreEqual((TransactionType?)testData.HowToApply.Id, result.TransactionType);
            Assert.AreEqual(testData.Account.AccountId, result.AccountId);
            Assert.IsTrue(result.ScheduleType == ScheduleType.OneTime);
            Assert.AreEqual(testData.Addenda, result.Addenda);
            Assert.AreEqual(testData.Amount, result.Amount);
            Assert.AreEqual(testData.AchApprover.AchApproverId, result.ApproverEmployeeId);
            Assert.AreEqual(testData.BankTemplate.BankTemplateId, result.BankTemplateId);
            Assert.AreEqual(testData.CustomerId, result.CreatedByCustomerId);
            Assert.AreEqual(testData.CustomerId, result.CustomerId);
            Assert.AreEqual(testData.ExcessAmount, result.ExcessAmount);
            Assert.IsTrue(result.ExcessAmountTransactionType ==
                          Transact.Common.Constants.TransactionType.PrincipalPayment);
            Assert.AreEqual(testData.Nickname, result.NickName);
            Assert.AreEqual(testData.AuthorizationType, result.AuthorizationType);
            Assert.AreEqual((TransactionDirection)testData.TransactionDirection.Id, result.TransactionDirection);
            Assert.IsTrue(result.IsActive);

        }

        [TestMethod]
        public void GivenNull_WhenMapTransactionTemplateClientToServiceModelCalled_ReturnNull()
        {
            var result = AchMappingHelper.MapTransactionTemplateClientToServiceModel(null);

            Assert.IsNull(result);
        }
    }
}
