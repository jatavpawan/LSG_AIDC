using System;
using System.Collections.Generic;
using System.Linq;
using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Drafts;
using FCSAmerica.Transact.Client.Models.Payment;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class DraftMappingHelper
    {
        public static StopPayment MapStopPaymentServiceModelToClientModel(DraftStopPaymentServiceModel stopPaymentServiceModel)
        {
            if (stopPaymentServiceModel == null)
            {
                return null;
            }

            return new StopPayment
            {
                StopPaymentId = stopPaymentServiceModel.StopPaymentId,
                Account = new Account
                {
                    AccountId = stopPaymentServiceModel.AccountId,
                    AccountNumber = 12345,
                    //TODO: Map this to the correct field when available from Core call
                    Purpose = "General"
                    //TODO: Fix the rest of this
                },
                DraftStopPayment = new DraftStopPayment
                {
                    BeginningDraftNumber = stopPaymentServiceModel.BeginningDraftNumber,
                    EndingDraftNumber = stopPaymentServiceModel.EndingDraftNumber ?? stopPaymentServiceModel.BeginningDraftNumber,
                    Amount = stopPaymentServiceModel.BeginningAmount
                },
                IsRegionalAccount = true, //TODO: Fix this
                CustomerId = stopPaymentServiceModel.CustomerId,
                StopPaymentType = StopPaymentType.Draft,
                Description = stopPaymentServiceModel.Description,
                ExpirationDate = stopPaymentServiceModel.ExpirationDate,
                AuditInfo = new AuditInfo
                {
                    CreatedBy = stopPaymentServiceModel.CreatedByName,
                    CreatedOn = stopPaymentServiceModel.CreatedOn,
                    UpdatedBy = stopPaymentServiceModel.UpdatedByName,
                    UpdatedOn = stopPaymentServiceModel.UpdatedOn
                }
            };
        }

        internal static CounterDraft MapCounterDraftServiceModelToClientModel(CounterDraftServiceModel serviceModel, List<Office> offices)
        {
            var clientModel = new CounterDraft
            {
                CustomerId = serviceModel.CustomerId,
                EndingDraftNumber = serviceModel.EndingDraftNumber,
                Office = offices.FirstOrDefault(x => x.OfficeId == serviceModel.OfficeId),
                LASAccountNumber = serviceModel.LASAccountNumber,
                BeginningDraftNumber = serviceModel.BeginningDraftNumber,
                CounterDraftId = serviceModel.CounterDraftId,
                IsActive = serviceModel.IsActive,
                PreparedBy = serviceModel.PreparedBy,
                AuditInfo = new AuditInfo
                {
                    CreatedBy = serviceModel.CreatedBy,
                    CreatedOn = serviceModel.CreatedOn,
                    UpdatedBy = serviceModel.UpdatedBy,
                    UpdatedOn = serviceModel.UpdatedOn,
                    DeletedBy = serviceModel.UpdatedBy,
                    DeletedOn = serviceModel.UpdatedOn
                }
            };
            return clientModel;
        }

        internal static CounterDraftServiceModel MapCounterDraftClientModelToServiceModel(CounterDraft newCounterDraft)
        {
            var serviceModel = new CounterDraftServiceModel
            {
                BeginningDraftNumber = newCounterDraft.BeginningDraftNumber,
                CounterDraftId = newCounterDraft.CounterDraftId,
                CustomerId = newCounterDraft.CustomerId,
                EndingDraftNumber = newCounterDraft.EndingDraftNumber,
                IsActive = newCounterDraft.IsActive,
                LASAccountNumber = newCounterDraft.LASAccountNumber,
                OfficeId = newCounterDraft.Office.OfficeId
            };
            return serviceModel;
        }

        public static DraftStopPaymentServiceModel MapStopPaymentClientModelToServiceModel(StopPayment stopPayment)
        {
            if (stopPayment == null)
            {
                return null;
            }

            return new DraftStopPaymentServiceModel
            {
                StopPaymentId = stopPayment.StopPaymentId,
                AccountId = (int)stopPayment.Account.AccountId,
                BeginningDraftNumber = stopPayment.DraftStopPayment.BeginningDraftNumber,
                EndingDraftNumber = stopPayment.DraftStopPayment.EndingDraftNumber,
                BeginningAmount = stopPayment.DraftStopPayment.Amount,
                CustomerId = stopPayment.CustomerId,
                Description = stopPayment.Description,
                ExpirationDate = stopPayment.ExpirationDate,
                CreatedBy = stopPayment.AuditInfo.CreatedBy,
                CreatedOn = stopPayment.AuditInfo.CreatedOn,
                UpdatedBy = stopPayment.AuditInfo.UpdatedBy,
                UpdatedOn = stopPayment.AuditInfo.UpdatedOn
            };
        }

        public static DraftRejectionServiceModel MapDraftRejectionToDraftRejectionServiceModel(DraftRejection draftRejectionClientModel)
        {
            var serviceModel = new DraftRejectionServiceModel
            {
                DraftId = draftRejectionClientModel.DraftId,
                Description = !string.IsNullOrWhiteSpace(draftRejectionClientModel.Description) ? draftRejectionClientModel.Description : draftRejectionClientModel.RejectionReasonDescription,
                RejectReason = draftRejectionClientModel.RejectReason,
                IsActive = true
            };

            return serviceModel;
        }

        public static DraftRejection MapDraftRejectionServiceModelToDraftRejection(DraftRejectionServiceModel draftRejectionServiceModel)
        {
            var clientModel = new DraftRejection
            {
                DraftId = draftRejectionServiceModel.DraftId,
                Account = draftRejectionServiceModel.Account,
                Bank = draftRejectionServiceModel.Bank,
                CostCenter = draftRejectionServiceModel.CostCenter.ToString(),
                CustomerName = draftRejectionServiceModel.CustomerName,
                Description = draftRejectionServiceModel.Description,
                Amount = draftRejectionServiceModel.Amount,
                DraftNumber = draftRejectionServiceModel.DraftNumber,
                PreparedBy = draftRejectionServiceModel.PreparedBy,
                RejectReason = draftRejectionServiceModel.RejectReason,
                IsActive = draftRejectionServiceModel.IsActive,
                AuditInfo = new AuditInfo
                {
                    CreatedBy = draftRejectionServiceModel.CreatedBy,
                    CreatedOn = draftRejectionServiceModel.CreatedOn,
                    UpdatedBy = draftRejectionServiceModel.UpdatedBy,
                    UpdatedOn = draftRejectionServiceModel.UpdatedOn,
                },
                //TODO: Map this to the correct field when available from Core
                Purpose = "General"
            };

            return clientModel;
        }

        public static DraftTransaction MapDraftTransactionServiceModelToDraftTransaction(DraftTransactionServiceModel draftTransactionServiceModel)
        {
            var clientModel = new DraftTransaction
            {
                DraftId = draftTransactionServiceModel.DraftId,
                Account = draftTransactionServiceModel.Account,
                Amount = draftTransactionServiceModel.Amount,
                DraftNumber = draftTransactionServiceModel.DraftNumber,
                TransactionDate = draftTransactionServiceModel.TransactionDate,
                //TODO: Map this to the correct field when available from Core call
                Purpose = "Operating"
            };

            return clientModel;
        }

        public static DraftSearchServiceModel MapSearchObjectClientModelToServiceModel(DraftSearch searchObject)
        {
            var serviceModel = new DraftSearchServiceModel
            {
                CustomerId = searchObject.CustomerId,
                Cif = searchObject.Cif,
                AccountNumber = searchObject.AccountNumber,
                FromDraftNumber = searchObject.FromDraftNumber,
                ToDraftNumber = searchObject.ToDraftNumber,
                FromDate = searchObject.FromDate,
                ToDate = searchObject.ToDate,
                FromAmount = searchObject.FromAmount,
                ToAmount = searchObject.ToAmount,
                DraftNumberList = searchObject.DraftNumberList
            };

            return serviceModel;
        }

        public static DraftImage MapItemImageServiceModelToClientModel(DraftImageServiceModel model)
        {
            var itemImage = new DraftImage
            {
                DraftFileRowId = model.DraftFileRowId,
                FrontImage = model.FrontImage,
                BackImage = model.BackImage
            };

            return itemImage;
        }

        public static EditDraftServiceModel MapDraftToEditDraftServiceModel(Draft editedDraft)
        {
            var draftFile = new EditDraftServiceModel()
            {
                DraftId = editedDraft.DraftId,
                Amount = editedDraft.Amount ?? 0,
                AccountNumber = editedDraft.Account?.AccountNumber ?? 0,
                DraftNumber = editedDraft.DraftNumber ?? 0
            };

            return draftFile;
        }
    }
}