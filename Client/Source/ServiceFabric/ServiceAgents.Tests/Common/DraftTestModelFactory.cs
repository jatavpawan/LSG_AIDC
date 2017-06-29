using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Drafts;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;
using System;

namespace ClientBusinessLogic.Tests.Common
{
    public class DraftTestModelFactory
    {
        private static readonly DateTime _testDate = new DateTime(2017, 01, 01);
        public static DraftRejectionServiceModel CreateDraftRejectionServiceModel()
        {
            return new DraftRejectionServiceModel
            {
                DraftId = 1,
                Account = "1",
                Amount = 1,
                CostCenter = 1,
                CreatedBy = "test created by",
                CreatedOn = _testDate,
                CustomerName = "test customer name",
                Description = "test description",
                DraftNumber = 1,
                IsActive = true,
                PreparedBy = "test prepared by",
                RejectId = 1,
                RejectReason = RejectReason.AcctClosed,
                UpdatedBy = "test updated by",
                UpdatedOn = _testDate
            };
        }

        public static DraftRejection CreateDraftRejection()
        {
            return new DraftRejection
            {
                DraftId = 1,
                Account = "1",
                Amount = 1,
                CustomerName = "test customer name",
                Description = "test description",
                DraftNumber = 1,
                IsActive = true,
                PreparedBy = "test prepared by",
                RejectReason = RejectReason.AcctClosed,
                CostCenter = "1",
                AuditInfo = new AuditInfo
                {
                    CreatedBy = "test created by",
                    CreatedOn = _testDate,
                    UpdatedBy = "test updated by",
                    UpdatedOn = _testDate
                },
                Bank = "FN",
                Status = DraftStatus.Active,
                TransactionDate = _testDate
            };
        }

        public static DraftTransactionServiceModel CreateDraftTransactionServiceModel()
        {
            return new DraftTransactionServiceModel
            {
                Account = "1",
                Amount = 1,
                DraftId = 1,
                DraftNumber = 1,
                TransactionDate = _testDate
            };
        }

        public static DraftSearchServiceModel CreateDraftSearchServiceModel()
        {
            return new DraftSearchServiceModel
            {
                Cif = "123456",
                AccountNumber = 123456,
                FromDraftNumber = 123456,
                ToDraftNumber = 123456,
                DraftNumberList = new[] { 1, 2 },
                FromAmount = 123456,
                ToAmount = 123456,
                FromDate = DateTime.Now,
                ToDate = DateTime.Now,
                CustomerId = 123456,
            };
        }

        public static DraftSearch CreateDraftSearch()
        {
            return new DraftSearch
            {
                Cif = "123456",
                AccountNumber = 123456,
                FromDraftNumber = 123456,
                ToDraftNumber = 123456,
                DraftNumberList = new[] { 1, 2 },
                FromAmount = 123456,
                ToAmount = 123456,
                FromDate = DateTime.Now,
                ToDate = DateTime.Now,
                CustomerId = 123456,
            };
        }

        public static Draft CreateDraft()
        {
            return new Draft
            {
                DraftId = 1,
                Amount = 123.45m,
                DraftNumber = 555,
                Account = new Account
                {
                    AccountNumber = 999
                }
            };
        }
    }
}
