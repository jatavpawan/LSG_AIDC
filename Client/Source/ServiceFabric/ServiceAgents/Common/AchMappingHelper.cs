using FCSAmerica.CentralCodes;
using FCSAmerica.Transact.Client.Common.enums;
using FCSAmerica.Transact.Client.Common.Enums;
using FCSAmerica.Transact.Client.Models;
using FCSAmerica.Transact.Client.Models.Accounts;
using FCSAmerica.Transact.Client.Models.Ach;
using FCSAmerica.Transact.Client.Models.Payment;
using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.Common.LocalConstants;
using FCSAmerica.Transact.ServiceModels;
using System;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class AchMappingHelper
    {
        public static AchRejectionServiceModel MapRejectionClientModelToServiceModel(AchTransaction achRejection)
        {
            if (achRejection == null)
            {
                return null;
            }

            return new AchRejectionServiceModel
            {
                AchId = achRejection.AchId,
                IsFormComplete = achRejection.Form2269,
                Description = achRejection.OtherNote,
                RejectReason = (Transact.Common.LocalConstants.RejectReason)achRejection.RejectionReasonId,
                IsActive = true,
            };
        }
        public static BankTemplate MapBankTemplateServiceModelToClientModel(BankTemplateServiceModel bankTemplate)
        {
            if (bankTemplate == null)
            {
                return null;
            }

            return new BankTemplate
            {
                BankTemplateId = bankTemplate.BankTemplateId,
                AbaRoutingNumber = bankTemplate.AbaRoutingNumber?.Trim(),
                CustomerId = bankTemplate.CustomerId,
                ExternalAccountNumber = bankTemplate.ExternalAccountNumber?.Trim(),
                IsActive = bankTemplate.IsActive,
                //TODO: Map this to the correct field when available from Core call
                Purpose = "Operating",
                AccountHolderName = bankTemplate.AccountHolderName,
                IsCustomerAccountHolder = bankTemplate.IsCustomerAccountHolder

            };
        }
        public static BankTemplateServiceModel MapBankTemplateClientModelToServiceModel(BankTemplate bankTemplate)
        {
            if (bankTemplate == null)
            {
                return null;
            }

            var bankTemplateDto = new BankTemplateServiceModel
            {
                AbaRoutingNumber = bankTemplate.AbaRoutingNumber.Trim(),
                BankAccountTypeId = bankTemplate.BankAccountType.Id,
                CustomerId = bankTemplate.CustomerId,
                ExternalAccountNumber = bankTemplate.ExternalAccountNumber.Trim(),
                IsActive = bankTemplate.IsActive,
                AccountHolderName = bankTemplate.AccountHolderName,
                IsCustomerAccountHolder = bankTemplate.IsCustomerAccountHolder
            };


            return bankTemplateDto;
        }

        public static void MapBankTemplateClientModelAbaData(BankTemplate bankTemplate, AbaBankInfoServiceModel abaBankInfo)
        {
            bankTemplate.BankName = abaBankInfo.BankName;
            bankTemplate.City = abaBankInfo.City;
            bankTemplate.State = abaBankInfo.State;
        }

        public static void MapBankTemplateClientModelBankAccountType(BankTemplate bankTemplate,
            BankAccountTypeServiceModel bankAccountType)
        {
            if (bankTemplate.BankAccountType == null)
            {
                bankTemplate.BankAccountType = new GenericEnumMap();
            }
            bankTemplate.BankAccountType.Id = bankAccountType.BankAccountTypeId;
            bankTemplate.BankAccountType.Description = bankAccountType.Name;
        }

        public static void MapBankTemplateAuditInfo(BankTemplate bankTemplate, AuditInfo auditInfo)
        {
            if (bankTemplate.AuditInfo == null)
            {
                bankTemplate.AuditInfo = new AuditInfo();
            }

            bankTemplate.AuditInfo.CreatedOn = auditInfo.CreatedOn;
            bankTemplate.AuditInfo.CreatedBy = auditInfo.CreatedBy;

            bankTemplate.AuditInfo.DeletedBy = auditInfo.DeletedBy;
            bankTemplate.AuditInfo.DeletedOn = auditInfo.DeletedOn;

            bankTemplate.AuditInfo.UpdatedBy = auditInfo.UpdatedBy;
            bankTemplate.AuditInfo.UpdatedOn = auditInfo.UpdatedOn;
        }

        public static Aba MapAbaBankServiceModelToClientModel(AbaBankInfoServiceModel bankData)
        {
            if (bankData == null)
            {
                return null;
            }

            var abaModel = new Aba
            {
                AbaNumber = bankData.AbaRoutingNumber.Trim(),
                Name = bankData.BankName.Trim(),
                City = bankData.City.Trim(),
                State = bankData.State.Trim()
            };

            return abaModel;
        }
        public static AchTransaction MapRejectAchDataServiceModelToClientModel(AchTransaction achTransaction)
        {
            if (achTransaction == null)
            {
                return null;
            }

            return new AchTransaction
            {
                Amount = achTransaction.Amount,
                TransactionDate = achTransaction.TransactionDate,
                OtherNote = achTransaction.OtherNote,
                Form2269 = false,
                AchId = achTransaction.AchId,
                RejectionReasonId = achTransaction.RejectionReasonId,
                TransactionDirection = achTransaction.TransactionDirection,
                Status = achTransaction.Status,
                OlderThan24Hours = (DateTime.Now - achTransaction.TransactionDate).TotalHours > 24,
                IsDeletedRejection = achTransaction.IsDeletedRejection.GetValueOrDefault(false),
                CompanyName = "John Doe, LLC",
                CustomerName = "Jonh Doe",
                Office = new Office()
                {
                    OfficeId = 1,
                    OfficeCostCenter = 123,
                    OfficeName = "Omaha"
                },

                Preparer = "John Doe",
                BankName = achTransaction.BankName,
                ExternalAccountNumber = achTransaction.ExternalAccountNumber,
                //TODO: Map this to the correct field when available from Core call
                Purpose = "Installment"
            };
        }
        public static AchApprover MapApproverServiceModelToClientModel(AchApproverServiceModel achApprover)
        {
            if (achApprover == null)
            {
                return null;
            }

            return new AchApprover
            {
                AchApproverId = achApprover.ApproverId,
                Name = achApprover.Name
            };
        }

        public static TransactionTemplate MapTransactionTemplateServiceModelToClientModel(TransactionTemplateServiceModel serviceTransactionTemplate)
        {
            if (serviceTransactionTemplate == null)
            {
                return null;
            }

            var transactionTemplate = new TransactionTemplate
            {
                AchId = serviceTransactionTemplate.TransactionTemplateId,
                Addenda = serviceTransactionTemplate.Addenda,
                Amount = serviceTransactionTemplate.Amount,
                ExcessAmount = serviceTransactionTemplate.ExcessAmount,
                TransactionDirection = new GenericEnumMap()
                {
                    Id = (int)serviceTransactionTemplate.TransactionDirection,
                    Description = serviceTransactionTemplate.TransactionDirection.GetDescription()
                },
                Nickname = serviceTransactionTemplate.NickName,
                Status = serviceTransactionTemplate.IsActive ? AchStatus.Active : AchStatus.Rejected,
                Schedule = SchedulerMappingHelper.MapScheduleFromServiceTransactionTemplate(serviceTransactionTemplate),
                AuthorizationType = serviceTransactionTemplate.AuthorizationType,
            };

            if (serviceTransactionTemplate.TransactionType.HasValue)
            {
                transactionTemplate.HowToApply = new GenericEnumMap()
                {
                    Id = (int)serviceTransactionTemplate.TransactionType.GetValueOrDefault(),
                    Description = serviceTransactionTemplate.TransactionType.HasValue ? serviceTransactionTemplate.TransactionType.Value.GetDescription() : string.Empty
                };

                if (serviceTransactionTemplate.TransactionType == TransactionType.OtherFee)
                {
                    transactionTemplate.OtherFeeCode = new GenericEnumMap()
                    {
                        Id = (int)serviceTransactionTemplate.OtherFeeCode.GetValueOrDefault(),
                        Description = serviceTransactionTemplate.OtherFeeCode.HasValue ? serviceTransactionTemplate.OtherFeeCode.Value.GetDescription() : string.Empty
                    };
                }
            }


            if (serviceTransactionTemplate.ApproverEmployeeId.HasValue)
            {
                transactionTemplate.AchApprover =
                    new AchApprover
                    {
                        AchApproverId = serviceTransactionTemplate.ApproverEmployeeId,
                        Name = serviceTransactionTemplate.ApproverEmployeeName
                    };
            }

            return transactionTemplate;
        }

        public static BankTemplate MapTransactionTemplateBankTemplateServiceModelToClientModel(TransactionTemplateServiceModel serviceTransactionTemplate)
        {
            if (serviceTransactionTemplate == null)
            {
                return null;
            }

            return new BankTemplate
            {
                BankTemplateId = serviceTransactionTemplate.BankTemplateId,
                BankAccountType = new GenericEnumMap()
                {
                    Id = (int)serviceTransactionTemplate.BankAccountType,
                    Description = serviceTransactionTemplate.BankAccountType.GetDescription()
                },
                ExternalAccountNumber = serviceTransactionTemplate.ExternalAccountNumber,
                BankName = serviceTransactionTemplate.BankName,
                //TODO: Map this to the correct field when available from Core call
                Purpose = "Budget"
            };
        }

        public static TransactionTemplateServiceModel MapTransactionTemplateClientToServiceModel(TransactionTemplate transactionTemplate)
        {
            if (transactionTemplate != null)
            {
                var serviceTransactionTemplate = new TransactionTemplateServiceModel
                {
                    TransactionType = (TransactionType?)transactionTemplate.HowToApply?.Id,
                    AccountId = transactionTemplate.Account.AccountId,
                    ScheduleType = SchedulerMappingHelper.GetCoreScheduleTypeFromFrequency(transactionTemplate.Schedule),
                    Addenda = transactionTemplate.Addenda,
                    Amount = transactionTemplate.Amount,
                    ApproverEmployeeId = transactionTemplate.AchApprover?.AchApproverId,
                    BankTemplateId = transactionTemplate.BankTemplate.BankTemplateId,
                    CreatedByCustomerId = transactionTemplate.CustomerId,
                    CustomerId = transactionTemplate.CustomerId,
                    ExcessAmount = transactionTemplate.ExcessAmount,
                    ExcessAmountTransactionType = transactionTemplate.ExcessAmount.HasValue ? TransactionType.PrincipalPayment : (TransactionType?)null,
                    NickName = transactionTemplate.Nickname,
                    AuthorizationType = transactionTemplate.AuthorizationType,
                    TransactionDirection = (TransactionDirection)transactionTemplate.TransactionDirection.Id,
                    IsActive = transactionTemplate.Status == AchStatus.Active,
                    OtherFeeCode = (FeeCode?)transactionTemplate.OtherFeeCode?.Id
                };

                SchedulerMappingHelper.MapPaymentScheduleToServiceTransactionTemplate(transactionTemplate.Schedule,
                    serviceTransactionTemplate);

                return serviceTransactionTemplate;
            }

            return null;

        }


        public static StopPayment MapStopPaymentServiceModelToClientModel(AchStopPaymentServiceModel stopPaymentServiceModel)
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
                    //TODO: Map this to the correct field when available from Core
                    Purpose = "General"
                    //TODO: Fix the rest of this
                },
                ACHStopPayment = new ACHStopPayment
                {
                    CompanyName = stopPaymentServiceModel.CompanyName,
                    FromAmount = stopPaymentServiceModel.BeginningAmount,
                    ToAmount = stopPaymentServiceModel.EndingAmount
                },
                IsRegionalAccount = true, //TODO: Fix this
                CustomerId = stopPaymentServiceModel.CustomerId,
                StopPaymentType = StopPaymentType.ACH,
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

        public static AchStopPaymentServiceModel MapStopPaymentClientModelToServiceModel(StopPayment stopPayment)
        {
            if (stopPayment == null)
            {
                return null;
            }

            return new AchStopPaymentServiceModel
            {
                StopPaymentId = stopPayment.StopPaymentId,
                AccountId = (int)stopPayment.Account.AccountId,
                CompanyName = stopPayment.ACHStopPayment.CompanyName,
                BeginningAmount = stopPayment.ACHStopPayment.FromAmount,
                EndingAmount = stopPayment.ACHStopPayment.ToAmount,
                CustomerId = stopPayment.CustomerId,
                Description = stopPayment.Description,
                ExpirationDate = stopPayment.ExpirationDate,
                CreatedBy = stopPayment.AuditInfo.CreatedBy,
                CreatedOn = stopPayment.AuditInfo.CreatedOn,
                UpdatedBy = stopPayment.AuditInfo.UpdatedBy,
                UpdatedOn = stopPayment.AuditInfo.UpdatedOn
            };
        }
    }
}