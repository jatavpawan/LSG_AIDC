using FCSAmerica.Transact.Client.Models.Wires;
using FCSAmerica.Transact.Common.Constants;
using FCSAmerica.Transact.ServiceModels;

namespace FCSAmerica.Transact.ServiceAgents.Common
{
    public class WiresMappingHelper
    {
        public static WiresIn MapWiresInServiceModelToClient(WiresInServiceModel wiresInServiceModel)
        {
            if (wiresInServiceModel == null)
            {
                return null;
            }

            return new WiresIn
            {
                WireInId = wiresInServiceModel.IncomingWireId,
                Amount = wiresInServiceModel.Amount,
                BeneficiaryAccountNumber = wiresInServiceModel.BeneficiaryAccountNumber,
                BeneficiaryName = wiresInServiceModel.BeneficiaryName,
                OriginatorToBeneficiary = wiresInServiceModel.OriginatorToBeneficiary,
                ReceivedDate = wiresInServiceModel.CreatedOn,
                ByOrderOf = wiresInServiceModel.ByOrderOf,
                CustomerName = wiresInServiceModel.CustomerName,
                SendingBankName = wiresInServiceModel.SenderName,
                Comments = wiresInServiceModel.Comments
            };
        }

        public static WiresInAssignmentServiceModel MapWiresInAssignmentClientToServiceModel(WiresInAssignment wiresInAssignment)
        {
            if (wiresInAssignment == null)
            {
                return null;
            }

            return new WiresInAssignmentServiceModel
            {
                WireInId = wiresInAssignment.WireInId,
                GLAccount = wiresInAssignment.GLAccountId,
                OfficeId = wiresInAssignment.OfficeId,
                Comment = wiresInAssignment.Comments
            };
        }

        public static IncomingWireTransactionDetailServiceModel MapWiresInAssignmentByGlClientToServiceModel(WiresInAssignment wiresInAssignment)
        {
            if (wiresInAssignment == null)
            {
                return null;
            }

            return new IncomingWireTransactionDetailServiceModel
            {
                GLAccountId = wiresInAssignment.GLAccountId,
                OfficeId = wiresInAssignment.OfficeId,
                Description = wiresInAssignment.Comments
            };
        }

        public static WiresInUnassignmentServiceModel MapWiresInUnassignmentClientToServiceModel(WiresInUnassignment comment)
        {
            if (comment == null)
            {
                return null;
            }

            return new WiresInUnassignmentServiceModel
            {
                Comment = comment.Comment
            };
        }

        public static WireInDetails MapIncomingWiresTransactionServiceModelToClient(IncomingWireTransactionServiceModel serviceObject)
        {
            var wiresInDetails = new WireInDetails
            {
                IncomingWireId = serviceObject.IncomingWireId,
                DateReceived = serviceObject.CreatedOn,
                Comments = serviceObject.Comments,
                Office = serviceObject.OfficeName
            };

            return wiresInDetails;
        }


        public static void MapIncomingWireDetailServiceModelToClientModel(WireInDetails clientObject, IncomingWireDetailServiceModel serviceObject)
        {
            clientObject.Amount = serviceObject.Amount.GetValueOrDefault();
            clientObject.WireInSender = MapWiresInDetailsServiceModelToWireInSenderClientModel(serviceObject);
            clientObject.WireInBeneficiary = MapWiresInDetailsServiceModelToWireInBeneficiaryClientModel(serviceObject);
            clientObject.WireInOther = MapWiresInDetailsServiceModelToWireInOtherClientModel(serviceObject);

        }

        public static WireInSender MapWiresInDetailsServiceModelToWireInSenderClientModel(IncomingWireDetailServiceModel serviceObject)
        {
            return new WireInSender
            {
                ABANumber = serviceObject.SenderDiNumber,
                ByOrderOf = serviceObject.OriginatorFiName,
                Name = serviceObject.SenderShortName,
                ReceivedFrom = serviceObject.ReceiverShortName,
                ReferenceNumber = serviceObject.SenderReference
            };
        }
        public static WireInBeneficiary MapWiresInDetailsServiceModelToWireInBeneficiaryClientModel(IncomingWireDetailServiceModel serviceObject)
        {
            return new WireInBeneficiary
            {
                Name = serviceObject.BeneficiaryName,
                AccountNumber = serviceObject.DrwDebitAcctIdentifier,
                Address1 = serviceObject.BeneficiaryAddressLine1,
                Address2 = serviceObject.BeneficiaryAddressLine2,
                Address3 = serviceObject.BeneficiaryAddressLine3,
                BeneficiaryBank = serviceObject.BeneficiaryFiName,
                BeneficiaryBankOtherLine1 = serviceObject.BeneficiaryInfoLine1,
                BeneficiaryBankOtherLine2 = serviceObject.BeneficiaryInfoAdditionalLine,
                OriginatorToBeneficiaryLine1 = serviceObject.OriginatorToBeneficiaryLine1,
                OriginatorToBeneficiaryLine2 = serviceObject.OriginatorToBeneficiaryLine2,
                OriginatorToBeneficiaryLine3 = serviceObject.OriginatorToBeneficiaryLine3,
                OriginatorToBeneficiaryLine4 = serviceObject.OriginatorToBeneficiaryLine4,
                ReferenceForBeneficiary = serviceObject.BeneficiaryRef
            };
        }

        public static WireInOther MapWiresInDetailsServiceModelToWireInOtherClientModel(IncomingWireDetailServiceModel serviceObject)
        {
            return new WireInOther
            {
                IntermediaryBank = serviceObject.IntermediaryFiName,
                BankToBankInfo = serviceObject.FiToFiFreeTextLine,
                ConfirmationNumber =
                    $"{serviceObject.OutputCycleDate}{serviceObject.OutputDate}{serviceObject.OutputDestinationId}{serviceObject.OutputSequenceNumber}{serviceObject.OutputTime}{serviceObject.OutputFrbApplId}",
                InstructingBank = serviceObject.InstructingFiName,
                OtherInfoLine1 = serviceObject.ReceiverFiInfoLine1,
                OtherInfoLine2 = serviceObject.ReceiverFiInfoAddition
            };
        }

        public static IncomingWireTransactionDetailServiceModel MapWiresInAllocationToServiceModel(
            WireInAllocation wireInAllocation)
        {
            return new IncomingWireTransactionDetailServiceModel
            {
                Amount = wireInAllocation.Amount,
                GLAccountId = wireInAllocation.GLAccountId?.Id,
                FeeCode = (wireInAllocation.Feecode == null || wireInAllocation.Feecode.Id == 0) ? null : (FeeCode?)wireInAllocation.Feecode.Id,
                GLSubledger = wireInAllocation.GLSubledger,
                Description = wireInAllocation.Description,
                AccountId = (wireInAllocation.Account == null || wireInAllocation.Account.AccountId == 0) ? null : (int?)wireInAllocation.Account.AccountId,
                TransactionType = (wireInAllocation.TransactionType == null || wireInAllocation.TransactionType.Id == 0) ? null : (TransactionType?)wireInAllocation.TransactionType.Id,
                TransactionStatus = TransactionStatus.ReadyForLoanAccountingSystem
            };
        }
    }
}
